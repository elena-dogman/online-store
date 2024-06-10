import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../utils/general/baseComponent';

export default function buildBusketContainer(): HTMLElement {
  const basketContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['basket-page__basket-container'],
  };
  const basketWrapperParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['basket-container__basket-wrapper'],
  };
  const basketContainer = createElement(basketContainerParams);
  const basketWraper = createElement(basketWrapperParams);
  addInnerComponent(basketContainer, basketWraper);
  return basketContainer;
}
