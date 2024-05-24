import countrys from 'country-list-js';
import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../../utils/baseComponent';

import { createInput } from '../../../../utils/createInput';
// interface AddressProfileComponents {
//   streetLabel: HTMLLabelElement;
//   cityLabel: HTMLLabelElement;
//   postLabel: HTMLLabelElement;
//   streetInput: HTMLInputElement;
//   cityInput: HTMLInputElement;
//   postInput: HTMLInputElement;
// }

export function buildCountysList(): HTMLElement {
  const countrysListParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['profile__country-list'],
  };
  const countrysList = createElement(countrysListParams);
  const allCountrys = countrys.names();
  allCountrys.forEach((e) => {
    const countryItemParams: ElementParams<'div'> = {
      tag: 'div',
      classNames: ['profile__country-item'],
      textContent: e,
    };
    const countryItem = createElement(countryItemParams);
    countrysList.append(countryItem);
  });
  return countrysList;
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
    countryIndicator.textContent = 'Billing Adress';
    if (currentId === defaultBillingId) {
      countryIndicator.textContent = ' Default Billing Adress';
    }
  }
  if (currentId === shippingId) {
    addInnerComponent(countryContainer, countryIndicator);
    countryIndicator.textContent = 'Shipping Adress';
    if (currentId === defaultShippingId) {
      countryIndicator.textContent = ' Default Shipping Adress';
    }
  }
  addInnerComponent(countryContainer, countryLabel);
  addInnerComponent(countryLabel, countryInput);
  return [countryContainer, countryInput];
}
