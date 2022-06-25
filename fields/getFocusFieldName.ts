import type { InternalFieldName } from '@specfocus/spec-focus/fields/names';
import isUndefined from '@specfocus/spec-focus/maybe/isUndefined';
import type { FieldArrayMethodProps } from './arrays';

export default (
  name: InternalFieldName,
  index: number,
  options: FieldArrayMethodProps = {},
): string =>
  options.shouldFocus || isUndefined(options.shouldFocus)
    ? options.focusName ||
      `${name}.${isUndefined(options.focusIndex) ? index : options.focusIndex}.`
    : '';
