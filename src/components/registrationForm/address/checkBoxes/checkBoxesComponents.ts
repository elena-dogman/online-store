import {
  checkAllInputs,
  setValidStatus,
} from '../../../../utils/validations/booleanValid';
import { billingComponents, shippingComponents } from '../addressFactory';

import { setValidStatusAddress } from '../booleanAddress';

export function joinChecked(): void {
  setValidStatusAddress('joinAdress', true);
  shippingComponents.countryWrapper.classList.add('address__shipping--join');
  billingComponents.countryWrapper.classList.add('address__billing--join');
  setValidStatus('cityBilling', true);
  setValidStatus('postBilling', true);
  setValidStatus('streetBilling', true);
  checkAllInputs();
}

export function joinUnchecked(): void {
  shippingComponents.countryWrapper.classList.remove('address__shipping--join');
  billingComponents.countryWrapper.classList.remove('address__billing--join');
  setValidStatus('cityBilling', false);
  setValidStatus('postBilling', false);
  setValidStatus('streetBilling', false);
  setValidStatusAddress('joinAdress', false);
  checkAllInputs();
}
