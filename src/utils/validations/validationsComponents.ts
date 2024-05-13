import { calculateAge, validatePassword } from '../ageAndTextChecks';
import country from 'country-list-js';
import {
  postcodeValidator,
  postcodeValidatorExistsForCountry,
} from 'postcode-validator';
import * as dateComponents from '../../components/registrationForm/dateComponent';
import * as errors from './validationsErrors';
import * as booleanValid from './booleanValid';
import { billingComponents, shippingComponents } from '../../components/registrationForm/address/addressFactory';

const countriesBillingList = billingComponents.listCountry;
const countriesShippingList = shippingComponents.listCountry; // Adjusted to match the actual property name if it's different

const billingCity = billingComponents.inputCity as HTMLInputElement; // Ensuring property names are correct
const billingPost = billingComponents.inputPost as HTMLInputElement;
const billingStreet = billingComponents.inputStreet as HTMLInputElement;

const shippingCity = shippingComponents.inputCity as HTMLInputElement;
const shippingPost = shippingComponents.inputPost as HTMLInputElement;
const shippingStreet = shippingComponents.inputStreet as HTMLInputElement;


const dateDay = dateComponents.dayDate;
const dateMonth = dateComponents.monthDate;
const dateYear = dateComponents.yearDate;
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
      booleanValid.setValidStatus('mail', false);
      booleanValid.checkAllInputs();
      return false;
    }
    if (!REGEX.email.test(String(value).toLowerCase())) {
      incorectValidation(err, ERROR_MESSAGES.invalidEmail);
      booleanValid.setValidStatus('mail', false);
      booleanValid.checkAllInputs();
      return false;
    }
    incorectValidation(err, '');
    booleanValid.setValidStatus('mail', true);
    booleanValid.checkAllInputs();
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
      booleanValid.setValidStatus('name', false);
      booleanValid.checkAllInputs();
      return false;
    }
    if (value.length <= 1) {
      incorectValidation(err, ERROR_MESSAGES.shortInput);
      booleanValid.setValidStatus('name', false);
      booleanValid.checkAllInputs();
      return false;
    }
    if (!REGEX.lettersOnly.test(value)) {
      incorectValidation(err, ERROR_MESSAGES.onlyEnglishLetters);
      booleanValid.setValidStatus('name', false);
      booleanValid.checkAllInputs();
      return false;
    }
    booleanValid.setValidStatus('name', true);
    booleanValid.checkAllInputs();
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
      booleanValid.setValidStatus('lastName', false);
      booleanValid.checkAllInputs();
      return false;
    }
    if (value.length <= 1) {
      incorectValidation(err, ERROR_MESSAGES.shortInput);
      booleanValid.setValidStatus('lastName', false);
      booleanValid.checkAllInputs();
      return false;
    }
    if (!REGEX.lettersOnly.test(value)) {
      incorectValidation(err, ERROR_MESSAGES.onlyEnglishLetters);
      booleanValid.setValidStatus('lastName', false);
      booleanValid.checkAllInputs();
      return false;
    }
    booleanValid.setValidStatus('lastName', true);
    booleanValid.checkAllInputs();
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
        booleanValid.setValidStatus('cityBilling', false);
        booleanValid.setValidStatus('streetBilling', false);
        booleanValid.checkAllInputs();
        billingStreet.value = '';
        incorectValidation(err, '');
        return false;
      }
    }
    if (value.length <= 1) {
      if (billingStreet instanceof HTMLInputElement) {
        billingStreet.setAttribute('disabled', '');
        incorectValidation(err, ERROR_MESSAGES.shortInput);
        booleanValid.setValidStatus('cityBilling', false);
        booleanValid.setValidStatus('streetBilling', false);
        booleanValid.checkAllInputs();
        streetErr.textContent = '';
        billingStreet.value = '';
        return false;
      }
    }
    if (!REGEX.lettersOnly.test(value)) {
      if (billingStreet instanceof HTMLInputElement) {
        booleanValid.setValidStatus('cityBilling', false);
        booleanValid.setValidStatus('streetBilling', false);
        booleanValid.checkAllInputs();
        billingStreet.setAttribute('disabled', '');
        streetErr.textContent = '';
        billingStreet.value = '';
        incorectValidation(err, ERROR_MESSAGES.onlyEnglishLetters);
        return false;
      }
    }
    incorectValidation(err, '');
    booleanValid.setValidStatus('cityBilling', true);
    booleanValid.checkAllInputs();
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
        booleanValid.setValidStatus('cityShipping', false);
        booleanValid.setValidStatus('streetShipping', false);
        booleanValid.checkAllInputs();
        shippingStreet.value = '';
        incorectValidation(err, '');
        return false;
      }
    }
    if (value.length <= 1) {
      if (shippingStreet instanceof HTMLInputElement) {
        shippingStreet.setAttribute('disabled', '');
        incorectValidation(err, ERROR_MESSAGES.shortInput);
        booleanValid.setValidStatus('cityShipping', false);
        booleanValid.setValidStatus('streetShipping', false);
        booleanValid.checkAllInputs();
        streetErr.textContent = '';
        shippingStreet.value = '';
        return false;
      }
    }
    if (!REGEX.lettersOnly.test(value)) {
      if (shippingStreet instanceof HTMLInputElement) {
        booleanValid.setValidStatus('cityShipping', false);
        booleanValid.setValidStatus('streetShipping', false);
        booleanValid.checkAllInputs();
        shippingStreet.setAttribute('disabled', '');
        streetErr.textContent = '';
        shippingStreet.value = '';
        incorectValidation(err, ERROR_MESSAGES.onlyEnglishLetters);
        return false;
      }
    }
    incorectValidation(err, '');
    booleanValid.setValidStatus('cityShipping', true);
    booleanValid.checkAllInputs();
    shippingStreet.removeAttribute('disabled');
    return true;
  }
  return true;
}

