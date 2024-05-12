import { calculateAge, validatePassword } from '../ageAndTextChecks';
import country from 'country-list-js';
import {
  postcodeValidator,
  postcodeValidatorExistsForCountry,
} from 'postcode-validator';
import * as dateComponents from '../../components/registrationForm/dateComponent';
import * as shippingComponents from '../../components/registrationForm/address/shipping';
import * as billingComponents from '../../components/registrationForm/address/billing';
import * as errors from './validationsErrors';
import * as bolleanValid from './booleanValid';
import { Input } from '../baseComponent';

const countriesBillingList = billingComponents.billingListCountry;
const countriesShippingList = shippingComponents.shippingListCountry;
const billingCity = billingComponents.billingInputCity as HTMLInputElement;
const billingPost = billingComponents.billingInputPost as HTMLInputElement;
const billingStreet = billingComponents.billingInputStreet as HTMLInputElement;
const shippingCity = shippingComponents.shippingInputCity as HTMLInputElement;
const shippingPost = shippingComponents.shippingInputPost as HTMLInputElement;
const shippingStreet =
  shippingComponents.shippingInputStreet as HTMLInputElement;

const dateDay: Input = dateComponents.dayDate;
const dateMonth: Input = dateComponents.monthDate;
const dateYear: Input = dateComponents.yearDate;
const ERROR_MESSAGES = {
  shortInput: 'Must contain at least 2 letters',
  invalidEmail: "Email must contain an '@' symbol",
  onlyEnglishLetters: 'Must contain only English letters',
  onlyEnglishLettersAndNumbers: 'Must contain only English letters and numbers',
  invalidFormat: 'Incorrect format',
  passwordRequirements: 'Password must meet requirements',
  mustBeNumber: 'Must be a number',
  dateOfBirth: 'Please enter your date of birth',
  atLeast8Characters: 'Password must contain at least 8 characters',
  passwordCapitalLetter:
    'Password must contain at  at least 1 uppercase letter, 1 lowercase letter and 1 number',
  ageRequirement: 'Registration open to those 13 and older',
  incorrectData: 'Please enter correct data',
};

