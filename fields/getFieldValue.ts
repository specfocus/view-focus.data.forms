import { type Field } from '../fields';
import isUndefined from '@specfocus/spec-focus/maybe/isUndefined';
import isCheckBox from '../inputs/isCheckBoxInput';
import isFileInput from '../inputs/isFileInput';
import isMultipleSelect from '../inputs/isMultipleSelect';
import isRadioInput from '../inputs/isRadioInput';
import getCheckboxValue from './getCheckboxValue';
import getFieldValueAs from './getFieldValueAs';
import getRadioValue from './getRadioValue';

export default function getFieldValue(_f: Field['_f']) {
  const ref = _f.ref;

  if (_f.refs ? _f.refs.every((ref) => ref.disabled) : ref.disabled) {
    return;
  }

  if (isFileInput(ref)) {
    return ref.files;
  }

  if (isRadioInput(ref)) {
    return getRadioValue(_f.refs).value;
  }

  if (isMultipleSelect(ref)) {
    return Array.from(ref.selectedOptions).map(({ value }) => value);
  }

  if (isCheckBox(ref)) {
    return getCheckboxValue(_f.refs).value;
  }

  return getFieldValueAs(isUndefined(ref.value) ? _f.ref.value : ref.value, _f);
}
