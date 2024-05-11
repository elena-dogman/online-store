import { validateInput } from '../../utils/validations/validation';
import * as validationFunc from '../../utils/validations/validationsComponents';
import { addCountries } from './countryList';
import { createElement } from '../../utils/baseComponent';
import * as errors from '..//..//utils/validations/validationsErrors';
import { submitRegData } from '../../utils/validations/submitRegData';

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
export const regFormLabelBirth = createElement({
  tag: 'label',
  classNames: ['reg-form__birthday-label', 'reg__label'],
  textContent: 'Date Of Birth',
});
const containerForBirth = createElement({
  tag: 'label',
  classNames: ['reg-form__birthday-container'],
});
export const birthDay = createElement({
  tag: 'input',
  classNames: ['birthday__day', 'reg-input', 'birthday-input'],
  attributes: {
    type: 'text',
    maxLength: '2',
    'data-validation-type': 'day',
  },
});
export const birthMonth = createElement({
  tag: 'input',
  classNames: ['birthday__month', 'reg-input', 'birthday-input'],
  attributes: {
    type: 'text',
    maxLength: '2',
    'data-validation-type': 'month',
  },
});
export const birthYear = createElement({
  tag: 'input',
  classNames: ['birthday__year', 'reg-input', 'birthday-input'],
  attributes: {
    type: 'text',
    maxLength: '4',
    'data-validation-type': 'year',
  },
});
const address = createElement({
  tag: 'div',
  classNames: ['reg-form__address'],
});
export const addressLabelStreet = createElement({
  tag: 'label',
  classNames: ['address__street-label', 'reg__label'],
  textContent: 'Address',
});
export const addressInputStreet = createElement({
  tag: 'input',
  classNames: ['address__street-input', 'reg-input'],
  attributes: {
    type: 'text',
    disabled: '',
    'data-validation-type': 'street',
  },
});
export const addressLabelCity = createElement({
  tag: 'label',
  classNames: ['address__city-label', 'reg__label'],
  textContent: 'City',
});
export const addressInputCity = createElement({
  tag: 'input',
  classNames: ['address__city-input', 'reg-input'],
  attributes: {
    type: 'text',
    disabled: '',
    'data-validation-type': 'city',
  },
});
export const addressLabelPost = createElement({
  tag: 'label',
  classNames: ['address__post-label', 'reg__label'],
  textContent: 'Post',
});
export const addressInputPost = createElement({
  tag: 'input',
  classNames: ['address__post-input', 'reg-input'],
  attributes: {
    type: 'text',
    disabled: '',
    'data-validation-type': 'post',
  },
});
export const addressLabelCountry = createElement({
  tag: 'label',
  classNames: ['address__country-label', 'reg__label'],
  textContent: 'Country',
});
export const addressListCountry = createElement({
  tag: 'div',
  classNames: ['address__countries-list'],
  textContent: 'Choose your country',
});
const addressCountryWrapper = createElement({
  tag: 'div',
  classNames: ['address__country-wrapper'],
});
export const adressInputCountry = createElement({
  tag: 'input',
  classNames: ['address__countries-input', 'reg-input'],
  textContent: 'Chose your country',
  attributes: { type: 'text' },
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
  authSideForm.append(regFormLabelBirth);
  regFormLabelBirth.append(errors.errorBirthReg);
  regFormLabelBirth.append(containerForBirth);
  containerForBirth.append(birthDay);
  containerForBirth.append(birthMonth);
  containerForBirth.append(birthYear);
  birthDay.addEventListener('input', validateInput);
  birthMonth.addEventListener('input', validateInput);
  birthYear.addEventListener('input', validateInput);
  birthYear.addEventListener('input', validationFunc.checkNumber);

  addressCountryWrapper.append(adressInputCountry);
  addressLabelCountry.append(addressCountryWrapper);
  addressCountryWrapper.append(addressListCountry);
  address.append(addressLabelCountry);
  addressListCountry.addEventListener('click', addCountries);

  address.append(addressLabelPost);
  addressLabelPost.append(addressInputPost);
  addressLabelPost.append(errors.errorPostReg);
  addressInputPost.addEventListener('input', validateInput);
  address.append(addressLabelCity);
  addressLabelCity.append(addressInputCity);
  addressLabelCity.append(errors.errorCityReg);
  addressInputCity.addEventListener('input', validateInput);
  address.append(addressLabelStreet);
  addressLabelStreet.append(addressInputStreet);
  addressLabelStreet.append(errors.errorStreetReg);
  addressInputStreet.addEventListener('input', validateInput);

  authSideForm.append(address);
  authSideForm.append(authFormButton);
  authFormButton.addEventListener('click', submitRegData);
  console.log(authFormButton);
}
