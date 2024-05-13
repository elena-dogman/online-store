import * as billingComponents from './billing';
import * as shippingComponents from './shipping';
import {
  addBillingCountries,
  addShippingCountries,
  removeList,
} from './addressComponents';

export function addCountries(this: HTMLElement): void {
  const billingCountries = billingComponents.billingListCountry;
  const shippingCountries = shippingComponents.shippingListCountry;
  const shippingInput =
    shippingComponents.shippingInputCountry as HTMLInputElement;
  const billingInput =
    billingComponents.billingInputCountry as HTMLInputElement;
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
