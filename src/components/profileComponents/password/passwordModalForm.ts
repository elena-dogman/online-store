import { Customer, CustomerChangePassword } from '@commercetools/platform-sdk';
import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../utils/baseComponent';
import { createInput } from '../../../utils/createInput';
import { changePassword } from '../../../api/apiService';

export function addPasswordModal(userData: Customer): HTMLElement {
  const app = document.querySelector('#app') as HTMLElement;
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
  const passwordForm = createElement(passwordFormParams);
  const [currentPasswordLabel, currentPasswordInput] = createInput(
    'current-password',
    [
      ['current-password-label', 'prof-label'],
      ['current-passwrod-input', 'prof-input'],
    ],
    'text',
    'text',
  );
  currentPasswordLabel.textContent = 'Current password';
  const [newPasswordLabel, newPasswordInput] = createInput(
    'confirm-password',
    [
      ['new-password-label', 'prof-label'],
      ['new-passwrod-input', 'prof-input'],
    ],
    'text',
    'text',
  );
  newPasswordLabel.textContent = 'new Password';
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
    attributes: { form: 'change-password-form' },
  };
  const buttonsContainer = createElement(buttonsContainerParams);
  const buttonClose = createElement(buttonCloseParams);
  const buttonSave = createElement(buttonSaveParams);
  buttonClose.addEventListener('click', () => {
    passwordModal.remove();
    console.log(userData.password);
  });
  buttonSave.addEventListener('click', () => {
    passwordModal.remove();
    const body: CustomerChangePassword = {
      id: userData.id,
      version: userData.version,
      currentPassword: currentPasswordInput.value,
      newPassword: newPasswordInput.value,
    };
    changePassword(userData, body);
  });
  addInnerComponent(buttonsContainer, buttonClose);
  addInnerComponent(buttonsContainer, buttonSave);
  if (app) {
    addInnerComponent(app, passwordModal);
    addInnerComponent(passwordModal, passwordForm);
    addInnerComponent(passwordForm, formTitle);
    addInnerComponent(passwordForm, currentPasswordLabel);
    addInnerComponent(currentPasswordLabel, currentPasswordInput);
    addInnerComponent(passwordForm, newPasswordLabel);
    addInnerComponent(newPasswordLabel, newPasswordInput);
    addInnerComponent(passwordForm, buttonsContainer);
  }
  return passwordModal;
}
