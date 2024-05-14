import {
  addBillingCountries,
  addShippingCountries,
  removeList,
} from './addressComponents';
import { billingComponents, shippingComponents } from './addressFactory';

export function addCountries(this: HTMLElement): void {
  const billingCountries = billingComponents.listCountry;
  const shippingCountries = shippingComponents.listCountry;
  const shippingInput = shippingComponents.inputCountry as HTMLInputElement;
  const billingInput = billingComponents.inputCity as HTMLInputElement;
  if (this === billingCountries) {
    addBillingCountries(this);
    if (shippingCountries.textContent !== 'Choose your country') {
      if (shippingCountries.children.length > 2) {
        removeList(shippingCountries, shippingInput);
      }
    }
  }
  if (this === shippingCountries) {
    addShippingCountries(this);
    if (billingCountries.textContent !== 'Choose your country') {
      if (billingCountries.children.length > 2) {
        removeList(billingCountries, billingInput);
      }
    }
  }
}
