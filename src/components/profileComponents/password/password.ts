import { ElementParams, createElement } from '../../../utils/baseComponent';
import { addPasswordModal } from './passwordModalForm';

export function buildPasswordBtn(): HTMLElement {
  const passwordButtonParams: ElementParams<'button'> = {
    tag: 'button',
    classNames: ['profile-header__btn-password', 'profile-btn'],
    textContent: 'Password Edit',
  };
  const passwordButton = createElement(passwordButtonParams);
  passwordButton.addEventListener('click', addPasswordModal);
  return passwordButton;
}
