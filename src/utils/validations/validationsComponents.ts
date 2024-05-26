import { calculateAge, checkDaysInMonth } from '../ageAndTextChecks';
import country from 'country-list-js';

import * as dateComponents from '../../components/registrationForm/dateComponent';
import { setValidStatus, checkAllInputs } from './booleanValid';
import {
  AddressComponents,
  Components,
  billingComponents,
  shippingComponents,
} from '../../components/registrationForm/address/addressFactory';
import * as postalCodes from 'postal-codes-js';
const components: Components = {
  billing: billingComponents,
  shipping: shippingComponents,
};

const dateDay = dateComponents.dayDate as HTMLInputElement;
const dateMonth = dateComponents.monthDate as HTMLInputElement;
const dateYear = dateComponents.yearDate as HTMLInputElement;
export const ERROR_MESSAGES = {
  shortInput: 'Must contain at least 2 letters',
  invalidEmail: 'Invalid email format',
  missingAtSymbol: "Email must contain an '@' symbol",
  missingDomain: 'Email must contain a domain name',
  invalidCharacters: 'Email contains invalid characters',
  onlyEnglishLetters: 'Must contain only English letters',
  onlyEnglishLettersAndNumbers: 'Must contain only English letters and numbers',
  invalidFormat: 'Incorrect format',
  passwordRequirements: 'Password must meet requirements',
  mustBeNumber: 'Must be a number',
  dateOfBirth: 'Please enter your date of birth',
  atLeast8Characters: 'Password must contain at least 8 characters',
  passwordDetails:
    'Password must contain at  at least 1 uppercase letter, 1 lowercase letter and 1 number',
  ageRequirement: 'You must be 13 or older',
  incorrectData: 'Please enter correct data',
  passwordNoSpaces: 'Password must not contain spaces',
};

const REGEX = {
  email: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/,
  lettersOnly: /^[a-zA-Z]+$/,
  lettersAndNumbers: /^[A-Za-z0-9._%+-]+$/,
  lettersAndNumbersAndWhiteSpaces: /^[A-Za-z0-9._%+-\s]+$/,
  birthDate: /^(0[1-9]|1[0-2]).(0[1-9]|[12][0-9]|3[01]).\d{4}$/,
  number: /^\d+$/,
  password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[\S]{8,}$/,
  lettersAndSpacesAndHyphens: /^[A-Za-z\s-]+$/,
};

function incorectValidation(
  errorSpan: HTMLSpanElement,
  errorMessage: string,
): void {
  errorSpan.textContent = errorMessage;
}
export function mailValidation(
  value: string,
  err: HTMLSpanElement | null,
): boolean {
  if (err) {
    if (value.length === 0) {
      incorectValidation(err, ERROR_MESSAGES.invalidEmail);
      setValidStatus('mail', false);
      checkAllInputs();
      return false;
    }

    if (!value.includes('@')) {
      incorectValidation(err, ERROR_MESSAGES.missingAtSymbol);
      setValidStatus('mail', false);
      checkAllInputs();
      return false;
    }

    const domainPart = value.split('@');

    if (!domainPart) {
      incorectValidation(err, ERROR_MESSAGES.missingDomain);
      setValidStatus('mail', false);
      checkAllInputs();
      return false;
    }

    if (!REGEX.email.test(String(value).toLowerCase())) {
      incorectValidation(err, ERROR_MESSAGES.invalidEmail);
      setValidStatus('mail', false);
      checkAllInputs();
      return false;
    }

    incorectValidation(err, '');
    setValidStatus('mail', true);
    checkAllInputs();
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
      setValidStatus('name', false);
      checkAllInputs();
      return false;
    }
    if (value.length <= 1) {
      incorectValidation(err, ERROR_MESSAGES.shortInput);
      setValidStatus('name', false);
      checkAllInputs();
      return false;
    }
    if (!REGEX.lettersOnly.test(value)) {
      incorectValidation(err, ERROR_MESSAGES.onlyEnglishLetters);
      setValidStatus('name', false);
      checkAllInputs();
      return false;
    }
    setValidStatus('name', true);
    checkAllInputs();
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
      setValidStatus('lastName', false);
      checkAllInputs();
      return false;
    }
    if (value.length <= 1) {
      incorectValidation(err, ERROR_MESSAGES.shortInput);
      setValidStatus('lastName', false);
      checkAllInputs();
      return false;
    }
    if (!REGEX.lettersOnly.test(value)) {
      incorectValidation(err, ERROR_MESSAGES.onlyEnglishLetters);
      setValidStatus('lastName', false);
      checkAllInputs();
      return false;
    }
    setValidStatus('lastName', true);
    checkAllInputs();
    incorectValidation(err, '');
    return true;
  }
  return true;
}

