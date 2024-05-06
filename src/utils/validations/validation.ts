import * as regFormComponents from '..//../components/registrationForm/registrationForm';
import * as validationFunc from './validatinsComponents';
const birtdayCheckBtn = regFormComponents.birthDayCheckButton;
const name = regFormComponents.regFormInputName;
const lastName = regFormComponents.regFormInputLastName;
const email = regFormComponents.regFormInputMail;
const password = regFormComponents.regFormInputPassword;
const post = regFormComponents.adressInputPost;
const city = regFormComponents.adressInputCity;
const street = regFormComponents.adressInputStreet;
const birthDay: HTMLInputElement | HTMLElement = regFormComponents.birthDay;
const birthMonth: HTMLInputElement | HTMLElement = regFormComponents.birthMonth;
const birthYear: HTMLInputElement | HTMLElement = regFormComponents.birthYear;
function validateInput(this: HTMLInputElement): boolean {
  const value = this.value.trim();
  const attribute = this.getAttribute('data-validation-type');
  if (attribute === 'name') {
    validationFunc.nameValidation(value);
  }
  if (attribute === 'city') {
    validationFunc.cityValidation(value);
  }
  if (attribute === 'street') {
    validationFunc.streetValidation(value);
  }
  if (attribute === 'password') {
    validationFunc.passwrodValidation(value);
  }
  if (attribute === 'email') {
    validationFunc.mailValidation(value);
  }
  if (attribute === 'birthday') {
    validationFunc.validationBirth(value);
  }
  return true;
}

name.addEventListener('input', validateInput);
lastName.addEventListener('input', validateInput);
password.addEventListener('input', validateInput);
email.addEventListener('input', validateInput);
birthDay.addEventListener('input', validationFunc.dayValidation);
birthMonth.addEventListener('input', validationFunc.monthValidation);
birthYear.addEventListener('input', validationFunc.yearValidation);
birtdayCheckBtn.addEventListener('click', validationFunc.checkNumber);
post.addEventListener('input', validationFunc.postCodeValidation);
city.addEventListener('input', validateInput);
street.addEventListener('input', validateInput);
