import type { FieldValues } from '@specfocus/spec-focus/fields';
import type { FieldError, FieldErrors } from '../fields';
import get from '@specfocus/spec-focus/structs/get';
import isKey from '@specfocus/spec-focus/structs/isKey';

export default function schemaErrorLookup(
  errors: FieldErrors,
  _fields: FieldValues,
  name: string,
): {
  error?: FieldError;
  name: string;
} {
  const error = get(errors, name);

  if (error || isKey(name)) {
    return {
      error,
      name,
    };
  }

  const names = name.split('.');

  while (names.length) {
    const fieldName = names.join('.');
    const field = get(_fields, fieldName);
    const foundError = get(errors, fieldName);

    if (field && !Array.isArray(field) && name !== fieldName) {
      return { name };
    }

    if (foundError && foundError.type) {
      return {
        name: fieldName,
        error: foundError,
      };
    }

    names.pop();
  }

  return {
    name,
  };
}
