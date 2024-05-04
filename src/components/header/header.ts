import { addInnerComponent, createElement, ElementParams } from '../../utils/baseComponent';

export function createHeader(): HTMLElement {
  const headerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['header'],
  };
  const header = createElement(headerParams);

  const linkParams: ElementParams<'a'> = {
    tag: 'a',
    attributes: {
      href: '/',
    },
    classNames: ['logo-link'],
  };
  const logoLink = createElement(linkParams);

  const logoParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['logo'],
    textContent: '・valenki store・',
  };
  const logo = createElement(logoParams);

  addInnerComponent(logoLink, logo);
  addInnerComponent(header, logoLink);

  return header;
}