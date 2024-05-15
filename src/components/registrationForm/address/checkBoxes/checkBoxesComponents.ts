import {
  checkAllInputs,
  setValidStatus,
} from '../../../../utils/validations/booleanValid';
import { billingComponents, shippingComponents } from '../addressFactory';

import { setValidStatusAddress } from '../booleanAddress';

export function joinChecked(): void {
  setValidStatusAddress('joinAdress', true);
  shippingComponents.container.classList.add('address__shipping--join');
  billingComponents.container.classList.add('address__billing--join');
  setValidStatus('city-billing', true);
  setValidStatus('post-billing', true);
  setValidStatus('street-billing', true);
  checkAllInputs();
}

export function joinUnchecked(): void {
  shippingComponents.container.classList.remove('address__shipping--join');
  billingComponents.container.classList.remove('address__billing--join');
  setValidStatus('city-billing', false);
  setValidStatus('post-billing', false);
  setValidStatus('street-billing', false);
  setValidStatusAddress('joinAdress', false);
  checkAllInputs();
}