const REGEX = {
  email: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/,
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
export function mailValidation(
  value: string,
  err?: HTMLSpanElement | null,
): boolean {
  if (err) {
    if (value.length === 0) {
      incorectValidation(err, '');
      bolleanValid.setValidStatus('mail', false);
      return false;
    }
    if (!REGEX.email.test(String(value).toLowerCase())) {
      incorectValidation(err, ERROR_MESSAGES.invalidEmail);
      bolleanValid.setValidStatus('mail', false);
      return false;
    }
    incorectValidation(err, '');
    bolleanValid.setValidStatus('mail', true);
    return true;
  }
  return true;
}
export function validationBirth(
  value: string,
  err?: HTMLSpanElement | null,
): boolean {
  if (err) {
    const regex = REGEX.birthDate;
    if (!regex.test(value)) {
      incorectValidation(err, ERROR_MESSAGES.invalidFormat);
      return false;
    }
    return true;
  }
  return true;
}
export function nameValidation(
  value: string,
  err?: HTMLSpanElement | null,
): boolean {
  if (err) {
    if (value.length === 0) {
      incorectValidation(err, '');
      bolleanValid.setValidStatus('name', false);
      return false;
    }
    if (value.length <= 1) {
      incorectValidation(err, ERROR_MESSAGES.shortInput);
      bolleanValid.setValidStatus('name', false);
      return false;
    }
    if (!REGEX.lettersOnly.test(value)) {
      incorectValidation(err, ERROR_MESSAGES.onlyEnglishLetters);
      bolleanValid.setValidStatus('name', false);
      return false;
    }
    bolleanValid.setValidStatus('name', true);
    incorectValidation(err, '');
    return true;
  }
  return true;
}

export function lastNameValidation(
  value: string,
  err?: HTMLSpanElement | null,
): boolean {
  if (err) {
    if (value.length === 0) {
      incorectValidation(err, '');
      bolleanValid.setValidStatus('lastName', false);
      return false;
    }
    if (value.length <= 1) {
      incorectValidation(err, ERROR_MESSAGES.shortInput);
      bolleanValid.setValidStatus('lastName', false);
      return false;
    }
    if (!REGEX.lettersOnly.test(value)) {
      incorectValidation(err, ERROR_MESSAGES.onlyEnglishLetters);
      bolleanValid.setValidStatus('lastName', false);
      return false;
    }
    bolleanValid.setValidStatus('lastName', true);
    incorectValidation(err, '');
    return true;
  }
  return true;
}

export function cityBillingValidation(
  value: string,
  err?: HTMLSpanElement | null,
): boolean {
  const streetErr = errors.errorBillingStreetReg;
  if (err) {
    if (value.length === 0) {
      if (billingStreet instanceof HTMLInputElement) {
        bolleanValid.setValidStatus('city', false);
        bolleanValid.setValidStatus('street', false);
        billingStreet.value = '';
        incorectValidation(err, '');
        return false;
      }
    }
    if (value.length <= 1) {
      if (billingStreet instanceof HTMLInputElement) {
        billingStreet.setAttribute('disabled', '');
        incorectValidation(err, ERROR_MESSAGES.shortInput);
        bolleanValid.setValidStatus('city', false);
        bolleanValid.setValidStatus('street', false);
        streetErr.textContent = '';
        billingStreet.value = '';
        return false;
      }
    }
    if (!REGEX.lettersOnly.test(value)) {
      if (billingStreet instanceof HTMLInputElement) {
        bolleanValid.setValidStatus('city', false);
        bolleanValid.setValidStatus('street', false);
        billingStreet.setAttribute('disabled', '');
        streetErr.textContent = '';
        billingStreet.value = '';
        incorectValidation(err, ERROR_MESSAGES.onlyEnglishLetters);
        return false;
      }
    }
    incorectValidation(err, '');
    bolleanValid.setValidStatus('city', true);
    billingStreet.removeAttribute('disabled');
    return true;
  }
  return true;
}
export function cityShippingValidation(
  value: string,
  err?: HTMLSpanElement | null,
): boolean {
  const streetErr = errors.errorBillingStreetReg;
  if (err) {
    if (value.length === 0) {
      if (shippingStreet instanceof HTMLInputElement) {
        bolleanValid.setValidStatus('city', false);
        bolleanValid.setValidStatus('street', false);
        shippingStreet.value = '';
        incorectValidation(err, '');
        return false;
      }
    }
    if (value.length <= 1) {
      if (shippingStreet instanceof HTMLInputElement) {
        shippingStreet.setAttribute('disabled', '');
        incorectValidation(err, ERROR_MESSAGES.shortInput);
        bolleanValid.setValidStatus('city', false);
        bolleanValid.setValidStatus('street', false);
        streetErr.textContent = '';
        shippingStreet.value = '';
        return false;
      }
    }
    if (!REGEX.lettersOnly.test(value)) {
      if (shippingStreet instanceof HTMLInputElement) {
        bolleanValid.setValidStatus('city', false);
        bolleanValid.setValidStatus('street', false);
        shippingStreet.setAttribute('disabled', '');
        streetErr.textContent = '';
        shippingStreet.value = '';
        incorectValidation(err, ERROR_MESSAGES.onlyEnglishLetters);
        return false;
      }
    }
    incorectValidation(err, '');
    bolleanValid.setValidStatus('city', true);
    shippingStreet.removeAttribute('disabled');
    return true;
  }
  return true;
}

export function streetValidation(
  value: string,
  err?: HTMLSpanElement | null,
): boolean {
  if (err) {
    if (value.length === 0) {
      bolleanValid.setValidStatus('street', false);
      incorectValidation(err, '');
      return false;
    }
    if (value.length <= 1) {
      bolleanValid.setValidStatus('street', false);
      incorectValidation(err, ERROR_MESSAGES.shortInput);
      return false;
    }
    if (!REGEX.lettersAndNumbers.test(value)) {
      bolleanValid.setValidStatus('street', false);
      incorectValidation(err, ERROR_MESSAGES.onlyEnglishLetters);
      return false;
    }
    bolleanValid.setValidStatus('street', true);
    incorectValidation(err, '');
    return true;
  }
  return true;
}
export function passwordValidation(
  value: string,
  err?: HTMLSpanElement | null,
): boolean {
  if (err) {
    if (!REGEX.lettersAndNumbers.test(value)) {
      incorectValidation(err, ERROR_MESSAGES.onlyEnglishLettersAndNumbers);
      bolleanValid.setValidStatus('password', false);
      return false;
    }
    if (value.length <= 8) {
      bolleanValid.setValidStatus('password', false);
      incorectValidation(err, ERROR_MESSAGES.atLeast8Characters);
      return false;
    }
    if (!validatePassword(value)) {
      bolleanValid.setValidStatus('password', false);
      incorectValidation(err, ERROR_MESSAGES.passwordCapitalLetter);
      return false;
    }
    bolleanValid.setValidStatus('password', true);
    incorectValidation(err, '');
    return true;
  }
  return true;
}
export function dayValidation(
  value: string,
  err?: HTMLSpanElement | null,
): number | undefined {
  console.log(1);
  if (err) {
    if (value.length === 0) {
      incorectValidation(err, '');
      return;
    }
    if (!parseInt(value)) {
      incorectValidation(err, ERROR_MESSAGES.mustBeNumber);
      if (parseInt(value) > 31) {
        incorectValidation(err, ERROR_MESSAGES.dateOfBirth);
        return;
      }
      return;
    } else {
      incorectValidation(err, '');
      return parseInt(value);
    }
  }
}
export function monthValidation(
  value: string,
  err?: HTMLSpanElement | null,
): number | undefined {
  if (err) {
    if (value.length === 0) {
      incorectValidation(err, '');
      return;
    }
    if (!parseInt(value)) {
      incorectValidation(err, ERROR_MESSAGES.mustBeNumber);
      if (parseInt(value) > 12) {
        incorectValidation(err, ERROR_MESSAGES.dateOfBirth);
        return;
      }
      return;
    } else {
      incorectValidation(err, '');
      return parseInt(value);
    }
  }
}
export function yearValidation(
  value: string,
  err?: HTMLSpanElement | null,
): number | undefined {
  if (value.length === 0) {
    if (err) {
      incorectValidation(err, '');
      if (!parseInt(value)) {
        incorectValidation(err, ERROR_MESSAGES.mustBeNumber);
        return;
      }
      return parseInt(value);
    }
  }
}
export function checkNumber(this: HTMLButtonElement): void {
  const err = errors.errorDateReg;
  const parent = this.parentNode as HTMLLabelElement | null;
  if (!parent) {
    return;
  }
  if (
    dateYear instanceof HTMLInputElement &&
    dateMonth instanceof HTMLInputElement &&
    dateDay instanceof HTMLInputElement
  ) {
    if (+dateYear.value && +dateMonth.value && +dateDay.value) {
      if (
        +dateMonth.value <= 12 &&
        +dateDay.value <= 31 &&
        +dateYear.value <= 2024 &&
        +dateYear.value >= 1970
      ) {
        const age = new Date(
          +dateYear.value,
          +dateMonth.value - 1,
          +dateDay.value,
        );
        if (calculateAge(age) < 13) {
          incorectValidation(err, ERROR_MESSAGES.ageRequirement);
        } else {
          bolleanValid.setValidStatus('date', true);
          incorectValidation(err, '');
        }
      } else {
        bolleanValid.setValidStatus('date', false);
        incorectValidation(err, ERROR_MESSAGES.incorrectData);
      }
    } else {
      bolleanValid.setValidStatus('date', false);
      incorectValidation(err, ERROR_MESSAGES.incorrectData);
    }
  }
}

export function postCodeBillingValidation(
  value: string,
  err?: HTMLSpanElement | null,
): void {
  if (err) {
    const countryNames = country.names();
    const countryIndex = countryNames.indexOf(countriesBillingList.textContent);
    const postCode = Object.keys(country.all)[countryIndex];
    const cityErr = errors.errorBillingCityReg;
    const streetErr = errors.errorBillingStreetReg;
    if (value.length === 0) {
      if (
        billingStreet instanceof HTMLInputElement &&
        billingCity instanceof HTMLInputElement
      ) {
        incorectValidation(err, '');
        billingCity.setAttribute('disabled', '');
        billingStreet.setAttribute('disabled', '');
        console.log(billingStreet);
        bolleanValid.setValidStatus('city', false);
        bolleanValid.setValidStatus('post', false);
        bolleanValid.setValidStatus('street', false);
        cityErr.textContent = '';
        streetErr.textContent = '';
        billingStreet.value = '';
        billingCity.value = '';
        return;
      }
    }
    if (postcodeValidatorExistsForCountry(postCode)) {
      if (postcodeValidator(value, postCode)) {
        billingCity.removeAttribute('disabled');
        incorectValidation(err, '');
      } else {
        if (
          billingStreet instanceof HTMLInputElement &&
          billingCity instanceof HTMLInputElement
        ) {
          billingCity.setAttribute('disabled', '');
          billingStreet.setAttribute('disabled', '');
          bolleanValid.setValidStatus('city', false);
          bolleanValid.setValidStatus('post', false);
          bolleanValid.setValidStatus('street', false);
          cityErr.textContent = '';
          streetErr.textContent = '';
          billingStreet.value = '';
          billingCity.value = '';
          incorectValidation(err, ERROR_MESSAGES.incorrectData);
          return;
        }
      }
    } else {
      bolleanValid.setValidStatus('post', true);
      billingCity.removeAttribute('disabled');
      incorectValidation(err, '');
      return;
    }
  }
}
export function postCodeShippingValidation(
  value: string,
  err?: HTMLSpanElement | null,
): void {
  if (err) {
    const countryNames = country.names();
    const countryIndex = countryNames.indexOf(
      countriesShippingList.textContent,
    );
    const postCode = Object.keys(country.all)[countryIndex];
    const cityErr = errors.errorShippingCityReg;
    const streetErr = errors.errorShippingStreetReg;
    if (value.length === 0) {
      if (
        shippingStreet instanceof HTMLInputElement &&
        shippingCity instanceof HTMLInputElement
      ) {
        incorectValidation(err, '');
        shippingCity.setAttribute('disabled', '');
        shippingStreet.setAttribute('disabled', '');
        bolleanValid.setValidStatus('city', false);
        bolleanValid.setValidStatus('post', false);
        bolleanValid.setValidStatus('street', false);
        cityErr.textContent = '';
        streetErr.textContent = '';
        shippingStreet.value = '';
        shippingCity.value = '';
        return;
      }
    }
    if (postcodeValidatorExistsForCountry(postCode)) {
      if (postcodeValidator(value, postCode)) {
        shippingCity.removeAttribute('disabled');
        incorectValidation(err, '');
      } else {
        if (
          shippingStreet instanceof HTMLInputElement &&
          shippingCity instanceof HTMLInputElement
        ) {
          shippingCity.setAttribute('disabled', '');
          shippingStreet.setAttribute('disabled', '');
          bolleanValid.setValidStatus('city', false);
          bolleanValid.setValidStatus('post', false);
          bolleanValid.setValidStatus('street', false);
          cityErr.textContent = '';
          streetErr.textContent = '';
          shippingStreet.value = '';
          shippingCity.value = '';
          incorectValidation(err, ERROR_MESSAGES.incorrectData);
          return;
        }
      }
    } else {
      bolleanValid.setValidStatus('post', true);
      shippingCity.removeAttribute('disabled');
      incorectValidation(err, '');
      return;
    }
  }
}
export function disableLocation(list: string): void {
  if (list === 'billing') {
    errors.errorBillingCityReg.textContent = '';
    errors.errorBillingStreetReg.textContent = '';
    errors.errorBillingPostReg.textContent = '';
    billingStreet.setAttribute('disabled', '');
    billingCity.setAttribute('disabled', '');
    billingStreet.value = '';
    billingPost.value = '';
    billingCity.value = '';
  } else if (list === 'shipping') {
    errors.errorShippingCityReg.textContent = '';
    errors.errorShippingStreetReg.textContent = '';
    errors.errorShippingPostReg.textContent = '';
    shippingStreet.setAttribute('disabled', '');
    shippingCity.setAttribute('disabled', '');
    shippingStreet.value = '';
    shippingPost.value = '';
    shippingCity.value = '';
  }
}
