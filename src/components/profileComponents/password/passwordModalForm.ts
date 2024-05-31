import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../utils/baseComponent';
import { createInput } from '../../../utils/createInput';

export function addPasswordModal(): HTMLElement {
  const app = document.querySelector('#app') as HTMLElement;
  const passwordModalParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['modal__change-password', 'modal_container'],
  };
  const passwordModal = createElement(passwordModalParams);

  const passwordFormParams: ElementParams<'form'> = {
    tag: 'form',
    classNames: ['modal__password-form'],
  };
  const formTitleParams: ElementParams<'h2'> = {
    tag: 'h2',
    classNames: ['password-form__title'],
    textContent: 'Enter your new Password',
  };
  const formTitle = createElement(formTitleParams);
  const passwrodForm = createElement(passwordFormParams);
  const [newPasswordLabel, newPassordInput] = createInput(
    'password',
    [
      ['new-password-label', 'prof-label'],
      ['new-passwrod-input', 'prof-input'],
    ],
    'password',
    'password',
  );
  const [confirmPasswordLabel, confirmPassordInput] = createInput(
    'password',
    [
      ['confirm-password-label', 'prof-label'],
      ['confirm-passwrod-input', 'prof-input'],
    ],
    'password',
    'password',
  );
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
  };
  const buttonsContainer = createElement(buttonsContainerParams);
  const buttonClose = createElement(buttonCloseParams);
  buttonClose.addEventListener('click', () => {
    passwordModal.remove();
  });
  const buttonSave = createElement(buttonSaveParams);
  addInnerComponent(buttonsContainer, buttonClose);
  addInnerComponent(buttonsContainer, buttonSave);
  if (app) {
    addInnerComponent(app, passwordModal);
    addInnerComponent(passwordModal, passwrodForm);
    addInnerComponent(passwrodForm, formTitle);
    addInnerComponent(passwrodForm, newPasswordLabel);
    addInnerComponent(newPasswordLabel, newPassordInput);
    addInnerComponent(passwrodForm, confirmPasswordLabel);
    addInnerComponent(confirmPasswordLabel, confirmPassordInput);
    addInnerComponent(passwrodForm, buttonsContainer);
  }
  return passwordModal;
}