export function cityValidation(
  value: string,
  err?: HTMLSpanElement | null,
  type?: string | null,
): boolean {
  if (err && type) {
    const cityValid: 'city-shipping' | 'city-billing' =
      type === 'shipping' ? 'city-shipping' : 'city-billing';
    const streetValid: 'street-shipping' | 'street-billing' =
      type === 'shipping' ? 'street-shipping' : 'street-billing';
    const streetErr = components[type].errorStreet;
    const billingStreet = components[type].inputStreet;
    if (value.length === 0) {
      if (billingStreet instanceof HTMLInputElement) {
        setValidStatus(cityValid, false);
        setValidStatus(streetValid, false);
        checkAllInputs();
        billingStreet.value = '';
        incorectValidation(err, '');
        return false;
      }
    }
    if (value.length <= 1) {
      if (billingStreet instanceof HTMLInputElement) {
        billingStreet.setAttribute('disabled', '');
        incorectValidation(err, ERROR_MESSAGES.shortInput);
        setValidStatus(cityValid, false);
        setValidStatus(streetValid, false);
        checkAllInputs();
        streetErr.textContent = '';
        billingStreet.value = '';
        return false;
      }
    }
    if (!REGEX.lettersAndSpacesAndHyphens.test(value)) {
      if (billingStreet instanceof HTMLInputElement) {
        setValidStatus(cityValid, false);
        setValidStatus(streetValid, false);
        checkAllInputs();
        billingStreet.setAttribute('disabled', '');
        streetErr.textContent = '';
        billingStreet.value = '';
        incorectValidation(err, ERROR_MESSAGES.incorrectData);
        return false;
      }
    }
    incorectValidation(err, '');
    setValidStatus(cityValid, true);
    checkAllInputs();
    billingStreet.removeAttribute('disabled');
    return true;
  }
  return true;
}

