import isUndefined from '@specfocus/spec-focus/maybe/isUndefined';
import isObject from '@specfocus/spec-focus/objects/is-object';
import isRegex from '@specfocus/spec-focus/regex/isRegex';
import type {
  ValidationRule,
  ValidationValue,
  ValidationValueMessage
} from '@specfocus/spec-focus/validations/validator';

export default <T extends ValidationValue>(
  rule?: ValidationRule<T> | ValidationValueMessage<T>,
) =>
  isUndefined(rule)
    ? undefined
    : isRegex(rule)
    ? rule.source
    : isObject(rule)
    ? isRegex(rule.value)
      ? rule.value.source
      : rule.value
    : rule;
