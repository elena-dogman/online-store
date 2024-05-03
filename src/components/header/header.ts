import { createElement, ElementParams } from '../../utils/baseComponent';

export function createHeader(): HTMLElement {
  const headerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['main-header'],
    textContent: 'Welcome to valenki store!',
  };

  const header = createElement(headerParams);
  return header;
}
