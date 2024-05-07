import { validateInput } from '../../utils/validations/validation';
import * as validationFunc from '../../utils/validations/validatinsComponents';
import { addCountries } from './countryList';
import { createElement } from '../../utils/baseComponent';

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

    'data-validation-type': 'name',
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
  classNames: ['reg-form__birhday-label', 'reg__label'],
  textContent: 'Date Of Birth',
});
const containerForBirth = createElement({
  tag: 'div',
  classNames: ['reg-form__birthday-container'],
});

export const birthDay = createElement({
  tag: 'input',
  classNames: ['birthday__day', 'reg-input', 'birthday-input'],
  attributes: {
    type: 'text',
    maxLength: '2',
  },
});
export const birthMonth = createElement({
  tag: 'input',
  classNames: ['birthday__month', 'reg-input', 'birthday-input'],
  attributes: {
    type: 'text',

    maxLength: '2',
  },
});
export const birthYear = createElement({
  tag: 'input',
  classNames: ['birthday__year', 'reg-input', 'birthday-input'],
  attributes: {
    type: 'text',
    maxLength: '4',
  },
});

export const birthDayCheckButton = createElement({
  tag: 'button',
  classNames: ['bithday__check-btn', 'reg-button'],
  textContent: 'Check',
  attributes: { type: 'button' },
});

const adress = createElement({
  tag: 'div',
  classNames: ['reg-form__address'],
});
export const adressLabelStreet = createElement({
  tag: 'label',
  classNames: ['adress__street-label', 'reg__label'],
  textContent: 'Street',
});
export const adressInputStreet = createElement({
  tag: 'input',
  classNames: ['adress__street-input', 'reg-input'],
  attributes: {
    type: 'text',
    disabled: '',
    'data-validation-type': 'street',
  },
});
export const adressLabelCity = createElement({
  tag: 'label',
  classNames: ['adress__city-label', 'reg__label'],
  textContent: 'City',
});
export const adressInputCity = createElement({
  tag: 'input',
  classNames: ['adress__city-input', 'reg-input'],
  attributes: {
    type: 'text',
    disabled: '',
    'data-validation-type': 'city',
  },
});

export const adressLabelPost = createElement({
  tag: 'label',
  classNames: ['adress__post-label', 'reg__label'],
  textContent: 'Post',
});
export const addressInputPost = createElement({
  tag: 'input',
  classNames: ['adress__post-input', 'reg-input'],
  attributes: {
    type: 'text',
    disabled: '',
  },
});

export const addressLabelCountry = createElement({
  tag: 'label',
  classNames: ['address__country-label', 'reg__label'],
  textContent: 'Country',
});
export const adressListCountry = createElement({
  tag: 'div',
  classNames: ['adress__countrys-list'],
  textContent: 'Chose your country',
});
export const authFormButton = createElement({
  tag: 'button',
  classNames: ['reg-form__button', 'reg-button'],
  attributes: { disabled: '', type: 'button' },
  textContent: 'Create Account',
});

export function createForm(): void {
  authSideForm.append(regFormLabelName);
  regFormLabelName.append(regFormInputName);
  regFormInputName.addEventListener('input', validateInput);
  authSideForm.append(regFormLabelLastName);
  regFormLabelLastName.append(regFormInputLastName);
  regFormInputLastName.addEventListener('input', validateInput);
  authSideForm.append(regFormLabelMail);
  regFormLabelMail.append(regFormInputMail);
  regFormInputMail.addEventListener('input', validateInput);
  authSideForm.append(regFormLabelPassword);
  regFormLabelPassword.append(regFormInputPassword);
  authSideForm.append(regFormLabelBirth);
  regFormLabelBirth.append(containerForBirth);
  containerForBirth.append(birthDay);
  containerForBirth.append(birthMonth);
  containerForBirth.append(birthYear);
  birthDay.addEventListener('input', validationFunc.dayValidation);
  birthMonth.addEventListener('input', validationFunc.monthValidation);
  birthYear.addEventListener('input', validationFunc.yearValidation);
  containerForBirth.append(birthDayCheckButton);
  birthDayCheckButton.addEventListener('click', validationFunc.checkNumber);
  authSideForm.append(adress);
  authSideForm.append(authFormButton);
  adress.append(addressLabelCountry);
  addressLabelCountry.append(adressListCountry);
  adressListCountry.addEventListener('click', addCountries);
  adress.append(adressLabelPost);
  adressLabelPost.append(addressInputPost);
  adress.append(adressLabelCity);
  adressLabelCity.append(adressInputCity);
  adress.append(adressLabelStreet);
  adressLabelStreet.append(adressInputStreet);
  addressInputPost.addEventListener('input', validationFunc.postCodeValidation);
  adressInputCity.addEventListener('input', validateInput);
  adressInputStreet.addEventListener('input', validateInput);
}