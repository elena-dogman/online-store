import { calculateAge, checkUpperCaseLowerCase } from '../ageAndTextChecks';
import country from 'country-list-js';
import {
  postcodeValidator,
  postcodeValidatorExistsForCountry,
} from 'postcode-validator';
import * as regFormComponents from '../../components/registrationForm/registrationForm';
import * as errors from './validationsErrors';
const countriesList = regFormComponents.addressListCountry;
const city = regFormComponents.addressInputCity;
const street = regFormComponents.addressInputStreet;
const birthDay: HTMLInputElement | HTMLElement = regFormComponents.birthDay;
const birthMonth: HTMLInputElement | HTMLElement = regFormComponents.birthMonth;
const birthYear: HTMLInputElement | HTMLElement = regFormComponents.birthYear;

const ERROR_MESSAGES = {
  shortInput: 'Must contain at least 2 letters',
  invalidEmail: "Email must contain an '@' symbol",
  onlyEnglishLetters: 'Must contain only English letters',
  invalidFormat: 'Incorrect format',
  passwordRequirements: 'Password must meet requirements',
  mustBeNumber: 'Must be a number',
  dateOfBirth: 'Please enter your date of birth',
  atLeast8Characters: 'Password must contain at least 8 characters',
  passwordCapitalLetter: 'Password must contain a capital letter',
  ageRequirement: 'Registration open to those 13 and older',
  incorrectData: 'Please enter correct data',
};

const REGEX = {
  email: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}/,
  lettersOnly: /^[a-zA-Z]+$/,
  lettersAndNumbers: /^[A-Za-z0-9._%+-]+$/,
  birthDate: /^(0[1-9]|1[0-2]).(0[1-9]|[12][0-9]|3[01]).\d{4}$/,
  number: /^\d+$/,
};

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
  const err = errors.errorEmailReg;
  if (mail.length === 0) {
    incorectValidation(parent, err, '');
  }
  if (!REGEX.email.test(String(mail).toLowerCase())) {
    incorectValidation(parent, err, ERROR_MESSAGES.invalidEmail);
    return false;
  }
  incorectValidation(parent, err, '');
  return true;
}
export function validationBirth(value: string, parent: HTMLLabelElement): void {
  const regex = REGEX.birthDate;
  const err = errors.errorBirthReg;
  if (!regex.test(value)) {
    incorectValidation(parent, err, ERROR_MESSAGES.invalidFormat);
  }
}
export function nameValidation(
  value: string,
  parent: HTMLLabelElement,
): boolean {
  const err = errors.errorNameReg;
  if (value.length === 0) {
    incorectValidation(parent, err, '');
    return false;
  }
  if (value.length <= 1) {
    incorectValidation(parent, err, ERROR_MESSAGES.shortInput);
    return false;
  }
  if (!REGEX.lettersOnly.test(value)) {
    incorectValidation(parent, err, ERROR_MESSAGES.onlyEnglishLetters);
    return false;
  }
  incorectValidation(parent, err, '');
  return true;
}
export function lastNameValidation(
  value: string,
  parent: HTMLLabelElement,
): boolean {
  const err = errors.errorLastNameReg;
  if (value.length === 0) {
    incorectValidation(parent, err, '');
    return false;
  }
  if (value.length <= 1) {
    incorectValidation(parent, err, ERROR_MESSAGES.shortInput);
    return false;
  }
  if (!REGEX.lettersOnly.test(value)) {
    incorectValidation(parent, err, ERROR_MESSAGES.onlyEnglishLetters);
    return false;
  }
  incorectValidation(parent, err, '');
  return true;
}

export function cityValidation(
  value: string,
  parent: HTMLLabelElement,
): boolean {
  const err = errors.errorCityReg;
  if (value.length === 0) {
    incorectValidation(parent, err, '');
    return false;
  }
  if (value.length <= 1) {
    street.setAttribute('disabled', '');
    incorectValidation(parent, err, ERROR_MESSAGES.shortInput);
    return false;
  }
  if (!REGEX.lettersOnly.test(value)) {
    street.setAttribute('disabled', '');
    incorectValidation(parent, err, ERROR_MESSAGES.onlyEnglishLetters);
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
  if (value.length === 0) {
    incorectValidation(parent, err, '');
    return false;
  }
  if (value.length <= 1) {
    incorectValidation(parent, err, ERROR_MESSAGES.shortInput);
    return false;
  }
  if (!REGEX.lettersAndNumbers.test(value)) {
    incorectValidation(parent, err, ERROR_MESSAGES.onlyEnglishLetters);
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

  if (!REGEX.lettersOnly.test(value)) {
    incorectValidation(parent, err, ERROR_MESSAGES.onlyEnglishLetters);
    return false;
  }
  if (value.length <= 8) {
    incorectValidation(parent, err, ERROR_MESSAGES.atLeast8Characters);
    return false;
  }
  if (!checkUpperCaseLowerCase(value)) {
    incorectValidation(parent, err, ERROR_MESSAGES.passwordCapitalLetter);
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
  if (value.length === 0) {
    incorectValidation(parent, err, '');
    return;
  }
  if (!parseInt(value)) {
    incorectValidation(parent, err, ERROR_MESSAGES.mustBeNumber);
    if (parseInt(value) > 31) {
      incorectValidation(parent, err, ERROR_MESSAGES.dateOfBirth);
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
  if (value.length === 0) {
    incorectValidation(parent, err, '');
    return;
  }
  if (!parseInt(value)) {
    incorectValidation(parent, err, ERROR_MESSAGES.mustBeNumber);
    if (parseInt(value) > 12) {
      incorectValidation(parent, err, ERROR_MESSAGES.dateOfBirth);
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
  if (value.length === 0) {
    incorectValidation(parent, err, '');
    return;
  }
  if (!parseInt(value)) {
    incorectValidation(parent, err, ERROR_MESSAGES.mustBeNumber);
  }
  return parseInt(value);
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
          +birthMonth.value - 1,
          +birthDay.value,
        );
        if (calculateAge(age) < 13) {
          incorectValidation(parent, err, ERROR_MESSAGES.ageRequirement);
        } else {
          incorectValidation(parent, err, '');
        }
      } else {
        incorectValidation(parent, err, ERROR_MESSAGES.incorrectData);
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
  const postCode = Object.keys(country.all)[countryIndex];
  const err = errors.errorPostReg;
  if (value.length === 0) {
    incorectValidation(parent, err, '');
  }
  if (postcodeValidatorExistsForCountry(postCode)) {
    if (postcodeValidator(value, postCode)) {
      city.removeAttribute('disabled');
      city.removeAttribute('disabled');
      incorectValidation(parent, err, '');
    } else {
      city.setAttribute('disabled', 'disabled');
      incorectValidation(parent, err, ERROR_MESSAGES.incorrectData);
    }
  } else {
    city.removeAttribute('disabled');
    incorectValidation(parent, err, '');
  }
}
