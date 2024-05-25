import countries from 'country-list-js';
import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../../utils/baseComponent';

import { createInput } from '../../../../utils/createInput';
export function buildCountriesList(): HTMLElement {
  const countriesListParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['profile__countries-list'],
  };
  const countriesList = createElement(countriesListParams);
  const allCountries = countries.names();
  allCountries.forEach((e) => {
    const countryItemParams: ElementParams<'div'> = {
      tag: 'div',
      classNames: ['profile__countries-item'],
      textContent: e,
    };
    const countryItem = createElement(countryItemParams);
    countriesList.append(countryItem);
  });
  return countriesList;
}
export function buildProfileAddressLoyalt(): [
  HTMLLabelElement,
  HTMLLabelElement,
  HTMLLabelElement,
  HTMLInputElement,
  HTMLInputElement,
  HTMLInputElement,
] {
  const [cityLabel, cityInput] = createInput(
    'City',
    [
      ['address-prof__city-label', 'prof-label'],
      ['address-prof__city-input', 'prof-input'],
    ],
    'city',
  );
  addInnerComponent(cityLabel, cityInput);
  cityInput.setAttribute('readonly', '');
  const [postLabel, postInput] = createInput(
    'Postal Code',
    [
      ['address-prof__post-label', 'prof-label'],
      ['address-prof__post-input', 'prof-input'],
    ],
    'post',
  );
  addInnerComponent(postLabel, postInput);
  postInput.setAttribute('readonly', '');

  const [streetLabel, streetInput] = createInput(
    'Street',
    [
      ['address-prof__street-label', 'prof-label'],
      ['address-prof__street-input', 'prof-input'],
    ],
    'street',
  );
  streetInput.setAttribute('readonly', '');
  addInnerComponent(streetLabel, streetInput);
  return [streetLabel, cityLabel, postLabel, streetInput, cityInput, postInput];
}
export function buildProfileCountry(
  currentId: string | undefined,
  billingId: string | undefined,
  shippingId: string | undefined,
  defaultBillingId: string | undefined,
  defaultShippingId: string | undefined,
): [HTMLElement, HTMLInputElement] {
  const countryContainerParam: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['address-prof__country-container'],
  };
  const countryIndicatorParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['address-prof__country-indicator'],
  };
  const countryIndicator = createElement(countryIndicatorParams);
  const countryContainer = createElement(countryContainerParam);
  const [countryLabel, countryInput] = createInput(
    'Country',
    [
      ['address-prof__country-label', 'prof-label'],
      ['address-prof__country-input', 'prof-input'],
    ],
    'country',
  );
  countryInput.setAttribute('readonly', '');
  if (currentId === billingId) {
    addInnerComponent(countryContainer, countryIndicator);
    countryIndicator.textContent = 'Billing Address';
    if (currentId === defaultBillingId) {
      countryIndicator.textContent = ' Default Billing Address';
    }
  }
  if (currentId === shippingId) {
    addInnerComponent(countryContainer, countryIndicator);
    countryIndicator.textContent = 'Shipping Address';
    if (currentId === defaultShippingId) {
      countryIndicator.textContent = ' Default Shipping Address';
    }
  }
  addInnerComponent(countryContainer, countryLabel);
  addInnerComponent(countryLabel, countryInput);
  return [countryContainer, countryInput];
}
