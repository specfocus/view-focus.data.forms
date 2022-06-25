import { FieldElement } from '../fields/elements';

export default (element: FieldElement): element is HTMLSelectElement =>
  element.type === `select-multiple`;
