import { ElementParams, createElement } from '../../../utils/baseComponent';
import * as errors from '../../../utils/validations/validationsErrors';
import { validateInput } from '../../../utils/validations/validation';
import { addCountries } from './countryList';
export const billingLabelStreet = createElement({
  tag: 'label',
  classNames: ['billing__street-label', 'reg__label'],
  textContent: 'Street',
});
export const billingInputStreet = createElement({
  tag: 'input',
  classNames: ['billing__street-input', 'reg-input'],
  attributes: {
    type: 'text',
    disabled: '',
    'data-validation-type': 'billingStreet',
  },
});
export const billingLabelCity = createElement({
  tag: 'label',
  classNames: ['billing__city-label', 'reg__label'],
  textContent: 'City',
});
export const billingInputCity = createElement({
  tag: 'input',
  classNames: ['billing__city-input', 'reg-input'],
  attributes: {
    type: 'text',
    disabled: '',
    'data-validation-type': 'billingCity',
  },
});
export const billingLabelPost = createElement({
  tag: 'label',
  classNames: ['billing__post-label', 'reg__label'],
  textContent: 'Post',
});
export const billingInputPost = createElement({
  tag: 'input',
  classNames: ['billing__post-input', 'reg-input'],
  attributes: {
    type: 'text',
    disabled: '',
    'data-validation-type': 'billingPost',
  },
});
export const billingLabelCountry = createElement({
  tag: 'label',
  classNames: ['billing__country-label', 'reg__label'],
  textContent: 'Billing Country',
});
export const billingListCountry = createElement({
  tag: 'div',
  classNames: ['billing__countries-list'],
  textContent: 'Choose your country',
});
const billingCountryWrapper = createElement({
  tag: 'div',
  classNames: ['billing__country-wrapper'],
});
export const billingInputCountry = createElement({
  tag: 'input',
  classNames: ['billing__countries-input', 'reg-input'],
  textContent: 'Chose your country',
  attributes: { type: 'text' },
});
export function addBilling(): HTMLElement {
  const addressBillingParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['address__billing'],
  };
  const addressBilling = createElement(addressBillingParams);
  addressBilling.append(billingLabelCountry);
  billingListCountry.addEventListener('click', addCountries);
  billingCountryWrapper.append(billingInputCountry);
  billingLabelCountry.append(billingCountryWrapper);
  billingCountryWrapper.append(billingListCountry);
  addressBilling.append(billingLabelPost);
  billingLabelPost.append(billingInputPost);
  billingLabelPost.append(errors.errorBillingPostReg);
  billingInputPost.addEventListener('input', validateInput);
  addressBilling.append(billingLabelCity);
  billingLabelCity.append(billingInputCity);
  billingLabelCity.append(errors.errorBillingCityReg);
  billingInputCity.addEventListener('input', validateInput);
  addressBilling.append(billingLabelStreet);
  billingLabelStreet.append(billingInputStreet);
  billingLabelStreet.append(errors.errorBillingStreetReg);
  billingInputStreet.addEventListener('input', validateInput);
  return addressBilling;
}
