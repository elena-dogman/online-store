import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../../../utils/baseComponent';
import { createInput } from '../../../../../utils/createInput';
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
  // countryInput.addEventListener('input', checkInput);
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
