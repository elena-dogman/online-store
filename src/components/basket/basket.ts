import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../utils/general/baseComponent';
import createBasketPayContainer from './basket-pay/basket-pay';
import createBasketProductsContainer from './basket-products/basket-products';

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

  const basketProducts = createBasketProductsContainer();
  const basketPay = createBasketPayContainer();

  addInnerComponent(basketWraper, basketProducts);
  addInnerComponent(basketWraper, basketPay);

  return basketContainer;
}
