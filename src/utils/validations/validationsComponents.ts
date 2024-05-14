import { calculateAge, validatePassword } from '../ageAndTextChecks';
import country from 'country-list-js';
import {
  postcodeValidator,
  postcodeValidatorExistsForCountry,
} from 'postcode-validator';
import * as dateComponents from '../../components/registrationForm/dateComponent';
import * as booleanValid from './booleanValid';
import {
  Components,
  billingComponents,
  shippingComponents,
} from '../../components/registrationForm/address/addressFactory';
import { searchPost } from './checkAddress';

// const countriesBillingList = billingComponents.listCountry;
// const countriesShippingList = shippingComponents.listCountry;
const components: Components = {
  billing: billingComponents,
  shipping: shippingComponents,
};

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
  err: HTMLSpanElement | null,
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
  const post = searchPost();
  console.log(post);

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
        booleanValid.setValidStatus(cityValid, false);
        booleanValid.setValidStatus(streetValid, false);
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
        booleanValid.setValidStatus(cityValid, false);
        booleanValid.setValidStatus(streetValid, false);
        booleanValid.checkAllInputs();
        streetErr.textContent = '';
        billingStreet.value = '';
        return false;
      }
    }
    if (!REGEX.lettersOnly.test(value)) {
      if (billingStreet instanceof HTMLInputElement) {
        booleanValid.setValidStatus(cityValid, false);
        booleanValid.setValidStatus(streetValid, false);
        booleanValid.checkAllInputs();
        billingStreet.setAttribute('disabled', '');
        streetErr.textContent = '';
        billingStreet.value = '';
        incorectValidation(err, ERROR_MESSAGES.onlyEnglishLetters);
        return false;
      }
    }
    incorectValidation(err, '');
    booleanValid.setValidStatus(cityValid, true);
    booleanValid.checkAllInputs();
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
  const streetValid: 'street-shipping' | 'street-billing' =
    type === 'shipping' ? 'street-shipping' : 'street-billing';
  if (err) {
    if (value.length === 0) {
      booleanValid.setValidStatus(streetValid, false);
      booleanValid.checkAllInputs();
      incorectValidation(err, '');
      return false;
    }
    if (value.length <= 1) {
      booleanValid.setValidStatus(streetValid, false);
      booleanValid.checkAllInputs();
      incorectValidation(err, ERROR_MESSAGES.shortInput);
      return false;
    }
    if (!REGEX.lettersAndNumbers.test(value)) {
      booleanValid.setValidStatus(streetValid, false);
      booleanValid.checkAllInputs();
      incorectValidation(err, ERROR_MESSAGES.onlyEnglishLetters);
      return false;
    }
    booleanValid.setValidStatus(streetValid, true);
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
export function checkNumber(
  this: HTMLInputElement,
  // err?: HTMLSpanElement | null,
): void {
  const parent = this.parentNode as HTMLLabelElement | null;
  const err = parent?.parentElement?.firstElementChild as HTMLSpanElement;
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

export function postCodeValidation(
  value: string,
  err?: HTMLSpanElement | null,
  type?: string | null,
): void {
  if (err && type) {
    const countryNames = country.names();
    const countryIndex = countryNames.indexOf(
      components[type].listCountry.textContent,
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
        booleanValid.setValidStatus(cityValid, false);
        booleanValid.setValidStatus(postValid, false);
        booleanValid.setValidStatus(streetValid, false);
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
          console.log(billingStreet);
          billingCity.setAttribute('disabled', '');
          billingStreet.setAttribute('disabled', '');
          booleanValid.setValidStatus(cityValid, false);
          booleanValid.setValidStatus(postValid, false);
          booleanValid.setValidStatus(streetValid, false);
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
      booleanValid.setValidStatus(postValid, true);
      booleanValid.checkAllInputs();
      billingCity.removeAttribute('disabled');
      incorectValidation(err, '');
      return;
    }
  }
}

// export function disableLocation(list: string): void {
//   if (list === 'billing') {
//     const billingStreet = billingComponents.inputStreet;
//     errors.errorBillingCityReg.textContent = '';
//     errors.errorBillingStreetReg.textContent = '';
//     errors.errorBillingPostReg.textContent = '';
//     billingStreet.setAttribute('disabled', '');
//     billingCity.setAttribute('disabled', '');
//     booleanValid.setValidStatus('city-billing', false);
//     booleanValid.setValidStatus('streetBilling', false);
//     booleanValid.checkAllInputs();
//     billingStreet.value = '';
//     billingPost.value = '';
//     billingCity.value = '';
//   } else if (list === 'shipping') {
//     // errors.errorShippingCityReg.textContent = '';
//     // errors.errorShippingStreetReg.textContent = '';
//     // errors.errorShippingPostReg.textContent = '';
//     shippingStreet.setAttribute('disabled', '');
//     shippingCity.setAttribute('disabled', '');
//     booleanValid.setValidStatus('cityShipping', false);
//     booleanValid.setValidStatus('streetShipping', false);
//     booleanValid.checkAllInputs();
//     shippingStreet.value = '';
//     shippingPost.value = '';
//     shippingCity.value = '';
//   }
// }
