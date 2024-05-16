import { validateInput } from '../../utils/validations/validation';
import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../utils/baseComponent';
import * as errors from '..//..//utils/validations/validationsErrors';
import { submitRegData } from './submitRegData';
import { addDate } from './dateComponent';
import { createDefaultChecks } from './address/checkBoxes/addressCheckBoxes';
import { addressesContainer } from './address/addressFactory';
export const errorNameReg = errors.createErrorElement();
export const errorLastNameReg = errors.createErrorElement();
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
export const errorEmailReg = errors.createErrorElement();
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
export const errorPasswordReg = errors.createErrorElement();
export const regFormInputPassword = createElement({
  tag: 'input',
  classNames: ['reg-form__password-input', 'reg-input'],
  attributes: {
    type: 'password',
    'data-validation-type': 'password',
  },
});

export const passwordIconParams: ElementParams<'img'> = {
  tag: 'img',
  attributes: {
    src: '/assets/authpage/hide.png',
    alt: 'make your password visible/hide',
    title: 'Click to make your password visible',
  },
  classNames: ['password_icon'],
};

const passwordIcon = createElement(passwordIconParams);
regFormInputPassword.addEventListener('keydown', function (event) {
  if (event.key === ' ') {
    event.preventDefault();
  }
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
  attributes: { type: 'button', disabled: '' },
  textContent: 'Create Account',
});

export function createForm(): void {
  addInnerComponent(authSideForm, regFormLabelName);
  addInnerComponent(regFormLabelName, regFormInputName);
  addInnerComponent(regFormLabelName, errorNameReg);

  regFormInputName.addEventListener('input', validateInput);
  addInnerComponent(authSideForm, regFormLabelLastName);
  addInnerComponent(regFormLabelLastName, regFormInputLastName);
  addInnerComponent(regFormLabelLastName, errorLastNameReg);
  regFormInputLastName.addEventListener('input', validateInput);

  addInnerComponent(authSideForm, regFormLabelMail);
  addInnerComponent(regFormLabelMail, regFormInputMail);
  addInnerComponent(regFormLabelMail, errorEmailReg);
  regFormInputMail.addEventListener('input', validateInput);

  addInnerComponent(authSideForm, regFormLabelPassword);
  addInnerComponent(regFormLabelPassword, regFormInputPassword);
  addInnerComponent(regFormLabelPassword, passwordIcon);
  addInnerComponent(regFormLabelPassword, errorPasswordReg);
  regFormInputPassword.addEventListener('input', validateInput);

  addInnerComponent(authSideForm, regDateAndCheckContainer);
  addInnerComponent(regDateAndCheckContainer, addDate());
  addInnerComponent(regDateAndCheckContainer, createDefaultChecks()[0]);
  addInnerComponent(authSideForm, addressesContainer);
  addInnerComponent(authSideForm, address);
  addInnerComponent(authSideForm, authFormButton);
  authFormButton.addEventListener('click', submitRegData);

  passwordIcon.addEventListener('click', (event) => {
    event.preventDefault();
    if (regFormInputPassword.getAttribute('type') === 'password') {
      regFormInputPassword.setAttribute('type', 'text');
      passwordIcon.setAttribute('src', '/assets/authpage/show.png');
      passwordIcon.setAttribute('title', 'Click to hide your password');
    } else {
      regFormInputPassword.setAttribute('type', 'password');
      passwordIcon.setAttribute('src', '/assets/authpage/hide.png');
      passwordIcon.setAttribute('title', 'Click to make your password visible');
    }
  });
}
