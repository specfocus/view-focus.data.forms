import merge from 'lodash/merge';
import { Entity }  from '@specfocus/spec-focus/entities/Entity';

export default function getFormInitialValues(
  defaultValues: DefaultValue,
  record: Partial<Entity>
) {
  const finalInitialValues = merge(
    {},
    getValues(defaultValues, record),
    record
  );
  return finalInitialValues;
}

function getValues(values, record) {
  if (typeof values === 'object') {
    return values;
  }

  if (typeof values === 'function') {
    return values(record);
  }

  return {};
}

interface DefaultValueObject {
  [key: string]: any;
}
type DefaultValueFunction = (record: Entity) => DefaultValueObject;
type DefaultValue = DefaultValueObject | DefaultValueFunction;
