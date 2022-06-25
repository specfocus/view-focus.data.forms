import isEmptyObject from '@specfocus/spec-focus/objects/is-empty-object';
import type { ReadFormState } from '.';
import { VALIDATION_MODE } from '../validations/modes';

export default <T extends Record<string, any>, K extends ReadFormState>(
  formStateData: T,
  _proxyFormState: K,
  isRoot?: boolean,
) => {
  const { name, ...formState } = formStateData;

  return (
    isEmptyObject(formState) ||
    Object.keys(formState).length >= Object.keys(_proxyFormState).length ||
    Object.keys(formState).find(
      (key) =>
        _proxyFormState[key as keyof ReadFormState] ===
        (!isRoot || VALIDATION_MODE.all),
    )
  );
};
