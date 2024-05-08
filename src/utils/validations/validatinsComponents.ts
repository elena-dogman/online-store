import {
  calculateAge,
  checkUpperCaseLowerCase,
} from '../../utils/ageAndTextChecks';
import country from 'country-list-js';
import {
  postcodeValidator,
  postcodeValidatorExistsForCountry,
} from 'postcode-validator';
import * as regFormComponents from '..//../components/registrationForm/registrationForm';
const countriesList = regFormComponents.addressListCountry;
const city = regFormComponents.addressInputCity;
const street = regFormComponents.addressInputStreet;
const birthDay: HTMLInputElement | HTMLElement = regFormComponents.birthDay;
const birthMonth: HTMLInputElement | HTMLElement = regFormComponents.birthMonth;
const birthYear: HTMLInputElement | HTMLElement = regFormComponents.birthYear;
const regEx = /^[a-zA-Z]+$/;
const mailRe = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}/;
function incorectValidation(parent: HTMLLabelElement): void {
  console.log(parent);
}
export function mailValidation(mail: string): boolean {
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
export function validationBirth(value: string): void {
  const regex = /^(0[1-9]|1[0-2]).(0[1-9]|[12][0-9]|3[01]).\d{4}$/;

  if (!regex.test(value)) {
    console.log('Ввод должен быть формата "01.02.1997"');
  } else {
    console.log(3);
  }
}
export function nameValidation(
  value: string,
  parent: HTMLLabelElement,
): boolean {
  incorectValidation(parent);
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

export function cityValidation(value: string): boolean {
  if (value.length <= 1) {
    street.setAttribute('disabled', '');
    console.log('Name is too short');
    return false;
  }
  if (!/^[a-zA-Z]+$/.test(value)) {
    street.setAttribute('disabled', '');
    console.log('Name must contain only English letters');
    return false;
  }
  street.removeAttribute('disabled');
  console.log('Name is valid');
  return true;
}
export function streetValidation(value: string): boolean {
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
export function passwordValidation(value: string): boolean {
  if (value.length <= 8) {
    console.log('is too short');
    return false;
  }
  if (!regEx.test(value)) {
    console.log('must contain only english letters');
    return false;
  }
  if (!checkUpperCaseLowerCase(value)) {
    console.log('must contain ');
    return false;
  }
  return true;
}
export function dayValidation(this: HTMLInputElement): number {
  const value = this.value.trim();
  if (!parseInt(value)) {
    console.log('input must be number');
  }
  if (parseInt(value) > 31) {
    console.log('you must chose day');
  }
  return parseInt(value);
}
export function monthValidation(this: HTMLInputElement): number {
  const value = this.value.trim();
  if (!parseInt(value)) {
    console.log('input must be number');
  }
  if (parseInt(value) > 12) {
    console.log('you must chose month');
  }
  return parseInt(value);
}
export function yearValidation(this: HTMLInputElement): number {
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
    } else {
      console.log('Please input correct data');
    }
  }
}
export function postCodeValidation(this: HTMLInputElement): void {
  const indextPostsArr = Object.keys(country.all);
  const countryNames = country.names();
  const countryIndex = countryNames.indexOf(countriesList.textContent);
  const postCode = indextPostsArr[countryIndex];
  if (postcodeValidatorExistsForCountry(this.value)) {
    if (postcodeValidator(this.value, postCode)) {
      city.removeAttribute('disabled');
      console.log('true');
    } else {
      city.setAttribute('disabled', '');
      console.log('false');
    }
  } else {
    city.removeAttribute('disabled');
    console.log('true');
  }
}
