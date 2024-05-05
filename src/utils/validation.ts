import * as regFormComponents from '../components/registrationForm/registrationForm';
import { calculateAge, checkUpperCaseLowerCase } from './others';
const birtdayCheckBtn = regFormComponents.birthDayCheckButton;
const name = regFormComponents.regFormInputName;
const lastName = regFormComponents.regFormInputLastName;
const email = regFormComponents.regFormInputMail;
const password = regFormComponents.regFormInputPassword;
const birthDay: HTMLInputElement | HTMLElement = regFormComponents.birthDay;
const birthMonth: HTMLInputElement | HTMLElement = regFormComponents.birthMonth;
const birthYear: HTMLInputElement | HTMLElement = regFormComponents.birthYear;
const regEx = /^[a-zA-Z]+$/;
const mailRe = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}/;
function mailValidation(mail: string): boolean {
  if (mail.length <= 8) {
    console.log('is too short');
    return false;
  }
  if (!mailRe.test(String(mail).toLowerCase())) {
    console.log('must contain @mail');
    return false;
  }
  return true;
}
function validationBirth(value: string): void {
  const regex = /^(0[1-9]|1[0-2]).(0[1-9]|[12][0-9]|3[01]).\d{4}$/;

  if (!regex.test(value)) {
    console.log('Ввод должен быть формата "01.02.1997"');
  } else {
    console.log(3);
  }
}
function validateInput(this: HTMLInputElement): boolean {
  const value = this.value.trim();
  const attribute = this.getAttribute('data-validation-type');

  if (attribute === 'name') {
    if (value.length <= 1) {
      console.log('Name is too short');
      return false;
    }
    if (!/^[a-zA-Z]+$/.test(value)) {
      console.log('Name must contain only English letters');
      return false;
    }
    console.log('Name is valid');
    return true;
  }
  if (attribute === 'password') {
    if (value.length <= 8) {
      console.log('Password is too short');
      return false;
    }
    if (!/^[a-zA-Z]+$/.test(value)) {
      console.log('Password must contain only English letters');
      return false;
    }
    if (!checkUpperCaseLowerCase(value)) {
      console.log('Password must contain both uppercase and lowercase letters');
      return false;
    }
    console.log('Password is valid');
    return true;
  }
  if (attribute === 'email') {
    mailValidation(value);
  }
  if (attribute === 'birthday') {
    validationBirth(value);
  }
  return true;
}

export function nameValidation(this: HTMLInputElement): boolean {
  if (this.value.length <= 1) {
    console.log(this);
    console.log('is too short');
    return false;
  }
  if (!regEx.test(this.value)) {
    console.log('must contain english letters');
    return false;
  }
  console.log('fine');
  return true;
}
export function passwrodValidation(this: HTMLInputElement): boolean {
  if (this.value.length <= 8) {
    console.log('is too short');
    return false;
  }
  if (!regEx.test(this.value)) {
    console.log('must contain only english letters');
    return false;
  }
  if (!checkUpperCaseLowerCase(this.value)) {
    console.log('must contain ');
    return false;
  }
  return true;
}
function dayValidation(this: HTMLInputElement): number {
  const value = this.value.trim();
  if (!parseInt(value)) {
    console.log('input must be number');
  }
  if (parseInt(value) > 31) {
    console.log('you must chose day');
  }
  return parseInt(value);
}
function monthValidation(this: HTMLInputElement): number {
  const value = this.value.trim();
  if (!parseInt(value)) {
    console.log('input must be number');
  }
  if (parseInt(value) > 12) {
    console.log('you must chose month');
  }
  return parseInt(value);
}
function yearValidation(this: HTMLInputElement): number {
  const value = this.value.trim();
  if (!parseInt(value)) {
    console.log('input must be number');
  }
  if (value.length >= 5) {
    console.log('input must be shorter then 5');
  }
  return parseInt(value);
}
export function checkNumber(): void {
  if (
    birthYear instanceof HTMLInputElement &&
    birthMonth instanceof HTMLInputElement &&
    birthDay instanceof HTMLInputElement
  ) {
    if (+birthYear.value && +birthMonth.value && +birthDay.value) {
      if (
        +birthMonth.value <= 12 &&
        +birthDay.value <= 31 &&
        +birthYear.value <= 2024 &&
        +birthYear.value >= 1970
      ) {
        const age = new Date(
          +birthYear.value,
          +birthMonth.value,
          +birthDay.value,
        );
        calculateAge(age);
      }
    }
  }
}
birthDay.addEventListener('input', dayValidation);
birthMonth.addEventListener('input', monthValidation);
birthYear.addEventListener('input', yearValidation);
name.addEventListener('input', validateInput);
lastName.addEventListener('input', validateInput);
password.addEventListener('input', validateInput);
email.addEventListener('input', validateInput);
birtdayCheckBtn.addEventListener('click', checkNumber);
console.log(new Date(1990));
