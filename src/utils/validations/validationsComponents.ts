import { calculateAge, checkDaysInMonth } from '../ageAndTextChecks';
import country from 'country-list-js';

import * as dateComponents from '../../components/registrationForm/dateComponent';
import { setValidStatus, checkAllInputs, validStatus } from './booleanValid';
import * as postalCodes from 'postal-codes-js';
import { checkError, checkInputIndex } from './validation';
import { searchElement, searchInput } from '../searchElem';
import { filterArray } from '../filterElem';

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
  index?: number | null,
): boolean {
  if (err && index != null) {
    if (value.length === 0) {
      incorectValidation(err, ERROR_MESSAGES.invalidEmail);
      setValidStatus(index, false);
      checkAllInputs();
      return false;
    }

    if (!value.includes('@')) {
      incorectValidation(err, ERROR_MESSAGES.missingAtSymbol);
      setValidStatus(index, false);
      checkAllInputs();
      return false;
    }

    const domainPart = value.split('@');

    if (!domainPart) {
      incorectValidation(err, ERROR_MESSAGES.missingDomain);
      setValidStatus(index, false);
      checkAllInputs();
      return false;
    }

    if (!REGEX.email.test(String(value).toLowerCase())) {
      incorectValidation(err, ERROR_MESSAGES.invalidEmail);
      setValidStatus(index, false);
      checkAllInputs();
      return false;
    }

    incorectValidation(err, '');
    setValidStatus(index, true);
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
  index?: number | null,
): boolean {
  if (err && index != null) {
    if (value.length === 0) {
      incorectValidation(err, '');
      setValidStatus(index, false);
      console.log(validStatus);
      checkAllInputs();
      return false;
    }
    if (value.length <= 1) {
      incorectValidation(err, ERROR_MESSAGES.shortInput);
      setValidStatus(index, false);
      console.log(validStatus);
      checkAllInputs();
      return false;
    }
    if (!REGEX.lettersOnly.test(value)) {
      incorectValidation(err, ERROR_MESSAGES.onlyEnglishLetters);
      setValidStatus(index, false);
      console.log(validStatus);
      checkAllInputs();
      return false;
    }
    setValidStatus(index, true);
    console.log(validStatus);
    checkAllInputs();
    incorectValidation(err, '');
    return true;
  }
  return true;
}

export function lastNameValidation(
  value: string,
  err?: HTMLSpanElement | null,
  index?: number | null,
): boolean {
  if (err && index != null) {
    if (value.length === 0) {
      incorectValidation(err, '');
      setValidStatus(index, false);
      checkAllInputs();
      return false;
    }
    if (value.length <= 1) {
      incorectValidation(err, ERROR_MESSAGES.shortInput);
      setValidStatus(index, false);
      checkAllInputs();
      return false;
    }
    if (!REGEX.lettersOnly.test(value)) {
      incorectValidation(err, ERROR_MESSAGES.onlyEnglishLetters);
      setValidStatus(index, false);
      checkAllInputs();
      return false;
    }
    setValidStatus(index, true);
    checkAllInputs();
    incorectValidation(err, '');
    return true;
  }
  return true;
}

export function cityValidation(
  value: string,
  err?: HTMLSpanElement | null,
  index?: number | null,
  form?: HTMLFormElement | null,
): boolean {
  if (err && form && index != null) {
    const filterArr = filterArray(form);
    const street = filterArr[index + 1];
    const streetErr = checkError(street.parentElement?.children);
    if (streetErr) {
      if (value.length === 0) {
        if (street instanceof HTMLInputElement) {
          setValidStatus(index, false);
          setValidStatus(index + 1, false);
          checkAllInputs();
          street.value = '';
          incorectValidation(err, '');
          return false;
        }
      }
      if (value.length <= 1) {
        if (street instanceof HTMLInputElement) {
          street.setAttribute('disabled', '');
          incorectValidation(err, ERROR_MESSAGES.shortInput);
          setValidStatus(index, false);
          setValidStatus(index + 1, false);
          checkAllInputs();
          streetErr.textContent = '';
          street.value = '';
          return false;
        }
      }
      if (!REGEX.lettersAndSpacesAndHyphens.test(value)) {
        if (street instanceof HTMLInputElement) {
          setValidStatus(index, false);
          setValidStatus(index + 1, false);
          checkAllInputs();
          street.setAttribute('disabled', '');
          streetErr.textContent = '';
          street.value = '';
          incorectValidation(err, ERROR_MESSAGES.incorrectData);
          return false;
        }
      }
      incorectValidation(err, '');
      setValidStatus(index, true);
      checkAllInputs();
      street.removeAttribute('disabled');
      return true;
    }
  }
  return true;
}

export function streetValidation(
  value: string,
  err?: HTMLSpanElement | null,
  index?: number | null,
): boolean {
  console.log(err, index);
  if (err && index != null) {
    if (value.length === 0) {
      setValidStatus(index, false);
      checkAllInputs();
      incorectValidation(err, '');
      return false;
    }
    if (value.length <= 1) {
      setValidStatus(index, false);
      checkAllInputs();
      incorectValidation(err, ERROR_MESSAGES.shortInput);
      return false;
    }
    if (!REGEX.lettersAndNumbersAndWhiteSpaces.test(value)) {
      setValidStatus(index, false);
      checkAllInputs();
      incorectValidation(err, ERROR_MESSAGES.onlyEnglishLetters);
      return false;
    }
    setValidStatus(index, true);
    checkAllInputs();
    incorectValidation(err, '');
    return true;
  }
  return true;
}
export function passwordValidation(
  value: string,
  err?: HTMLSpanElement | null,
  index?: number | null,
): boolean {
  if (err && index != null) {
    if (/\s/.test(value)) {
      setValidStatus(index, false);
      checkAllInputs();
      incorectValidation(err, ERROR_MESSAGES.passwordNoSpaces);
      err.style.bottom = '0px';
      return false;
    }

    if (value.length < 8) {
      setValidStatus(index, false);
      checkAllInputs();
      incorectValidation(err, ERROR_MESSAGES.atLeast8Characters);
      err.style.bottom = '0px';
      return false;
    }

    if (!/[A-Z]/.test(value)) {
      setValidStatus(index, false);
      checkAllInputs();
      incorectValidation(err, ERROR_MESSAGES.passwordDetails);
      err.style.bottom = '-4px';
      return false;
    }

    if (!/[a-z]/.test(value)) {
      setValidStatus(index, false);
      checkAllInputs();
      err.style.bottom = '0px';
      incorectValidation(err, ERROR_MESSAGES.passwordDetails);
      return false;
    }

    if (!/\d/.test(value)) {
      setValidStatus(index, false);
      checkAllInputs();
      incorectValidation(err, ERROR_MESSAGES.passwordDetails);
      err.style.bottom = '0px';
      return false;
    }

    setValidStatus(index, true);
    console.log(validStatus);
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
  const dateMonth = dateComponents.monthDate as HTMLInputElement;
  const dateYear = dateComponents.yearDate as HTMLInputElement;
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
  index?: number | null,
): number | undefined {
  if (err && index != null) {
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
  index?: number | null,
): number | undefined {
  if (err && index != null) {
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
export function checkNumber(event: Event): void {
  const elem = event.target as HTMLInputElement;
  const parent = elem.parentNode as HTMLLabelElement | null;
  const form = elem.form;
  const err = checkError(parent?.parentElement?.children) as HTMLSpanElement;
  const dateDay = form?.querySelector('.date__day') as HTMLInputElement;
  const dateMonth = form?.querySelector('.date__month') as HTMLInputElement;
  const dateYear = form?.querySelector('.date__year') as HTMLInputElement;
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
        setValidStatus(4, true);
        checkAllInputs();
        incorectValidation(err, '');
      }
    } else {
      setValidStatus(4, false);
      checkAllInputs();
      incorectValidation(err, ERROR_MESSAGES.incorrectData);
    }
  } else {
    setValidStatus(4, false);
    checkAllInputs();
    incorectValidation(err, ERROR_MESSAGES.incorrectData);
  }
}

export function postCodeValidation(
  value: string,
  err?: HTMLSpanElement | null,
  index?: number | null,
  form?: HTMLFormElement | null,
): void {
  if (err && form && index != null) {
    const filterArr = filterArray(form);
    const city = filterArr[index + 1];
    const container = city.parentElement?.parentElement as HTMLElement;
    const contryWrapper = searchElement(
      container,
      'country-wrapper',
    ) as HTMLElement;
    const contryList = searchElement(
      contryWrapper,
      'countries-list',
    ) as HTMLElement;
    console.log(contryList);
    const countryNames = country.names();
    const countryIndex = countryNames.indexOf(contryList.textContent || '');
    const street = filterArr[index + 2];
    const streetErr = checkError(street.parentElement?.children);
    const cityErr = checkError(city.parentElement?.children);
    if (streetErr && cityErr) {
      const postCode = Object.keys(country.all)[countryIndex];
      if (value.length === 0) {
        if (
          street instanceof HTMLInputElement &&
          city instanceof HTMLInputElement
        ) {
          incorectValidation(err, '');
          city.setAttribute('disabled', '');
          street.setAttribute('disabled', '');
          setValidStatus(index, false);
          setValidStatus(index + 1, false);
          setValidStatus(index + 2, false);
          checkAllInputs();
          cityErr.textContent = '';
          streetErr.textContent = '';
          city.value = '';
          street.value = '';
          return;
        }
      }

      if (postalCodes.validate(postCode, value) === true) {
        city.removeAttribute('disabled');
        incorectValidation(err, '');
        setValidStatus(index, true);
        checkAllInputs();
      } else {
        if (
          city instanceof HTMLInputElement &&
          street instanceof HTMLInputElement
        ) {
          city.setAttribute('disabled', '');
          street.setAttribute('disabled', '');
          setValidStatus(index, false);
          setValidStatus(index + 1, false);
          setValidStatus(index + 2, false);
          checkAllInputs();
          cityErr.textContent = '';
          streetErr.textContent = '';
          city.value = '';
          street.value = '';
          incorectValidation(err, ERROR_MESSAGES.incorrectData);
        }
      }
    }
  }
}

export function disableLocation(wrapper: HTMLElement): void {
  const parent = wrapper.parentElement?.parentElement as HTMLElement;
  const postLabel = searchElement(parent, 'label-post') as HTMLLabelElement;
  const cityLabel = searchElement(parent, 'label-city') as HTMLLabelElement;
  const streetLabel = searchElement(parent, 'label-street') as HTMLLabelElement;
  const post = searchInput(postLabel) as HTMLInputElement;
  const city = searchInput(cityLabel) as HTMLInputElement;
  const street = searchInput(streetLabel) as HTMLInputElement;
  const postErr = checkError(postLabel.children);
  const cityErr = checkError(cityLabel.children);
  const streetErr = checkError(streetLabel.children);
  if (postErr && cityErr && streetErr) {
    postErr.textContent = '';
    cityErr.textContent = '';
    streetErr.textContent = '';
    street.setAttribute('disabled', '');
    city.setAttribute('disabled', '');
    const cityIndex = checkInputIndex(city);
    const streetIndex = checkInputIndex(street);
    const postIndex = checkInputIndex(street);
    setValidStatus(cityIndex, false);
    setValidStatus(streetIndex, false);
    setValidStatus(postIndex, false);
    checkAllInputs();
    street.value = '';
    post.value = '';
    city.value = '';
  }
}
