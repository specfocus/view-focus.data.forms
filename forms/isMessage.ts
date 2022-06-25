import isMessage from '@specfocus/spec-focus/messages/is-message';
import { Message } from '@specfocus/spec-focus/validations/errors';
import React from 'react';

export default (value: unknown): value is Message =>
  isMessage(value) || React.isValidElement(value as JSX.Element);
