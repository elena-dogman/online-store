import { createElement, ElementParams } from '../../utils/baseComponent';
import { createHeader } from '../../components/header/header';

export function createMainPage(): HTMLElement {
  const containerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['main-page-wrapper'],
  };

  const container = createElement(containerParams);
  const header = createHeader();

  container.appendChild(header);

  return container;
}
