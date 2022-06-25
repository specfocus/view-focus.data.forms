import isObject from '@specfocus/spec-focus/objects/is-object';
import isRegex from '@specfocus/spec-focus/regex/isRegex';
import type { ValidationRule } from '@specfocus/spec-focus/validations/validator';

export default (validationData?: ValidationRule) =>
  isObject(validationData) && !isRegex(validationData)
    ? validationData
    : {
        value: validationData,
        message: '',
      };
