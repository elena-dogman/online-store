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

  return container;
}
