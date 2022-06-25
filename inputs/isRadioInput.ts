import { FieldElement } from '../fields/elements';

export default (element: FieldElement): element is HTMLInputElement =>
  element.type === 'radio';
