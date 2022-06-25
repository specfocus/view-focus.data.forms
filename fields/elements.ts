import type { FieldName } from '@specfocus/spec-focus/fields/names';
import { FieldValues } from '@specfocus/spec-focus/fields/values';
import { Noop } from '@specfocus/spec-focus/functions/noop';

export type CustomElement<TFieldValues extends FieldValues> = {
  name: FieldName<TFieldValues>;
  type?: string;
  value?: any;
  disabled?: boolean;
  checked?: boolean;
  options?: HTMLOptionsCollection;
  files?: FileList | null;
  focus?: Noop;
};

export type FieldElement<TFieldValues extends FieldValues = FieldValues> =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement
  | CustomElement<TFieldValues>;
