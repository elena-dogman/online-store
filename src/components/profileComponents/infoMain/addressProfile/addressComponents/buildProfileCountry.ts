import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../../../utils/usefullFunctions/baseComponent';
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
  const countryIndicatorParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['address-prof__country-indicator'],
  };
  const countryIndicator = createElement(countryIndicatorParams);
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

  const countriesInput = createElement(countriesInpunParams);
  const countriesList = createElement(countriesListParams);
  if (currentId === billingId) {
    addInnerComponent(countryContainer, countryIndicator);
    countryIndicator.textContent = 'Billing Address';
    if (currentId === defaultBillingId) {
      countryIndicator.textContent = ' Default Billing Address';
    }
  } else if (currentId === shippingId) {
    addInnerComponent(countryContainer, countryIndicator);
    countryIndicator.textContent = 'Shipping Address';
    if (currentId === defaultShippingId) {
      countryIndicator.textContent = ' Default Shipping Address';
    }
  } else {
    addInnerComponent(countryContainer, countryIndicator);
    countryIndicator.textContent = 'Address';
  }
  addInnerComponent(countryContainer, countriesInput);
  addInnerComponent(countryContainer, countriesList);
  return [countryContainer, countriesList];
}
