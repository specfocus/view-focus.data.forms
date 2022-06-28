import { useTranslate } from '@specfocus/view-focus.i18n/translations/useTranslate';
import { NavigationContext } from '@specfocus/view-focus.navigation/routes/Navigation';
import { useLocation } from '@specfocus/view-focus.navigation/routes/useLocation';
import { History, Transition } from 'history';
import { useContext, useEffect, useRef } from 'react';
import { Control } from '../forms';
import { useFormState } from '../forms/useFormState';

/**
 * Display a confirmation dialog if the form has unsaved changes.
 * - If the user confirms, the navigation continues and the changes are lost.
 * - If the user cancels, the navigation is cancelled and the changes are kept.
 */
export const useWarnWhenUnsavedChanges = (
  enable: boolean,
  formRootPathname?: string,
  control?: Control
) => {
  // react-router v6 does not yet provide a way to block navigation
  // This is planned for a future release
  // See https://github.com/remix-run/react-router/issues/8139
  const navigator = useContext(NavigationContext).navigator as History;
  const location = useLocation();
  const translate = useTranslate();
  const { isSubmitSuccessful, isSubmitting, dirtyFields } = useFormState(
    control ? { control } : undefined
  );
  const isDirty = Object.keys(dirtyFields).length > 0;
  const initialLocation = useRef(formRootPathname || location.pathname);

  useEffect(() => {
    if (!enable || !isDirty) return;

    let unblock = navigator.block((tx: Transition) => {
      const newLocationIsInsideForm = tx.location.pathname.startsWith(
        initialLocation.current
      );

      if (
        !isSubmitting &&
        (newLocationIsInsideForm ||
          isSubmitSuccessful ||
          window.confirm(translate('message.unsaved_changes')))
      ) {
        unblock();
        tx.retry();
      }
    });

    return unblock;
  }, [
    enable,
    location,
    navigator,
    isDirty,
    isSubmitting,
    isSubmitSuccessful,
    translate,
  ]);
};
