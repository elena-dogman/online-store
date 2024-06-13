import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../utils/general/baseComponent';
import createRemoveIcon from '../../../utils/general/deleteIcon/deleteIcon';
import { fetchCartItems, removeItemFromCart } from '../../../api/apiService';
import { LineItem } from '@commercetools/platform-sdk';
import { setupQuantityHandlers, updateTotalPriceUI } from './quantity-handlers';
import { formatPrice } from '../../../utils/general/price-formatter';
import { showToast } from '../../toast/toast';
import { updateBasketCounter } from '../../header/header';
import { findElement } from '../../../utils/general/searchElem';
import { createEmptyMessage } from '../../../utils/general/createEmptyMessage';

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
  const clearBasketBtnParams: ElementParams<'button'> = {
    tag: 'button',
    classNames: ['basket-products__clear-basket-btn'],
    textContent: 'CLEAR BASKET',
  };
  const clearBasketBtn = createElement(clearBasketBtnParams);
  clearBasketBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const items = findElement(
      basketProducts,
      'basket-products__basket-products-item',
      true,
    ) as HTMLElement[];
    console.log(items);
    const onlineItems = await fetchCartItems();
    await onlineItems.reduce(async (previousPromise, cartItem, i) => {
      await previousPromise;
      await removeItemFromCart(cartItem.id);
      items[i].remove();
    }, Promise.resolve());
    const emptyMessage = createEmptyMessage();
    addInnerComponent(basketProducts, emptyMessage);
    updateTotalPriceUI(0);
  });

  addInnerComponent(basketProducts, basketProductsTitle);
  addInnerComponent(basketProducts, clearBasketBtn);

  if (cartItems.length === 0) {
    const emptyMessage = createEmptyMessage();
    addInnerComponent(basketProducts, emptyMessage);
  } else {
    cartItems.forEach((item) => {
      const productElement = createBasketProductsItem(item);
      addInnerComponent(basketProducts, productElement.element);
      const price = getSingleItemPrice(item) / 100;
      setupQuantityHandlers(
        productElement.countView,
        productElement.totalPriceElement,
        productElement.countSubtract,
        productElement.countAdd,
        item.id,
        item.quantity,
        price,
      );
      if (item.quantity === 1) {
        productElement.countSubtract.classList.add('hidden');
      } else {
        productElement.countSubtract.classList.remove('hidden');
      }
    });
  }

  return basketProducts;
}

function getDiscountedPrice(item: LineItem): number {
  return item.totalPrice
    ? item.totalPrice.centAmount
    : item.price.value.centAmount;
}
function getSingleItemPrice(item: LineItem): number {
  return item.price.discounted?.value.centAmount
    ? item.price.discounted?.value.centAmount
    : item.price.value.centAmount;
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

  const unitPrice = formatPrice(getSingleItemPrice(item) / 100);
  const totalPrice = formatPrice(getDiscountedPrice(item) / 100);

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
    const parent = basketProductsItem.parentElement as HTMLElement;
    const items = findElement(
      parent,
      'basket-products__basket-products-item',
      true,
    ) as HTMLElement[];

    if (success) {
      basketProductsItem.remove();
      if (items.length === 1) {
        console.log(1);
        const emptyMessage = createEmptyMessage();
        addInnerComponent(parent, emptyMessage);
      }
      try {
        const newItems = await fetchCartItems();
        updateBasketCounter();
        let newTotalPrice = 0;
        newItems.forEach((price) => {
          if (price.totalPrice && price.totalPrice.centAmount) {
            newTotalPrice += price.totalPrice.centAmount;
          }
        });
        updateTotalPriceUI(newTotalPrice);
      } catch (error) {
        showToast(error);
      }
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
