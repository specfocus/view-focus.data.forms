import { Field } from '@specfocus/spec-focus/fields';
import { FieldError, FieldErrors } from '../fields';
import get from '@specfocus/spec-focus/structs/get';
import set from '@specfocus/spec-focus/structs/set';
import { ResolverOptions } from './resolver';
import { validateFieldsNatively } from './validateFieldsNatively';

export const toNestError = <TFieldValues>(
  errors: Record<string, FieldError>,
  options: ResolverOptions<TFieldValues>,
): FieldErrors<TFieldValues> => {
  options.shouldUseNativeValidation && validateFieldsNatively(errors, options);

  const fieldErrors = {} as FieldErrors<TFieldValues>;
  for (const path in errors) {
    const field = get(options.fields, path) as Field['_f'] | undefined;

    set(
      fieldErrors,
      path,
      Object.assign(errors[path], { ref: field && field.ref }),
    );
  }

  return fieldErrors;
};