import { createElement } from '../baseComponent';
function createErrorElement(): HTMLElement {
  return createElement({
    tag: 'span',
    classNames: ['error'],
  });
}

export const errorNameReg = createErrorElement();
export const errorLastNameReg = createErrorElement();
export const errorEmailReg = createErrorElement();
export const errorPasswordReg = createErrorElement();
export const errorBirthReg = createErrorElement();
export const errorBillingPostReg = createErrorElement();
export const errorBillingCityReg = createErrorElement();
export const errorBillingStreetReg = createErrorElement();
export const errorShippingPostReg = createErrorElement();
export const errorShippingCityReg = createErrorElement();
export const errorShippingStreetReg = createErrorElement();
