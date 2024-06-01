import { Customer, CustomerChangePassword } from '@commercetools/platform-sdk';
import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../utils/usefullFunctions/baseComponent';
import { createInput } from '../../../utils/usefullFunctions/createInput';
import { changePassword } from '../../../api/apiService';
import { createErrorElement } from '../../../utils/validations/validationsErrors';
import { validateInput } from '../../../utils/validations/validation';
import {
  fillObjectWithUniqueKeys,
  validStatus,
} from '../../../utils/validations/booleanValid';
import { searchInput } from '../../../utils/usefullFunctions/searchElem';

export function addPasswordModal(userData: Customer): HTMLElement {
  const app = document.querySelector('#app') as HTMLElement;
  const profileForm = app.querySelector(
    '.profile-container__profile-form',
  ) as HTMLFormElement;
  const passwordModalParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['modal__change-password', 'modal_container'],
  };
  const passwordModal = createElement(passwordModalParams);

  const passwordFormParams: ElementParams<'form'> = {
    tag: 'form',
    classNames: ['modal__password-form'],
    attributes: { id: 'change-password-form' },
  };
  const formTitleParams: ElementParams<'h2'> = {
    tag: 'h2',
    classNames: ['password-form__title'],
    textContent: 'Enter your new Password',
  };
  const formTitle = createElement(formTitleParams);
  const passwordForm = createElement(passwordFormParams) as HTMLFormElement;
  const [currentPasswordLabel, currentPasswordInput] = createInput(
    'current-password',
    [
      ['current-password-label', 'prof-label'],
      ['current-passwrod-input', 'prof-input'],
    ],
    'password',
    'password',
  );
  const currentPasswordIconParams: ElementParams<'img'> = {
    tag: 'img',
    attributes: {
      src: '/assets/authpage/hide.png',
      alt: 'make your password visible/hide',
      title: 'Click to make your password visible',
    },
    classNames: ['password_icon', 'change-password-icon'],
  };

  const currentPasswordIcon = createElement(
    currentPasswordIconParams,
  ) as HTMLImageElement;
  currentPasswordIcon.addEventListener('click', showPassword);
  const currentPasswordError = createErrorElement();
  currentPasswordInput.addEventListener('input', validateInput);
  currentPasswordLabel.textContent = 'Current Password';
  const [newPasswordLabel, newPasswordInput] = createInput(
    'confirm-password',
    [
      ['new-password-label', 'prof-label'],
      ['new-passwrod-input', 'prof-input'],
    ],
    'password',
    'password',
  );
  const newPasswordIconParams: ElementParams<'img'> = {
    tag: 'img',
    attributes: {
      src: '/assets/authpage/hide.png',
      alt: 'make your password visible/hide',
      title: 'Click to make your password visible',
    },
    classNames: ['password_icon', 'change-password-icon'],
  };

  const newPasswordIcon = createElement(
    newPasswordIconParams,
  ) as HTMLImageElement;
  newPasswordIcon.addEventListener('click', showPassword);
  newPasswordLabel.textContent = 'New Password';
  newPasswordInput.addEventListener('input', validateInput);
  const newPasswordError = createErrorElement();
  const buttonsContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['password-form__btn-container'],
  };
  const buttonCloseParams: ElementParams<'button'> = {
    tag: 'button',
    classNames: ['password-form__close', 'profile-btn'],
    textContent: 'Close',
  };
  const buttonSaveParams: ElementParams<'button'> = {
    tag: 'button',
    classNames: ['password-form__save', 'profile-btn'],
    textContent: 'Save',
    attributes: { form: 'change-password-form', disabled: '' },
  };
  const buttonsContainer = createElement(buttonsContainerParams);
  const buttonClose = createElement(buttonCloseParams);
  const buttonSave = createElement(buttonSaveParams);
  buttonClose.addEventListener('click', (e) => {
    e.preventDefault();
    passwordModal.remove();
    fillObjectWithUniqueKeys(profileForm, true, validStatus, true);
  });
  buttonSave.addEventListener('click', (e) => {
    e.preventDefault();
    passwordModal.remove();
    const body: CustomerChangePassword = {
      id: userData.id,
      version: userData.version,
      currentPassword: currentPasswordInput.value,
      newPassword: newPasswordInput.value,
    };
    changePassword(userData, body);
    fillObjectWithUniqueKeys(profileForm, true, validStatus, true);
  });
  addInnerComponent(buttonsContainer, buttonClose);
  addInnerComponent(buttonsContainer, buttonSave);
  if (app) {
    addInnerComponent(app, passwordModal);
    addInnerComponent(passwordModal, passwordForm);
    addInnerComponent(passwordForm, formTitle);
    addInnerComponent(passwordForm, currentPasswordLabel);
    addInnerComponent(currentPasswordLabel, currentPasswordInput);
    addInnerComponent(currentPasswordLabel, currentPasswordError);
    addInnerComponent(currentPasswordLabel, newPasswordIcon);
    addInnerComponent(passwordForm, newPasswordLabel);
    addInnerComponent(newPasswordLabel, newPasswordInput);
    addInnerComponent(newPasswordLabel, newPasswordError);
    addInnerComponent(newPasswordLabel, currentPasswordIcon);
    addInnerComponent(passwordForm, buttonsContainer);
    fillObjectWithUniqueKeys(passwordForm, false, validStatus, true);
  }
  return passwordModal;
}
function showPassword(e: Event): void {
  e.preventDefault();
  const elem = e.target as HTMLElement;
  const lable = elem.parentElement as HTMLElement;
  const input = searchInput(lable) as HTMLInputElement;
  if (input.getAttribute('type') === 'password') {
    input.setAttribute('type', 'text');
    elem.setAttribute('src', '/assets/authpage/show.png');
    elem.setAttribute('title', 'Click to hide your password');
  } else {
    input.setAttribute('type', 'password');
    elem.setAttribute('src', '/assets/authpage/hide.png');
    elem.setAttribute('title', 'Click to make your password visible');
  }
}
