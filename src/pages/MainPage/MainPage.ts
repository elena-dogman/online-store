import {
  addInnerComponent,
  createElement,
  ElementParams,
} from '../../utils/general/baseComponent';
import { createHeader } from '../../components/header/header';
import { createHero } from '../../components/mainPageComponents/hero';

export function createMainPage(): HTMLElement {
  const pageContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['main-page-wrapper'],
  };
  const container = createElement(pageContainerParams);

  const header = createHeader();
  addInnerComponent(container, header);

  const hero = createHero();
  addInnerComponent(container, hero);

  return container;
}
