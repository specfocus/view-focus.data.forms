import type { Field, FieldName, InternalFieldName } from '@specfocus/spec-focus/fields';
import type { FieldErrors } from '../fields';
import { FieldError } from '../fields';
import { FieldValues } from '@specfocus/spec-focus/fields/values';
import Lazy from '@specfocus/spec-focus/lazy/lazy-schema';
import { AnyObjectSchema } from '@specfocus/spec-focus/schemas/schema-of';
import { ValidationError } from '@specfocus/spec-focus/validations/error';
import { CriteriaMode } from '@specfocus/spec-focus/validations/errors';
import { UnpackNestedValue } from '@specfocus/spec-focus/values/nested';
import { toNestError } from '../validations/toNestError';
import appendErrors from './appendErrors';
import { validateFieldsNatively } from './validateFieldsNatively';

type Options<T extends AnyObjectSchema | Lazy<any>> = Parameters<
  T['validate']
>[1];

export type Resolver<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
> = (
  values: UnpackNestedValue<TFieldValues>,
  context: TContext | undefined,
  options: ResolverOptions<TFieldValues>,
) => PromiseLike<ResolverResult<TFieldValues>>;

export type ResolverFactory = <T extends AnyObjectSchema | Lazy<any>>(
  schema: T,
  schemaOptions?: Options<T>,
  factoryOptions?: { mode?: 'async' | 'sync', rawValues?: boolean; },
) => Resolver;

export type ResolverSuccess<TFieldValues extends FieldValues = FieldValues> = {
  values: UnpackNestedValue<TFieldValues>;
  errors: {};
};

export type ResolverError<TFieldValues extends FieldValues = FieldValues> = {
  values: {};
  errors: FieldErrors<TFieldValues>;
};

export type ResolverResult<TFieldValues extends FieldValues = FieldValues> =
  | ResolverSuccess<TFieldValues>
  | ResolverError<TFieldValues>;

export interface ResolverOptions<TFieldValues extends FieldValues> {
  criteriaMode?: CriteriaMode;
  fields: Record<InternalFieldName, Field['_f']>;
  names?: FieldName<TFieldValues>[];
  shouldUseNativeValidation: boolean | undefined;
}

/**
 * Why `path!` ? because it could be `undefined` in some case
 * https://github.com/jquense/yup#validationerrorerrors-string--arraystring-value-any-path-string
 */
const parseErrorSchema = (
  error: ValidationError,
  validateAllFieldCriteria: boolean,
) => {
  return (error.inner || []).reduce<Record<string, FieldError>>(
    (previous, error) => {
      if (!previous[error.path!]) {
        previous[error.path!] = { message: error.message, type: error.type! };
      }

      if (validateAllFieldCriteria) {
        const types = previous[error.path!].types;
        const messages = types && types[error.type!];

        previous[error.path!] = appendErrors(
          error.path!,
          validateAllFieldCriteria,
          previous,
          error.type!,
          messages
            ? ([] as string[]).concat(messages as string[], error.message)
            : error.message,
        ) as FieldError;
      }

      return previous;
    },
    {},
  );
};

export const validateResolver: ResolverFactory =
  (schema, schemaOptions = {}, resolverOptions = {}) =>
  async (values, context, options) => {
    try {
      if (schemaOptions.context && process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn(
          "You should not used the yup options context. Please, use the 'useForm' context object instead",
        );
      }

      const result = await schema[
        resolverOptions.mode === 'sync' ? 'validateSync' : 'validate'
      ](
        values,
        Object.assign({ abortEarly: false }, schemaOptions, { context }),
      );

      options.shouldUseNativeValidation && validateFieldsNatively({}, options);

      return {
        values: resolverOptions.rawValues ? values : result,
        errors: {},
      };
    } catch (e: any) {
      if (!e.inner) {
        throw e;
      }

      return {
        values: {},
        errors: toNestError(
          parseErrorSchema(
            e,
            !options.shouldUseNativeValidation &&
              options.criteriaMode === 'all',
          ),
          options,
        ),
      };
    }
  };