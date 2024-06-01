import { Customer } from '@commercetools/platform-sdk';
import {
  ElementParams,
  createElement,
} from '../../../utils/usefullFunctions/baseComponent';
import { addPasswordModal } from './passwordModalForm';

export function buildPasswordBtn(userData: Customer): HTMLElement {
  const passwordButtonParams: ElementParams<'button'> = {
    tag: 'button',
    classNames: ['profile-header__btn-password', 'profile-btn'],
    textContent: 'Password Change',
  };
  const passwordButton = createElement(passwordButtonParams);
  const addPasswordModalHandler = (): void => {
    addPasswordModal(userData);
  };
  passwordButton.addEventListener('click', addPasswordModalHandler);
  return passwordButton;
}
