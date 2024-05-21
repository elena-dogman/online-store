import { authFormButton } from '../../components/registrationForm/registrationForm';

export const validStatus = {
  name: false,
  lastName: false,
  password: false,
  mail: false,
  date: false,
  'post-billing': false,
  'city-billing': false,
  'street-billing': false,
  'post-shipping': false,
  'city-shipping': false,
  'street-shipping': false,
};

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
    if (validStatus.mail && validStatus.password) {
      submitButton?.removeAttribute('disabled');
    } else {
      submitButton?.setAttribute('disabled', '');
    }
  }
}
