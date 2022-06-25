import { useTranslate } from '@specfocus/view-focus.i18n/i18n/useTranslate';
import {
  ValidationErrorMessage,
  ValidationErrorMessageWithArgs
} from './validate';

export interface ValidationErrorProps {
  error: ValidationErrorMessage;
}

const ValidationError = (props: ValidationErrorProps) => {
  const { error } = props;
  const translate = useTranslate();
  if ((error as ValidationErrorMessageWithArgs).message) {
    const { message, args } = error as ValidationErrorMessageWithArgs;
    return <>{translate(message, { _: message, ...args })}</>;
  }

  return <>{translate(error as string, { _: error })}</>;
};

export default ValidationError;
