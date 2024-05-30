import { ElementParams, createElement } from '../../../utils/baseComponent';
import { showClick } from './infoEditComponents';

export function createEdit(): HTMLElement {
  const infoHeaderButtonParams: ElementParams<'button'> = {
    tag: 'button',
    classNames: ['profile-header__btn-edit'],
    textContent: 'Edit',
    attributes: { form: 'profile-form' },
  };
  const infoHeaderButton = createElement(infoHeaderButtonParams);
  infoHeaderButton.addEventListener('click', showClick);
  return infoHeaderButton;
}
