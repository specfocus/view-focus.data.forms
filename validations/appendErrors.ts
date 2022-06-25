import type { InternalFieldErrors } from '../fields';
import type { InternalFieldName } from '@specfocus/spec-focus/fields/names';
import type { ValidateResult } from '@specfocus/spec-focus/validations/validator';

export default (
  name: InternalFieldName,
  validateAllFieldCriteria: boolean,
  errors: InternalFieldErrors,
  type: string,
  message: ValidateResult,
) =>
  validateAllFieldCriteria
    ? {
        ...errors[name],
        types: {
          ...(errors[name] && errors[name]!.types ? errors[name]!.types : {}),
          [type]: message || true,
        },
      }
    : {};
