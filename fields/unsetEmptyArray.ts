import compact from '@specfocus/spec-focus/arrays/compact';
import get from '@specfocus/spec-focus/structs/get';
import unset from '@specfocus/spec-focus/structs/unset';

export default <T>(ref: T, name: string) =>
  !compact(get(ref, name)).length && unset(ref, name);
