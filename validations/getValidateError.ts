import isBoolean from '@specfocus/spec-focus/booleans/isBoolean';
import type { FieldError } from '../fields';
import isMessage from '@specfocus/spec-focus/messages/is-message';
import type { ValidateResult } from '@specfocus/spec-focus/validations/validator';
import type { Ref } from '../fields';

export default function getValidateError(
  result: ValidateResult,
  ref: Ref,
  type = 'validate',
): FieldError | void {
  if (
    isMessage(result) ||
    (Array.isArray(result) && result.every(isMessage)) ||
    (isBoolean(result) && !result)
  ) {
    return {
      type,
      message: isMessage(result) ? result : '',
      ref,
    };
  }
}
