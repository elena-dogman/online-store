import { Customer } from '@commercetools/platform-sdk';
import {
  ElementParams,
  createElement,
} from '../../../utils/usefullFunctions/baseComponent';
import { showClick } from './infoEditComponents';

export function createEdit(userData: Customer): HTMLElement {
  const infoHeaderButtonParams: ElementParams<'button'> = {
    tag: 'button',
    classNames: ['profile-header__btn-edit', 'profile-btn'],
    textContent: 'Edit',
    attributes: { form: 'profile-form' },
  };
  const showClickHandler = (e: Event): void => {
    showClick(e, userData);
  };
  const infoHeaderButton = createElement(infoHeaderButtonParams);
  infoHeaderButton.addEventListener('click', showClickHandler);

  return infoHeaderButton;
}
