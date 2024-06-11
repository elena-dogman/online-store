import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../utils/general/baseComponent';
import createRemoveIcon from '../../../utils/general/deleteIcon/deleteIcon';
import { fetchCartItems, removeItemFromCart } from '../../../api/apiService';
import { LineItem } from '@commercetools/platform-sdk';
import { setupQuantityHandlers } from './quantity-handlers';
import { formatPrice } from '../../../utils/general/price-formatter';

interface BasketProductsItem {
  element: HTMLElement;
  countView: HTMLElement;
  totalPriceElement: HTMLElement;
  countSubtract: HTMLElement;
  countAdd: HTMLElement;
}

export default async function createBasketProductsContainer(): Promise<HTMLElement> {
  const basketProductsParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['basket-wrapper__basket-products'],
  };
  const basketProducts = createElement(basketProductsParams);

  const basketProductsTitleParams: ElementParams<'h2'> = {
    tag: 'h2',
    classNames: ['basket-products__products-title'],
    textContent: 'Shopping Cart',
  };
  const basketProductsTitle = createElement(basketProductsTitleParams);

  const cartItems = await fetchCartItems();

  addInnerComponent(basketProducts, basketProductsTitle);

  if (cartItems.length === 0) {
    const emptyMessage = createElement({
      tag: 'p',
      classNames: ['basket-products__empty-message'],
      textContent: 'Your cart is empty.',
    });
    addInnerComponent(basketProducts, emptyMessage);
  } else {
    cartItems.forEach((item) => {
      const productElement = createBasketProductsItem(item);
      addInnerComponent(basketProducts, productElement.element);
      setupQuantityHandlers(
        productElement.countView,
        productElement.totalPriceElement,
        productElement.countSubtract,
        productElement.countAdd,
        item.id,
        item.quantity,
        item.price.value.centAmount / 100,
      );
    });
  }

  return basketProducts;
}

function createBasketProductsItem(item: LineItem): BasketProductsItem {
  const basketProductsItemParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['basket-products__basket-products-item'],
  };
  const basketProductsItem = createElement(basketProductsItemParams);

  const basketItemWrapperParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['basket-products-item__item-wrapper'],
  };
  const basketItemWrapper = createElement(basketItemWrapperParams);

  const basketItemImgParams: ElementParams<'img'> = {
    tag: 'img',
    classNames: ['basket-products-item__item-img'],
    attributes: {
      alt: 'basket product image',
      src: item.variant.images?.[0]?.url || 'assets/basket/default.jpg',
    },
  };
  const basketItemImg = createElement(basketItemImgParams);

  const productName = item.name['en-US'] || 'No name available';

  const basketItemDescriptionTitleParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['basket-products-item__item-description-title'],
    textContent: productName,
  };
  const basketItemDescriptionTitle = createElement(
    basketItemDescriptionTitleParams,
  );

  addInnerComponent(basketItemWrapper, basketItemImg);
  addInnerComponent(basketItemWrapper, basketItemDescriptionTitle);
  const basketItemCountContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['basket-products-item__item-count-container'],
  };
  const basketItemCountContainer = createElement(
    basketItemCountContainerParams,
  );

  const basketItemCountSubtractParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['item-count-container__count-subtract'],
    textContent: '-',
  };
  const basketItemCountSubtract = createElement(basketItemCountSubtractParams);

  const basketItemCountAddParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['item-count-container__count-add'],
    textContent: '+',
  };
  const basketItemCountAdd = createElement(basketItemCountAddParams);

  const basketItemCountViewParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['item-count-container__count-view'],
    textContent: item.quantity.toString(),
  };
  const basketItemCountView = createElement(basketItemCountViewParams);

  const basketItemPriceContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['item-count-container__price-container'],
  };
  const basketItemPriceContainer = createElement(
    basketItemPriceContainerParams,
  );

  const unitPrice = formatPrice(item.price.value.centAmount / 100);
  const totalPrice = formatPrice(
    (item.price.value.centAmount * item.quantity) / 100,
  );

  const basketItemUnitPriceParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['item-count-container__unit-price'],
    textContent: `Price: ${unitPrice}`,
  };
  const basketItemUnitPrice = createElement(basketItemUnitPriceParams);

  const basketItemTotalPriceParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['item-count-container__total-price'],
    textContent: `Total: ${totalPrice}`,
  };
  const basketItemTotalPrice = createElement(basketItemTotalPriceParams);

  addInnerComponent(basketItemPriceContainer, basketItemUnitPrice);
  addInnerComponent(basketItemPriceContainer, basketItemTotalPrice);

  const removeIcon = createRemoveIcon('basket-products');
  removeIcon.addEventListener('click', async () => {
    const success = await removeItemFromCart(item.id);
    if (success) {
      basketProductsItem.remove();
    }
  });

  addInnerComponent(basketProductsItem, basketItemWrapper);
  addInnerComponent(basketProductsItem, basketItemCountContainer);
  addInnerComponent(basketItemCountContainer, basketItemCountSubtract);
  addInnerComponent(basketItemCountContainer, basketItemCountView);
  addInnerComponent(basketItemCountContainer, basketItemCountAdd);
  addInnerComponent(basketProductsItem, basketItemPriceContainer);
  addInnerComponent(basketProductsItem, removeIcon);

  return {
    element: basketProductsItem,
    countView: basketItemCountView,
    totalPriceElement: basketItemTotalPrice,
    countSubtract: basketItemCountSubtract,
    countAdd: basketItemCountAdd,
  };
}
