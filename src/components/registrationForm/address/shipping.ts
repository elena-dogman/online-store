import { ElementParams, createElement } from '../../../utils/baseComponent';
import * as errors from '../../../utils/validations/validationsErrors';
import { validateInput } from '../../../utils/validations/validation';
import { addCountries } from './countryList';
export const shippingLabelStreet = createElement({
  tag: 'label',
  classNames: ['shipping__street-label', 'reg__label'],
  textContent: 'Address',
});
export const shippingInputStreet = createElement({
  tag: 'input',
  classNames: ['shipping__street-input', 'reg-input'],
  attributes: {
    type: 'text',
    disabled: '',
    'data-validation-type': 'street',
  },
});
export const shippingLabelCity = createElement({
  tag: 'label',
  classNames: ['shipping__city-label', 'reg__label'],
  textContent: 'City',
});
export const shippingInputCity = createElement({
  tag: 'input',
  classNames: ['shipping__city-input', 'reg-input'],
  attributes: {
    type: 'text',
    disabled: '',
    'data-validation-type': 'shippingCity',
  },
});
export const shippingLabelPost = createElement({
  tag: 'label',
  classNames: ['shipping__post-label', 'reg__label'],
  textContent: 'Post',
});
export const shippingInputPost = createElement({
  tag: 'input',
  classNames: ['shipping__post-input', 'reg-input'],
  attributes: {
    type: 'text',
    disabled: '',
    'data-validation-type': 'shippingPost',
  },
});
export const shippingLabelCountry = createElement({
  tag: 'label',
  classNames: ['shipping__country-label', 'reg__label'],
  textContent: 'Country',
});
export const shippingListCountry = createElement({
  tag: 'div',
  classNames: ['shipping__countries-list'],
  textContent: 'Choose your country',
});
const shippingCountryWrapper = createElement({
  tag: 'div',
  classNames: ['shipping__country-wrapper'],
});
export const shippingInputCountry = createElement({
  tag: 'input',
  classNames: ['shipping__countries-input', 'reg-input'],
  textContent: 'Chose your country',
  attributes: { type: 'text' },
});
export function addShipping(): HTMLElement {
  const addressShippingParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['address__shipping'],
  };
  const addressShipping = createElement(addressShippingParams);
  addressShipping.append(shippingLabelCountry);
  shippingListCountry.addEventListener('click', addCountries);
  shippingCountryWrapper.append(shippingInputCountry);
  shippingLabelCountry.append(shippingCountryWrapper);
  shippingCountryWrapper.append(shippingListCountry);
  addressShipping.append(shippingLabelPost);
  shippingLabelPost.append(shippingInputPost);
  shippingLabelPost.append(errors.errorShippingPostReg);
  shippingInputPost.addEventListener('input', validateInput);
  addressShipping.append(shippingLabelCity);
  shippingLabelCity.append(shippingInputCity);
  shippingLabelCity.append(errors.errorShippingCityReg);
  shippingInputCity.addEventListener('input', validateInput);
  addressShipping.append(shippingLabelStreet);
  shippingLabelStreet.append(shippingInputStreet);
  shippingLabelStreet.append(errors.errorShippingStreetReg);
  shippingInputStreet.addEventListener('input', validateInput);
  return addressShipping;
}
