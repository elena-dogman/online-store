import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../utils/general/baseComponent';
import createBasketPayContainer from './basket-pay/basketPay';
import createBasketProductsContainer from './basket-products/basket-products';

export default async function buildBasketContainer(): Promise<HTMLElement> {
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

  const basketProducts = await createBasketProductsContainer();
  const basketPay = createBasketPayContainer();

  addInnerComponent(basketWraper, basketProducts);
  addInnerComponent(basketWraper, basketPay);

  return basketContainer;
}