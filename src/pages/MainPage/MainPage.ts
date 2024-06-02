import {
  addInnerComponent,
  createElement,
  ElementParams,
} from '../../utils/general/baseComponent';
import { createHeader } from '../../components/header/header';

export function createMainPage(): HTMLElement {
  const pageContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['main-page-wrapper'],
  };
  const container = createElement(pageContainerParams);

  const header = createHeader();
  addInnerComponent(container, header);

  const buttonsContainer = createElement({
    tag: 'div',
    classNames: ['buttons-for-reviewer'],
  });

  const loginButton = createElement({
    tag: 'a',
    attributes: { href: '/login' },
    classNames: ['button-for-reviewer', 'login-button'],
    textContent: 'Log In',
  });

  const registerButton = createElement({
    tag: 'a',
    attributes: { href: '/register' },
    classNames: ['button-for-reviewer', 'register-button'],
    textContent: 'Register',
  });

  addInnerComponent(buttonsContainer, loginButton);
  addInnerComponent(buttonsContainer, registerButton);
  addInnerComponent(container, buttonsContainer);

  return container;
}
