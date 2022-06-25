import { Shape } from '@specfocus/spec-focus/shapes';
import { UseFormProps } from '../forms';
import { ReactNode } from 'react';
import { useForm } from './useForm';
import { FormProvider, useFormContext } from './useFormContext';
import React from 'react';

export type FormProps = FormOwnProps &
  Omit<UseFormProps, 'onSubmit'> & {
    // validate?: ValidateForm;
    noValidate?: boolean;
  };

export interface FormOwnProps<Values extends Shape = Shape> {
  children: ReactNode;
  className?: string;
  defaultValues?: any;
  formRootPathname?: string;
  id?: string;
  record?: Partial<Values>;
  resource?: string;
  // onSubmit?: (data: FieldValues) => any | Promise<any>;
  warnWhenUnsavedChanges?: boolean;
}

const render = (props: UseFormProps) => {
  const methods = useForm();
  const onSubmit = () => {};
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <NestedInput />
        <input type="submit" />
      </form>
    </FormProvider>
  );
};

function NestedInput() {
  const { register } = useFormContext(); // retrieve all hook methods
  return <input {...register('test')} />;
}

export default render;