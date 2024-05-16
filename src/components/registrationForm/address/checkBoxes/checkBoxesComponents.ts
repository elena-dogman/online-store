import {
  checkAllInputs,
  setValidStatus,
} from '../../../../utils/validations/booleanValid';
import { billingComponents, shippingComponents } from '../addressFactory';

import { setValidStatusAddress } from '../booleanAddress';

export function joinChecked(): void {
  setValidStatusAddress('joinAdress', true);
  shippingComponents.container.classList.add('shipping__container--join');
  billingComponents.container.classList.add('billing__container--join');
  setValidStatus('city-billing', true);
  setValidStatus('post-billing', true);
  setValidStatus('street-billing', true);
  checkAllInputs();
}

export function joinUnchecked(): void {
  shippingComponents.container.classList.remove('shipping__container--join');
  billingComponents.container.classList.remove('billing__container--join');
  setValidStatus('city-billing', false);
  setValidStatus('post-billing', false);
  setValidStatus('street-billing', false);
  setValidStatusAddress('joinAdress', false);
  checkAllInputs();
}
