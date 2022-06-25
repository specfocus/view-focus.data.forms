import { type Field } from '@specfocus/spec-focus/fields';
import type { NativeFieldValue } from '@specfocus/spec-focus/fields/values';
import isNullOrUndefined from '@specfocus/spec-focus/maybe/isNullOrUndefined';
import isUndefined from '@specfocus/spec-focus/maybe/isUndefined';
import isString from '@specfocus/spec-focus/strings/isString';

export default <T extends NativeFieldValue>(
  value: T,
  { valueAsNumber, valueAsDate, setValueAs }: Field['_f'],
) =>
  isUndefined(value)
    ? value
    : valueAsNumber
    ? value === '' || isNullOrUndefined(value)
      ? NaN
      : +value
    : valueAsDate && isString(value)
    ? new Date(value)
    : setValueAs
    ? setValueAs(value)
    : value;
