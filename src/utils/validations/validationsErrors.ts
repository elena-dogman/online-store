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
export const errorPostReg = createErrorElement();
export const errorCityReg = createErrorElement();
export const errorStreetReg = createErrorElement();
