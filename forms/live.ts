import { Ref } from '../fields';
import isHTMLElement from '../inputs/isHTMLElement';

export default (ref: Ref) => isHTMLElement(ref) && ref.isConnected;
