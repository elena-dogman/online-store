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
import * as errors from './validationsErrors';
const countriesList = regFormComponents.addressListCountry;
const city = regFormComponents.addressInputCity;
const street = regFormComponents.addressInputStreet;
const birthDay: HTMLInputElement | HTMLElement = regFormComponents.birthDay;
const birthMonth: HTMLInputElement | HTMLElement = regFormComponents.birthMonth;
const birthYear: HTMLInputElement | HTMLElement = regFormComponents.birthYear;
const regEx = /^[a-zA-Z]+$/;
const mailRe = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}/;

function incorectValidation(
  parent: HTMLLabelElement,
  errorSpan: HTMLSpanElement,
  errorMessage: string,
): void {
  errorSpan.textContent = errorMessage;
  parent.append(errorSpan);
}
export function mailValidation(
  mail: string,
  parent: HTMLLabelElement,
): boolean {
  const err = errors.errorNameReg;
  if (mail.length <= 8) {
    incorectValidation(parent, err, 'is too short');
    return false;
  }
  if (!mailRe.test(String(mail).toLowerCase())) {
    incorectValidation(parent, err, 'must contain @mail');
    return false;
  }
  incorectValidation(parent, err, '');
  return true;
}
export function validationBirth(value: string, parent: HTMLLabelElement): void {
  const regex = /^(0[1-9]|1[0-2]).(0[1-9]|[12][0-9]|3[01]).\d{4}$/;
  const err = errors.errorBirthReg;
  if (!regex.test(value)) {
    incorectValidation(parent, err, 'Ввод должен быть формата "01.02.1997"');
  } else {
    console.log(3);
  }
}
export function nameValidation(
  value: string,
  parent: HTMLLabelElement,
): boolean {
  const err = errors.errorNameReg;
  if (value.length <= 1) {
    incorectValidation(parent, err, 'Name is too short');
    return false;
  }
  if (!/^[a-zA-Z]+$/.test(value)) {
    incorectValidation(parent, err, 'Name must contain only English letters');
    return false;
  }
  incorectValidation(parent, err, '');
  return true;
}
export function lastNameValidation(
  value: string,
  parent: HTMLLabelElement,
): boolean {
  const err = errors.errorNameReg;
  if (value.length <= 1) {
    incorectValidation(parent, err, 'Name is too short');
    return false;
  }
  if (!/^[a-zA-Z]+$/.test(value)) {
    incorectValidation(parent, err, 'Name must contain only English letters');
    return false;
  }
  incorectValidation(parent, err, '');
  return true;
}

export function cityValidation(
  value: string,
  parent: HTMLLabelElement,
): boolean {
  const err = errors.errorNameReg;
  if (value.length <= 1) {
    street.setAttribute('disabled', '');
    incorectValidation(parent, err, 'Name is too short');
    return false;
  }
  if (!/^[a-zA-Z]+$/.test(value)) {
    street.setAttribute('disabled', '');
    incorectValidation(parent, err, 'Name must contain only English letters');
    return false;
  }
  incorectValidation(parent, err, '');
  street.removeAttribute('disabled');
  return true;
}
export function streetValidation(
  value: string,
  parent: HTMLLabelElement,
): boolean {
  const err = errors.errorStreetReg;
  if (value.length <= 1) {
    incorectValidation(parent, err, 'The name is too short');
    return false;
  }
  if (!/^[a-zA-Z]+$/.test(value)) {
    incorectValidation(
      parent,
      err,
      'The  name must contain only English letters',
    );
    return false;
  }
  incorectValidation(parent, err, '');
  return true;
}
export function passwordValidation(
  value: string,
  parent: HTMLLabelElement,
): boolean {
  const err = errors.errorPasswordReg;

  if (!regEx.test(value)) {
    incorectValidation(
      parent,
      err,
      'The Password must contain only english letters',
    );
    return false;
  }
  if (value.length <= 8) {
    incorectValidation(parent, err, 'The Password is too short');
    return false;
  }
  if (!checkUpperCaseLowerCase(value)) {
    incorectValidation(
      parent,
      err,
      'The Password must contain a capital letter',
    );
    return false;
  }
  incorectValidation(parent, err, '');
  return true;
}
export function dayValidation(
  value: string,
  parent: HTMLLabelElement,
): number | undefined {
  const err = errors.errorBirthReg;
  if (!parseInt(value)) {
    incorectValidation(parent, err, 'The Day must be a number');
    if (parseInt(value) > 31) {
      incorectValidation(parent, err, 'You must chose day');
    }
  } else {
    incorectValidation(parent, err, '');
    return parseInt(value);
  }
}
export function monthValidation(
  value: string,
  parent: HTMLLabelElement,
): number | undefined {
  const err = errors.errorBirthReg;
  if (!parseInt(value)) {
    incorectValidation(parent, err, 'The Month must be a number');
    if (parseInt(value) > 12) {
      incorectValidation(parent, err, 'You must chose month');
    }
  } else {
    incorectValidation(parent, err, '');
    return parseInt(value);
  }
}
export function yearValidation(
  value: string,
  parent: HTMLLabelElement,
): number | undefined {
  const err = errors.errorBirthReg;
  if (!parseInt(value)) {
    incorectValidation(parent, err, 'The input must be a number');
  } else {
    incorectValidation(parent, err, '');
    return parseInt(value);
  }
}
export function checkNumber(this: HTMLButtonElement): void {
  const err = errors.errorBirthReg;
  const parent = this.parentNode as HTMLLabelElement | null;
  if (!parent) {
    return;
  }
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
        if (calculateAge(age) < 13) {
          console.log(1);
        } else {
          incorectValidation(parent, err, 'you co young');
        }
      } else {
        incorectValidation(parent, err, 'Please input correct data');
      }
    }
  }
}
export function postCodeValidation(
  value: string,
  parent: HTMLLabelElement,
): void {
  const indextPostsArr = Object.keys(country.all);
  const countryNames = country.names();
  const countryIndex = countryNames.indexOf(countriesList.textContent);
  const postCode = indextPostsArr[countryIndex];
  const err = errors.errorPostReg;
  if (postcodeValidatorExistsForCountry(postCode)) {
    if (postcodeValidator(value, postCode)) {
      city.setAttribute('disabled', 'disabled');
      incorectValidation(parent, err, '');
    } else {
      city.setAttribute('disabled', '');
      incorectValidation(parent, err, 'Incorect post code');
    }
  } else if (!postcodeValidatorExistsForCountry(postCode)) {
    city.removeAttribute('disabled');
    incorectValidation(parent, err, '');
  }
}
