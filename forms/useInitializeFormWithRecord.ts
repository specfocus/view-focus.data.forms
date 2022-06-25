import { useEffect } from 'react';
import { useFormContext } from '../forms/useFormContext';
import getFormInitialValues from './getFormInitialValues';

/**
 * Restore the record values which should override any default values specified on the form.
 */
export const useInitializeFormWithRecord = (defaultValues, record) => {
  const { reset } = useFormContext();

  useEffect(() => {
    if (!record) {
      return;
    }
    const initialValues = getFormInitialValues(defaultValues, record);
    reset(initialValues);
  }, [reset, JSON.stringify(record, defaultValues)]); // eslint-disable-line react-hooks/exhaustive-deps
};
