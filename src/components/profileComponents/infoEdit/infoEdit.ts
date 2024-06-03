import {
  ElementParams,
  createElement,
} from '../../../utils/general/baseComponent';
import { showClick } from './infoEditComponents';

export async function createEdit(): Promise<HTMLElement> {
  const infoHeaderButtonParams: ElementParams<'button'> = {
    tag: 'button',
    classNames: ['profile-header__btn-edit', 'profile-btn'],
    textContent: 'Edit',
    attributes: { form: 'profile-form' },
  };
  const showClickHandler = (e: Event): void => {
    e.preventDefault();
    showClick(e);
  };
  const infoEditButton = createElement(infoHeaderButtonParams);
  infoEditButton.addEventListener('click', showClickHandler);

  return infoEditButton;
}
