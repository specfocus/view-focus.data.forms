export { default as getValidationModes, type Mode } from './modes';

export const EVENTS = {
  BLUR: 'blur',
  FOCUS_OUT: 'focusout',
  CHANGE: 'change',
};

export const INPUT_VALIDATION_RULES = {
  max: 'max',
  min: 'min',
  maxLength: 'maxLength',
  minLength: 'minLength',
  pattern: 'pattern',
  required: 'required',
  validate: 'validate',
};