export function streetShippingValidation(
  value: string,
  err?: HTMLSpanElement | null,
): boolean {
  if (err) {
    if (value.length === 0) {
      booleanValid.setValidStatus('streetShipping', false);
      booleanValid.checkAllInputs();
      incorectValidation(err, '');
      return false;
    }
    if (value.length <= 1) {
      booleanValid.setValidStatus('streetShipping', false);
      booleanValid.checkAllInputs();
      incorectValidation(err, ERROR_MESSAGES.shortInput);
      return false;
    }
    if (!REGEX.lettersAndNumbers.test(value)) {
      booleanValid.setValidStatus('streetShipping', false);
      booleanValid.checkAllInputs();
      incorectValidation(err, ERROR_MESSAGES.onlyEnglishLetters);
      return false;
    }
    booleanValid.setValidStatus('streetShipping', true);
    booleanValid.checkAllInputs();
    incorectValidation(err, '');
    return true;
  }
  return true;
}
export function streetBillingValidation(
  value: string,
  err?: HTMLSpanElement | null,
): boolean {
  if (err) {
    if (value.length === 0) {
      booleanValid.setValidStatus('streetBilling', false);
      booleanValid.checkAllInputs();
      incorectValidation(err, '');
      return false;
    }
    if (value.length <= 1) {
      booleanValid.setValidStatus('streetBilling', false);
      booleanValid.checkAllInputs();
      incorectValidation(err, ERROR_MESSAGES.shortInput);
      return false;
    }
    if (!REGEX.lettersAndNumbers.test(value)) {
      booleanValid.setValidStatus('streetBilling', false);
      booleanValid.checkAllInputs();
      incorectValidation(err, ERROR_MESSAGES.onlyEnglishLetters);
      return false;
    }
    booleanValid.setValidStatus('streetBilling', true);
    booleanValid.checkAllInputs();
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
      booleanValid.setValidStatus('password', false);
      booleanValid.checkAllInputs();
      return false;
    }
    if (value.length <= 8) {
      booleanValid.setValidStatus('password', false);
      booleanValid.checkAllInputs();
      incorectValidation(err, ERROR_MESSAGES.atLeast8Characters);
      return false;
    }
    if (!validatePassword(value)) {
      booleanValid.setValidStatus('password', false);
      booleanValid.checkAllInputs();
      incorectValidation(err, ERROR_MESSAGES.passwordCapitalLetter);
      return false;
    }
    booleanValid.setValidStatus('password', true);
    booleanValid.checkAllInputs();
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
          booleanValid.setValidStatus('date', true);
          booleanValid.checkAllInputs();
          incorectValidation(err, '');
        }
      } else {
        booleanValid.setValidStatus('date', false);
        booleanValid.checkAllInputs();
        incorectValidation(err, ERROR_MESSAGES.incorrectData);
      }
    } else {
      booleanValid.setValidStatus('date', false);
      booleanValid.checkAllInputs();
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
        booleanValid.setValidStatus('cityBilling', false);
        booleanValid.setValidStatus('postBilling', false);
        booleanValid.setValidStatus('streetBilling', false);
        booleanValid.checkAllInputs();
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
          booleanValid.setValidStatus('cityBilling', false);
          booleanValid.setValidStatus('postBilling', false);
          booleanValid.setValidStatus('streetBilling', false);
          booleanValid.checkAllInputs();
          cityErr.textContent = '';
          streetErr.textContent = '';
          billingStreet.value = '';
          billingCity.value = '';
          incorectValidation(err, ERROR_MESSAGES.incorrectData);
          return;
        }
      }
    } else {
      booleanValid.setValidStatus('postBilling', true);
      booleanValid.checkAllInputs();
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
        booleanValid.setValidStatus('cityShipping', false);
        booleanValid.setValidStatus('postShipping', false);
        booleanValid.setValidStatus('streetShipping', false);
        booleanValid.checkAllInputs();
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
        booleanValid.checkAllInputs();
        incorectValidation(err, '');
      } else {
        if (
          shippingStreet instanceof HTMLInputElement &&
          shippingCity instanceof HTMLInputElement
        ) {
          shippingCity.setAttribute('disabled', '');
          shippingStreet.setAttribute('disabled', '');
          booleanValid.setValidStatus('cityShipping', false);
          booleanValid.setValidStatus('streetShipping', false);
          booleanValid.setValidStatus('postShipping', false);
          booleanValid.checkAllInputs();
          cityErr.textContent = '';
          streetErr.textContent = '';
          shippingStreet.value = '';
          shippingCity.value = '';
          incorectValidation(err, ERROR_MESSAGES.incorrectData);
          return;
        }
      }
    } else {
      booleanValid.setValidStatus('postShipping', true);
      booleanValid.checkAllInputs();
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
    booleanValid.setValidStatus('cityBilling', false);
    booleanValid.setValidStatus('streetBilling', false);
    booleanValid.checkAllInputs();
    billingStreet.value = '';
    billingPost.value = '';
    billingCity.value = '';
  } else if (list === 'shipping') {
    errors.errorShippingCityReg.textContent = '';
    errors.errorShippingStreetReg.textContent = '';
    errors.errorShippingPostReg.textContent = '';
    shippingStreet.setAttribute('disabled', '');
    shippingCity.setAttribute('disabled', '');
    booleanValid.setValidStatus('cityShipping', false);
    booleanValid.setValidStatus('streetShipping', false);
    booleanValid.checkAllInputs();
    shippingStreet.value = '';
    shippingPost.value = '';
    shippingCity.value = '';
  }
}
