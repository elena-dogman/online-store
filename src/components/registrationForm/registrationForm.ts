import * as baseComponent from '../../utils/baseComponent';
export const authSideForm = baseComponent.createElement({
  tag: 'form',
  classNames: ['auth-side__reg-form'],
});
export const regFormLabelName = baseComponent.createElement({
  tag: 'label',
  classNames: ['reg-form__name-label', 'reg__label'],
  textContent: 'Name',
});
export const regFormInputName = baseComponent.createElement({
  tag: 'input',
  classNames: ['reg-form__name-input', 'reg-input'],
  attributes: { type: 'text', required: '', 'data-validation-type': 'name' },
});
export const regFormLabelLastName = baseComponent.createElement({
  tag: 'label',
  classNames: ['reg-form__last-name-label', 'reg__label'],
  textContent: 'Last Name',
});
export const regFormInputLastName = baseComponent.createElement({
  tag: 'input',
  classNames: ['reg-form__last-name-input', 'reg-input'],
  attributes: {
    type: 'text',
    required: '',
    'data-validation-type': 'name',
  },
});
export const regFormLabelMail = baseComponent.createElement({
  tag: 'label',
  classNames: ['reg-form__mail-label', 'reg__label'],
  textContent: 'Email',
});
export const regFormInputMail = baseComponent.createElement({
  tag: 'input',
  classNames: ['reg-form__mail-input', 'reg-input'],
  attributes: {
    type: 'email',
    required: '',
    'data-validation-type': 'email',
  },
});
export const regFormLabelPassword = baseComponent.createElement({
  tag: 'label',
  classNames: ['reg-form__password-label', 'reg__label'],
  textContent: 'Password',
});
export const regFormInputPassword = baseComponent.createElement({
  tag: 'input',
  classNames: ['reg-form__password-input', 'reg-input'],
  attributes: {
    type: 'password',
    required: '',
    'data-validation-type': 'password',
  },
});

export const regFormLabelBirth = baseComponent.createElement({
  tag: 'label',
  classNames: ['reg-form__birhday-label', 'reg__label'],
  textContent: 'Date Of Birth',
});
const containerForBirth = baseComponent.createElement({
  tag: 'div',
  classNames: ['reg-form__birhday-container'],
});

export const birthDay = baseComponent.createElement({
  tag: 'input',
  classNames: ['birthday__day', 'reg-input', 'birthday-input'],
  attributes: {
    type: 'text',
    required: '',
    'data-validation-type': 'birthday',
  },
});
export const birthMonth = baseComponent.createElement({
  tag: 'input',
  classNames: ['birthday__month', 'reg-input', 'birthday-input'],
  attributes: {
    type: 'text',
    required: '',
    'data-validation-type': 'birthday',
  },
});
export const birthYear = baseComponent.createElement({
  tag: 'input',
  classNames: ['birthday__year', 'reg-input', 'birthday-input'],
  attributes: {
    type: 'text',
    required: '',
    'data-validation-type': 'birthday',
  },
});

export const birthDayCheckButton = baseComponent.createElement({
  tag: 'button',
  classNames: ['bithday__check-btn', 'button'],
  textContent: 'Check',
});

const adress = baseComponent.createElement({
  tag: 'div',
  classNames: ['reg-form__adress'],
});
export const adressLabelStreet = baseComponent.createElement({
  tag: 'label',
  classNames: ['adress__street-label', 'reg__label'],
  textContent: 'Street',
});
export const adressInputStreet = baseComponent.createElement({
  tag: 'input',
  classNames: ['adress__street-input', 'reg-input'],
  attributes: {
    type: 'text',
    required: '',
  },
});
export const adressLabelCity = baseComponent.createElement({
  tag: 'label',
  classNames: ['adress__city-label', 'reg__label'],
  textContent: 'City',
});
const adressInputCity = baseComponent.createElement({
  tag: 'input',
  classNames: ['adress__city-input', 'reg-input'],
  attributes: {
    type: 'text',
    required: '',
  },
});

export const adressLabelPost = baseComponent.createElement({
  tag: 'label',
  classNames: ['adress__post-label', 'reg__label'],
  textContent: 'Post',
});
export const adressInputPost = baseComponent.createElement({
  tag: 'input',
  classNames: ['adress__post-input', 'reg-input'],
  attributes: {
    type: 'text',
    required: '',
  },
});

export const adressLabelCountry = baseComponent.createElement({
  tag: 'label',
  classNames: ['adress__country-label', 'reg__label'],
  textContent: 'Country',
});
export const adressInputCountry = baseComponent.createElement({
  tag: 'input',
  classNames: ['adress__country-input', 'reg-input'],
  attributes: {
    type: 'text',
    required: '',
  },
});
export const authFormButton = baseComponent.createElement({
  tag: 'button',
  classNames: ['reg-form__button', 'button'],
  attributes: { disabled: 'true', type: 'submit' },
  textContent: 'Create Account',
});
export function createForm(): void {
  authSideForm.append(regFormLabelName);
  regFormLabelName.append(regFormInputName);
  authSideForm.append(regFormLabelLastName);
  regFormLabelLastName.append(regFormInputLastName);
  authSideForm.append(regFormLabelMail);
  regFormLabelMail.append(regFormInputMail);
  authSideForm.append(regFormLabelPassword);
  regFormLabelPassword.append(regFormInputPassword);
  authSideForm.append(regFormLabelBirth);
  regFormLabelBirth.append(containerForBirth);
  containerForBirth.append(birthDay);
  containerForBirth.append(birthMonth);
  containerForBirth.append(birthYear);
  containerForBirth.append(birthDayCheckButton);
  authSideForm.append(adress);
  authSideForm.append(authFormButton);
  adress.append(adressLabelStreet);
  adressLabelStreet.append(adressInputStreet);
  adress.append(adressLabelCity);
  adressLabelCity.append(adressInputCity);
  adress.append(adressLabelPost);
  adressLabelPost.append(adressInputPost);
  adress.append(adressLabelCountry);
  adressLabelCountry.append(adressInputCountry);
}
