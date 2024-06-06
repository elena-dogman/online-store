import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../../../utils/general/baseComponent';
import { buildRadioCountry } from './addressCheckBox';
export function buildProfileCountry(
  currentId: string | undefined,
  billingId: string[] | undefined,
  shippingId: string[] | undefined,
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
  const [
    radioContainer,
    defaultShippingCheckBox,
    defaltBillingCheckBox,
    shippingCheckBox,
    billingCheckBox,
  ] = buildRadioCountry();
  addInnerComponent(countryContainer, countryIndicatorContainer);
  addInnerComponent(countryIndicatorContainer, countryIndicator);
  addInnerComponent(countryIndicatorContainer, radioContainer);
  const countriesInput = createElement(countriesInpunParams);
  const countriesList = createElement(countriesListParams);

  if (currentId !== undefined) {
    let isBilling = false;
    let isShipping = false;

    billingId?.forEach((e) => {
      if (currentId === e) {
        billingCheckBox.setAttribute('checked', '');
        countryIndicator.textContent = 'Billing Address';
        isBilling = true;
        if (currentId === defaultBillingId) {
          defaltBillingCheckBox.setAttribute('checked', '');
          countryIndicator.textContent = 'Default Billing Address';
        }
      }
    });

    shippingId?.forEach((e) => {
      if (currentId === e) {
        shippingCheckBox.setAttribute('checked', '');
        countryIndicator.textContent = 'Shipping Address';
        isShipping = true;
        if (currentId === defaultShippingId) {
          defaultShippingCheckBox.setAttribute('checked', '');
          countryIndicator.textContent = 'Default Shipping Address';
        }
      }
    });

    if (!isBilling && !isShipping) {
      countryIndicator.textContent = 'Address';
    }
    if (isBilling && isShipping) {
      countryIndicator.textContent = 'Billing and Shipping Address';
    }
  } else {
    countryIndicator.textContent = 'Address';
  }

  if (defaultShippingCheckBox.checked && defaltBillingCheckBox.checked) {
    countryIndicator.textContent = 'Default Shipping and Billing Address';
  }

  addInnerComponent(countryContainer, countriesInput);
  addInnerComponent(countryContainer, countriesList);
  return [countryContainer, countriesList];
}
