import { validateInput } from '../../utils/validations/validation';
import { createElement } from '../../utils/baseComponent';
import * as errors from '..//..//utils/validations/validationsErrors';
import { submitRegData } from './submitRegDate';
import { addShipping } from './address/shipping';
import { addBilling } from './address/billing';
import { addDate } from './dateComponent';

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
  authSideForm.append(regFormLabelName);
  regFormLabelName.append(regFormInputName);
  regFormLabelName.append(errors.errorNameReg);
  regFormInputName.addEventListener('input', validateInput);
  authSideForm.append(regFormLabelLastName);
  regFormLabelLastName.append(regFormInputLastName);
  regFormLabelLastName.append(errors.errorLastNameReg);
  regFormInputLastName.addEventListener('input', validateInput);
  authSideForm.append(regFormLabelMail);
  regFormLabelMail.append(regFormInputMail);
  regFormLabelMail.append(errors.errorEmailReg);
  regFormInputMail.addEventListener('input', validateInput);
  authSideForm.append(regFormLabelPassword);
  regFormLabelPassword.append(regFormInputPassword);
  regFormLabelPassword.append(errors.errorPasswordReg);
  regFormInputPassword.addEventListener('input', validateInput);
  authSideForm.append(addDate());
  address.append(addShipping());
  address.append(addBilling());
  authSideForm.append(address);
  authSideForm.append(authFormButton);
  authFormButton.addEventListener('click', submitRegData);
  console.log(authFormButton);
}
