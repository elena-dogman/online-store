import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../utils/general/baseComponent';
import createBasketProductsList from './basket-list/basket-products-list';

export default function createBasketProductsContainer(): HTMLElement {
  const basketProductsPapams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['basket-wrapper__basket-products'],
  };
  const basketProducts = createElement(basketProductsPapams);

  const basketProductsTitlePapams: ElementParams<'h2'> = {
    tag: 'h2',
    classNames: ['basket-products__products-title'],
    textContent: 'Shopping Cart',
  };
  const basketProductsTitle = createElement(basketProductsTitlePapams);

  const basketProductsList = createBasketProductsList();

  addInnerComponent(basketProducts, basketProductsTitle);
  addInnerComponent(basketProducts, basketProductsList);

  return basketProducts;
}
