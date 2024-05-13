import { validateInput } from '../../utils/validations/validation';
import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../utils/baseComponent';
import * as errors from '..//..//utils/validations/validationsErrors';
import { submitRegData } from './submitRegData';
import { addShipping } from './address/shipping';
import { addBilling } from './address/billing';
import { addDate } from './dateComponent';
import { createDefaultChecks } from './address/checkBoxes/addressCheckBoxes';
export const shipping = addShipping();
export const billing = addBilling();
export const authSideForm = createElement({
  tag: 'form',
  classNames: ['auth-side__reg-form'],
});
export const regFormLabelName = createElement({
  tag: 'label',
  classNames: ['reg-form__name-label', 'reg__label'],
  textContent: 'Name',
});
export const regFormInputName = createElement({
  tag: 'input',
  classNames: ['reg-form__name-input', 'reg-input'],
  attributes: { type: 'text', 'data-validation-type': 'name' },
});
export const regFormLabelLastName = createElement({
  tag: 'label',
  classNames: ['reg-form__last-name-label', 'reg__label'],
  textContent: 'Last Name',
});
export const regFormInputLastName = createElement({
  tag: 'input',
  classNames: ['reg-form__last-name-input', 'reg-input'],
  attributes: {
    type: 'text',
    'data-validation-type': 'lastName',
  },
});
export const regFormLabelMail = createElement({
  tag: 'label',
  classNames: ['reg-form__mail-label', 'reg__label'],
  textContent: 'Email',
});
export const regFormInputMail = createElement({
  tag: 'input',
  classNames: ['reg-form__mail-input', 'reg-input'],
  attributes: {
    type: 'email',
    'data-validation-type': 'email',
  },
});
export const regFormLabelPassword = createElement({
  tag: 'label',
  classNames: ['reg-form__password-label', 'reg__label'],
  textContent: 'Password',
});
export const regFormInputPassword = createElement({
  tag: 'input',
  classNames: ['reg-form__password-input', 'reg-input'],
  attributes: {
    type: 'password',
    'data-validation-type': 'password',
  },
});
const regDateAndCheckContainerParams: ElementParams<'div'> = {
  tag: 'div',
  classNames: ['reg-form__container__date-checks'],
};
const regDateAndCheckContainer = createElement(regDateAndCheckContainerParams);

const address = createElement({
  tag: 'div',
  classNames: ['reg-form__address'],
});

export const authFormButton = createElement({
  tag: 'button',
  classNames: ['reg-form__button', 'reg-button'],
  attributes: { type: 'button' },
  textContent: 'Create Account',
});

export function createForm(): void {
  addInnerComponent(authSideForm, regFormLabelName);
  addInnerComponent(regFormLabelName, regFormInputName);
  addInnerComponent(regFormLabelName, errors.errorNameReg);

  regFormInputName.addEventListener('input', validateInput);
  addInnerComponent(authSideForm, regFormLabelLastName);
  addInnerComponent(regFormLabelLastName, regFormInputLastName);
  addInnerComponent(regFormLabelLastName, errors.errorLastNameReg);
  regFormInputLastName.addEventListener('input', validateInput);

  addInnerComponent(authSideForm, regFormLabelMail);
  addInnerComponent(regFormLabelMail, regFormInputMail);
  addInnerComponent(regFormLabelMail, errors.errorEmailReg);
  regFormInputMail.addEventListener('input', validateInput);

  addInnerComponent(authSideForm, regFormLabelPassword);
  addInnerComponent(regFormLabelPassword, regFormInputPassword);
  addInnerComponent(regFormLabelPassword, errors.errorPasswordReg);
  regFormInputPassword.addEventListener('input', validateInput);

  addInnerComponent(authSideForm, regDateAndCheckContainer);
  addInnerComponent(regDateAndCheckContainer, addDate());
  addInnerComponent(regDateAndCheckContainer, createDefaultChecks()[0]);
  addInnerComponent(address, shipping);
  addInnerComponent(address, billing);
  addInnerComponent(authSideForm, address);
  addInnerComponent(authSideForm, authFormButton);
  authFormButton.addEventListener('click', submitRegData);
}
