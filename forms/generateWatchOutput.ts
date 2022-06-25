import get from '@specfocus/spec-focus/structs/get';
import isString from '@specfocus/spec-focus/strings/isString';
import { Names } from '.';
import { FieldValues } from '@specfocus/spec-focus/fields/values';
import { InternalFieldName } from '@specfocus/spec-focus/fields/names';

export default (
  names: string | string[] | undefined,
  _names: Names,
  formValues?: FieldValues,
  isGlobal?: boolean,
) => {
  const isArray = Array.isArray(names);
  if (isString(names)) {
    isGlobal && _names.watch.add(names as InternalFieldName);
    return get(formValues, names as InternalFieldName);
  }

  if (isArray) {
    return names.map(
      (fieldName) => (
        isGlobal && _names.watch.add(fieldName as InternalFieldName),
        get(formValues, fieldName as InternalFieldName)
      ),
    );
  }

  isGlobal && (_names.watchAll = true);
  return formValues;
};
