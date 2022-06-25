import type { FieldRefs, InternalFieldName } from '@specfocus/spec-focus/fields';
import isUndefined from '@specfocus/spec-focus/maybe/isUndefined';
import isObject from '@specfocus/spec-focus/objects/is-object';
import { get } from '@specfocus/spec-focus/structs';

const focusFieldBy = (
  fields: FieldRefs,
  callback: (name: string) => boolean,
  fieldsNames?: Set<InternalFieldName> | InternalFieldName[],
) => {
  for (const key of fieldsNames || Object.keys(fields)) {
    const field = get(fields, key);

    if (field) {
      const { _f, ...currentField } = field;

      if (_f && callback(_f.name)) {
        if (_f.ref.focus && isUndefined(_f.ref.focus())) {
          break;
        } else if (_f.refs) {
          _f.refs[0].focus();
          break;
        }
      } else if (isObject(currentField)) {
        focusFieldBy(currentField, callback);
      }
    }
  }
};

export default focusFieldBy;
