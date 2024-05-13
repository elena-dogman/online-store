import { setValidStatus } from '../../../../utils/validations/booleanValid';
import { billing, shipping } from '../../registrationForm';
import { setValidStatusAddress } from '../booleanAddress';

export function joinChecked(): void {
  setValidStatusAddress('joinAdress', true);
  shipping.classList.add('address__shipping--join');
  billing.classList.add('address__billing--join');
  setValidStatusAddress('joinAdress', true);
  setValidStatus('cityBilling', true);
  setValidStatus('postBilling', true);
  setValidStatus('streetBilling', true);
}
export function joinUnchecked(): void {
  shipping.classList.remove('address__shipping--join');
  billing.classList.remove('address__billing--join');
  setValidStatus('cityBilling', false);
  setValidStatus('postBilling', false);
  setValidStatus('streetBilling', false);
  setValidStatusAddress('joinAdress', false);
}