export function streetValidation(
  value: string,
  err?: HTMLSpanElement | null,
  type?: string | null,
): boolean {
  if (err && type) {
    const streetValid: 'street-shipping' | 'street-billing' =
      type === 'shipping' ? 'street-shipping' : 'street-billing';
    if (value.length === 0) {
      setValidStatus(streetValid, false);
      checkAllInputs();
      incorectValidation(err, '');
      return false;
    }
    if (value.length <= 1) {
      setValidStatus(streetValid, false);
      checkAllInputs();
      incorectValidation(err, ERROR_MESSAGES.shortInput);
      return false;
    }
    if (!REGEX.lettersAndNumbersAndWhiteSpaces.test(value)) {
      setValidStatus(streetValid, false);
      checkAllInputs();
      incorectValidation(err, ERROR_MESSAGES.onlyEnglishLetters);
      return false;
    }
    setValidStatus(streetValid, true);
    checkAllInputs();
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
    if (/\s/.test(value)) {
      setValidStatus('password', false);
      checkAllInputs();
      incorectValidation(err, ERROR_MESSAGES.passwordNoSpaces);
      err.style.bottom = '0px';
      return false;
    }

    if (value.length < 8) {
      setValidStatus('password', false);
      checkAllInputs();
      incorectValidation(err, ERROR_MESSAGES.atLeast8Characters);
      err.style.bottom = '0px';
      return false;
    }

    if (!/[A-Z]/.test(value)) {
      setValidStatus('password', false);
      checkAllInputs();
      incorectValidation(err, ERROR_MESSAGES.passwordDetails);
      err.style.bottom = '-4px';
      return false;
    }

    if (!/[a-z]/.test(value)) {
      setValidStatus('password', false);
      checkAllInputs();
      err.style.bottom = '0px';
      incorectValidation(err, ERROR_MESSAGES.passwordDetails);
      return false;
    }

    if (!/\d/.test(value)) {
      setValidStatus('password', false);
      checkAllInputs();
      incorectValidation(err, ERROR_MESSAGES.passwordDetails);
      err.style.bottom = '0px';
      return false;
    }

    setValidStatus('password', true);
    checkAllInputs();
    incorectValidation(err, '');
    err.style.bottom = '0px';
    return true;
  }
  return true;
}
export function dayValidation(
  value: string,
  err?: HTMLSpanElement | null,
): number | undefined {
  const daysInMonth = checkDaysInMonth(dateMonth.value, dateYear.value);
  if (err) {
    if (value.length === 0) {
      incorectValidation(err, '');
      return;
    }
    if (!parseInt(value)) {
      incorectValidation(err, ERROR_MESSAGES.mustBeNumber);
      if (parseInt(value) > daysInMonth) {
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
  if (err) {
    const year = parseInt(value);
    if (isNaN(year)) {
      incorectValidation(err, ERROR_MESSAGES.mustBeNumber);
      return;
    }
    const age = calculateAge(new Date(year, 0, 1));
    if (age < 13) {
      incorectValidation(err, ERROR_MESSAGES.ageRequirement);
      return;
    }
    incorectValidation(err, '');
    return year;
  }

  return parseInt(value);
}
export function checkNumber(this: HTMLInputElement): void {
  const parent = this.parentNode as HTMLLabelElement | null;
  const err = parent?.parentElement?.firstElementChild as HTMLSpanElement;
  const daysInMonth = checkDaysInMonth(dateMonth.value, dateYear.value);
  if (!parent) {
    return;
  }

  if (+dateYear.value && +dateMonth.value && +dateDay.value) {
    if (
      +dateMonth.value <= 12 &&
      +dateDay.value <= daysInMonth &&
      +dateYear.value <= 2024 &&
      +dateYear.value >= 1900
    ) {
      const age = new Date(
        +dateYear.value,
        +dateMonth.value - 1,
        +dateDay.value,
      );
      if (calculateAge(age) < 13) {
        incorectValidation(err, ERROR_MESSAGES.ageRequirement);
      } else {
        setValidStatus('date', true);
        checkAllInputs();
        incorectValidation(err, '');
      }
    } else {
      setValidStatus('date', false);
      checkAllInputs();
      incorectValidation(err, ERROR_MESSAGES.incorrectData);
    }
  } else {
    setValidStatus('date', false);
    checkAllInputs();
    incorectValidation(err, ERROR_MESSAGES.incorrectData);
  }
}

export function postCodeValidation(
  value: string,
  err?: HTMLSpanElement | null,
  type?: string | null,
): void {
  if (err && type) {
    const countryNames = country.names();
    const countryIndex = countryNames.indexOf(
      components[type].listCountry.textContent || '',
    );
    const postCode = Object.keys(country.all)[countryIndex];

    const cityValid: 'city-shipping' | 'city-billing' =
      type === 'shipping' ? 'city-shipping' : 'city-billing';
    const streetValid: 'street-shipping' | 'street-billing' =
      type === 'shipping' ? 'street-shipping' : 'street-billing';
    const postValid: 'post-shipping' | 'post-billing' =
      type === 'shipping' ? 'post-shipping' : 'post-billing';
    const streetErr = components[type].errorStreet;
    const cityErr = components[type].errorCity;
    const billingStreet = components[type].inputStreet;
    const billingCity = components[type].inputCity;
    if (value.length === 0) {
      if (
        billingStreet instanceof HTMLInputElement &&
        billingCity instanceof HTMLInputElement
      ) {
        incorectValidation(err, '');
        billingCity.setAttribute('disabled', '');
        billingStreet.setAttribute('disabled', '');
        setValidStatus(cityValid, false);
        setValidStatus(postValid, false);
        setValidStatus(streetValid, false);
        checkAllInputs();
        cityErr.textContent = '';
        streetErr.textContent = '';
        billingStreet.value = '';
        billingCity.value = '';
        return;
      }
    }

    if (postalCodes.validate(postCode, value) === true) {
      billingCity.removeAttribute('disabled');
      incorectValidation(err, '');
      setValidStatus(postValid, true);
      checkAllInputs();
    } else {
      if (
        billingStreet instanceof HTMLInputElement &&
        billingCity instanceof HTMLInputElement
      ) {
        billingCity.setAttribute('disabled', '');
        billingStreet.setAttribute('disabled', '');
        setValidStatus(cityValid, false);
        setValidStatus(postValid, false);
        setValidStatus(streetValid, false);
        checkAllInputs();
        cityErr.textContent = '';
        streetErr.textContent = '';
        billingStreet.value = '';
        billingCity.value = '';
        incorectValidation(err, ERROR_MESSAGES.incorrectData);
      }
    }
  }
}

export function disableLocation(
  adressComponents: AddressComponents,
  purpose: string,
): void {
  adressComponents.errorCity.textContent = '';
  adressComponents.errorStreet.textContent = '';
  adressComponents.errorPost.textContent = '';
  adressComponents.inputStreet.setAttribute('disabled', '');
  adressComponents.inputCity.setAttribute('disabled', '');
  const cityValid: 'city-shipping' | 'city-billing' =
    purpose === 'shipping' ? 'city-shipping' : 'city-billing';
  const streetValid: 'street-shipping' | 'street-billing' =
    purpose === 'shipping' ? 'street-shipping' : 'street-billing';
  setValidStatus(cityValid, false);
  setValidStatus(streetValid, false);
  checkAllInputs();
  adressComponents.inputStreet.value = '';
  adressComponents.inputPost.value = '';
  adressComponents.inputCity.value = '';
}
