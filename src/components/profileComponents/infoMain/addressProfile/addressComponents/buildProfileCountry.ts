import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../../../utils/general/baseComponent';
import { buildRadioCountry } from './addressRadio';
export function buildProfileCountry(
  currentId: string | undefined,
  billingId: string | undefined,
  shippingId: string | undefined,
  defaultBillingId: string | undefined,
  defaultShippingId: string | undefined,
): [HTMLElement, HTMLElement] {
  const countryContainerParam: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['address-prof__country-container', 'country-wrapper'],
  };
  const countryIndicatorContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['address-prof__country-indicator-container'],
  };
  const countryIndicatorContainer = createElement(
    countryIndicatorContainerParams,
  );
  const countryContainer = createElement(countryContainerParam);
  const countriesListParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['address-prof__countries-list', 'countries-list', 'readonly'],
  };
  const countriesInpunParams: ElementParams<'input'> = {
    tag: 'input',
    classNames: ['address-prof-input', 'reg-input'],
    attributes: { type: 'text', placeholder: 'Enter your country', hide: '' },
  };
  const countryIndicatorParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['address-prof__country-indicator'],
  };
  const countryIndicator = createElement(countryIndicatorParams);
  // radioContainer,
  // defaultShippingRadio,
  // defaultShippingRadio,
  // shippingRadio,
  // billingRadio,
  const [
    radioContainer,
    defaultShippingRadio,
    defultBillingRadio,
    shippingRadio,
    billingRadio,
  ] = buildRadioCountry();
  console.log(
    defaultShippingRadio,
    defultBillingRadio,
    shippingRadio,
    billingRadio,
  );
  addInnerComponent(countryContainer, countryIndicatorContainer);
  addInnerComponent(countryIndicatorContainer, countryIndicator);
  addInnerComponent(countryIndicatorContainer, radioContainer);
  const countriesInput = createElement(countriesInpunParams);
  const countriesList = createElement(countriesListParams);
  if (currentId !== undefined) {
    if (currentId === billingId) {
      countryIndicator.textContent = 'Billing Address';
      if (currentId === defaultBillingId) {
        countryIndicator.textContent = ' Default Billing Address';
      }
    } else if (currentId === shippingId) {
      countryIndicator.textContent = 'Shipping Address';
      if (currentId === defaultShippingId) {
        countryIndicator.textContent = ' Default Shipping Address';
      }
    } else {
      countryIndicator.textContent = 'Address';
    }
  } else {
    countryIndicator.textContent = 'Address';
  }
  addInnerComponent(countryContainer, countriesInput);
  addInnerComponent(countryContainer, countriesList);
  return [countryContainer, countriesList];
}
