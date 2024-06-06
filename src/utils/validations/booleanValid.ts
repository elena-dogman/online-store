import { authFormButton } from '../../components/registrationForm/registrationForm';
import { filterArray } from '../general/filterElem';

export let validStatus: { [key: string]: boolean } = {};

export function setValidStatus(
  field: keyof typeof validStatus,
  value: boolean,
): void {
  validStatus[field] = value;
}

export function checkAllInputs(form: HTMLFormElement | null = null): void {
  if (window.location.href.includes('register')) {
    if (Object.values(validStatus).every((value) => value)) {
      authFormButton.removeAttribute('disabled');
    } else {
      authFormButton.setAttribute('disabled', '');
    }
  } else if (window.location.href.includes('login')) {
    const submitButton = document.querySelector('.submit_button');
    if (Object.values(validStatus).every((value) => value)) {
      submitButton?.removeAttribute('disabled');
    } else {
      submitButton?.setAttribute('disabled', '');
    }
  } else if (window.location.href.includes('profile')) {
    const edit = document.querySelector('.profile-header__btn-edit');
    const save = document.querySelector('.password-form__save');
    const addAddress = document.querySelector(
      '.profile-header__btn-add-address',
    );

    if (!form?.classList.contains('modal__password-form')) {
      if (Object.values(validStatus).every((value) => value)) {
        edit?.removeAttribute('disabled');
        addAddress?.removeAttribute('disabled');
      } else {
        edit?.setAttribute('disabled', '');
        addAddress?.setAttribute('disabled', '');
      }
    } else {
      if (Object.values(validStatus).every((value) => value)) {
        save?.removeAttribute('disabled');
      } else {
        save?.setAttribute('disabled', '');
      }
    }
  }
}
export function fillObjectWithUniqueKeys(
  form: HTMLFormElement,
  value: boolean,
  existingData: { [key: string]: boolean },
  clearPrevious: boolean = false,
): void {
  if (clearPrevious) {
    existingData = {};
  }

  const formArray = filterArray(form);
  const obj = { ...existingData };
  let counter: number = 1;

  formArray.forEach((e, index) => {
    let key: string = index.toString();
    while (Object.prototype.hasOwnProperty.call(obj, key)) {
      counter++;
      key = index.toString() + counter;
    }
    if (key.includes('Chose Your Country')) {
      obj[key] = false;
    }
    if (key.includes('')) {
      obj[key] = false;
      console.log(e);
    }
    if (!obj[key]) {
      obj[key] = value;
    }

    counter = 1;
    if (e.value === 'Chose Your Country') {
      obj[key] = false;
    }
  });
  if (Object.keys(obj).length !== formArray.length) {
    while (Object.keys(obj).length > formArray.length) {
      delete obj[Object.keys(obj).pop()!];
    }
    while (Object.keys(obj).length < formArray.length) {
      obj[Object.keys(obj).length.toString()] = true;
    }
  }
  validStatus = obj;
}
