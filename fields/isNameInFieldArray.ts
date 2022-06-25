import type { InternalFieldName } from '@specfocus/spec-focus/fields/names';
import getNodeParentName from './getNodeParentName';

export default (names: Set<InternalFieldName>, name: InternalFieldName) =>
  names.has(getNodeParentName(name));
