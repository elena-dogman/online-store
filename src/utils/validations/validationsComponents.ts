import { calculateAge, checkUpperCaseLowerCase } from '../ageAndTextChecks';
import country from 'country-list-js';
import {
  postcodeValidator,
  postcodeValidatorExistsForCountry,
} from 'postcode-validator';
import * as regFormComponents from '../../components/registrationForm/registrationForm';
import * as errors from './validationsErrors';
type Input = HTMLInputElement | HTMLElement;
const countriesList = regFormComponents.addressListCountry;
const city: Input = regFormComponents.addressInputCity;
const street: Input = regFormComponents.addressInputStreet;
const birthDay: Input = regFormComponents.birthDay;
const birthMonth: Input = regFormComponents.birthMonth;
const birthYear: Input = regFormComponents.birthYear;

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
  errorSpan: HTMLSpanElement,
  errorMessage: string,
): void {
  errorSpan.textContent = errorMessage;
}
export function mailValidation(value: string): boolean {
  const err = errors.errorEmailReg;
  if (value.length === 0) {
    incorectValidation(err, '');
  }
  if (!REGEX.email.test(String(value).toLowerCase())) {
    incorectValidation(err, ERROR_MESSAGES.invalidEmail);
    return false;
  }
  incorectValidation(err, '');
  return true;
}
export function validationBirth(value: string): void {
  const regex = REGEX.birthDate;
  const err = errors.errorBirthReg;
  if (!regex.test(value)) {
    incorectValidation(err, ERROR_MESSAGES.invalidFormat);
  }
}
export function nameValidation(value: string): boolean {
  const err = errors.errorNameReg;
  if (value.length === 0) {
    incorectValidation(err, '');
    return false;
  }
  if (value.length <= 1) {
    incorectValidation(err, ERROR_MESSAGES.shortInput);
    return false;
  }
  if (!REGEX.lettersOnly.test(value)) {
    incorectValidation(err, ERROR_MESSAGES.onlyEnglishLetters);
    return false;
  }
  incorectValidation(err, '');
  return true;
}
export function lastNameValidation(value: string): boolean {
  const err = errors.errorLastNameReg;
  if (value.length === 0) {
    incorectValidation(err, '');
    return false;
  }
  if (value.length <= 1) {
    incorectValidation(err, ERROR_MESSAGES.shortInput);
    return false;
  }
  if (!REGEX.lettersOnly.test(value)) {
    incorectValidation(err, ERROR_MESSAGES.onlyEnglishLetters);
    return false;
  }
  incorectValidation(err, '');
  return true;
}

export function cityValidation(value: string): boolean {
  const err = errors.errorCityReg;
  const streetErr = errors.errorStreetReg;
  if (value.length === 0) {
    incorectValidation(err, '');
    return false;
  }
  if (value.length <= 1) {
    street.setAttribute('disabled', '');
    if (street instanceof HTMLInputElement) {
      incorectValidation(err, ERROR_MESSAGES.shortInput);
      streetErr.textContent = '';
      street.value = '';
      return false;
    }
  }
  if (!REGEX.lettersOnly.test(value)) {
    if (street instanceof HTMLInputElement) {
      street.setAttribute('disabled', '');
      streetErr.textContent = '';
      street.value = '';
      incorectValidation(err, ERROR_MESSAGES.onlyEnglishLetters);
      return false;
    }
  }
  incorectValidation(err, '');
  street.removeAttribute('disabled');
  return true;
}
export function streetValidation(value: string): boolean {
  const err = errors.errorStreetReg;
  if (value.length === 0) {
    incorectValidation(err, '');
    return false;
  }
  if (value.length <= 1) {
    incorectValidation(err, ERROR_MESSAGES.shortInput);
    return false;
  }
  if (!REGEX.lettersAndNumbers.test(value)) {
    incorectValidation(err, ERROR_MESSAGES.onlyEnglishLetters);
    return false;
  }
  incorectValidation(err, '');
  return true;
}
export function passwordValidation(value: string): boolean {
  const err = errors.errorPasswordReg;

  if (!REGEX.lettersOnly.test(value)) {
    incorectValidation(err, ERROR_MESSAGES.onlyEnglishLetters);
    return false;
  }
  if (value.length <= 8) {
    incorectValidation(err, ERROR_MESSAGES.atLeast8Characters);
    return false;
  }
  if (!checkUpperCaseLowerCase(value)) {
    incorectValidation(err, ERROR_MESSAGES.passwordCapitalLetter);
    return false;
  }
  incorectValidation(err, '');
  return true;
}
export function dayValidation(value: string): number | undefined {
  const err = errors.errorBirthReg;
  if (value.length === 0) {
    incorectValidation(err, '');
    return;
  }
  if (!parseInt(value)) {
    incorectValidation(err, ERROR_MESSAGES.mustBeNumber);
    if (parseInt(value) > 31) {
      incorectValidation(err, ERROR_MESSAGES.dateOfBirth);
    }
  } else {
    incorectValidation(err, '');
    return parseInt(value);
  }
}
export function monthValidation(value: string): number | undefined {
  const err = errors.errorBirthReg;
  if (value.length === 0) {
    incorectValidation(err, '');
    return;
  }
  if (!parseInt(value)) {
    incorectValidation(err, ERROR_MESSAGES.mustBeNumber);
    if (parseInt(value) > 12) {
      incorectValidation(err, ERROR_MESSAGES.dateOfBirth);
    }
  } else {
    incorectValidation(err, '');
    return parseInt(value);
  }
}
export function yearValidation(value: string): number | undefined {
  const err = errors.errorBirthReg;
  if (value.length === 0) {
    incorectValidation(err, '');
    return;
  }
  if (!parseInt(value)) {
    incorectValidation(err, ERROR_MESSAGES.mustBeNumber);
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
          incorectValidation(err, ERROR_MESSAGES.ageRequirement);
        } else {
          incorectValidation(err, '');
        }
      } else {
        incorectValidation(err, ERROR_MESSAGES.incorrectData);
      }
    }
  }
}

export function postCodeValidation(value: string): void {
  const countryNames = country.names();
  const countryIndex = countryNames.indexOf(countriesList.textContent);
  const postCode = Object.keys(country.all)[countryIndex];
  const err = errors.errorPostReg;
  const cityErr = errors.errorCityReg;
  const streetErr = errors.errorStreetReg;
  if (value.length === 0) {
    if (
      street instanceof HTMLInputElement &&
      city instanceof HTMLInputElement
    ) {
      incorectValidation(err, '');
      city.setAttribute('disabled', '');
      street.setAttribute('disabled', '');
      cityErr.textContent = '';
      streetErr.textContent = '';
      street.value = '';
      city.value = '';
      return;
    }
  }
  if (postcodeValidatorExistsForCountry(postCode)) {
    if (postcodeValidator(value, postCode)) {
      city.removeAttribute('disabled');
      incorectValidation(err, '');
    } else {
      if (
        street instanceof HTMLInputElement &&
        city instanceof HTMLInputElement
      ) {
        city.setAttribute('disabled', '');
        street.setAttribute('disabled', '');
        cityErr.textContent = '';
        streetErr.textContent = '';
        street.value = '';
        city.value = '';
        incorectValidation(err, ERROR_MESSAGES.incorrectData);
        return;
      }
    }
  } else {
    city.removeAttribute('disabled');
    incorectValidation(err, '');
    return;
  }
}
