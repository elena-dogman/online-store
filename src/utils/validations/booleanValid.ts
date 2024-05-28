import { authFormButton } from '../../components/registrationForm/registrationForm';
import { filterArray } from './validationsComponents';

export let validStatus: { [key: string]: boolean } = {};

export function setValidStatus(
  field: keyof typeof validStatus,
  value: boolean,
): void {
  validStatus[field] = value;
}

export function checkAllInputs(): void {
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
    if (Object.values(validStatus).every((value) => value)) {
      edit?.removeAttribute('disabled');
    } else {
      edit?.setAttribute('disabled', '');
    }
  }
}
export function fillObjectWithUniqueKeys(
  form: HTMLFormElement,
  value: boolean,
  existingData: { [key: string]: boolean },
): void {
  const formArray = filterArray(form);

  const obj = { ...existingData };
  let counter: number = 1;

  formArray.forEach((_, index) => {
    let key: string = index.toString();

    while (Object.prototype.hasOwnProperty.call(obj, key)) {
      counter++;
      key = index.toString() + counter;
    }

    if (!obj[key]) {
      obj[key] = value;
    }

    counter = 1;
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
