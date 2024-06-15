import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../utils/general/baseComponent';
import createRemoveIcon from '../../../utils/general/deleteIcon/deleteIcon';
import {
  fetchCartItems,
  removeItemFromCart,
  getActiveCart,
} from '../../../api/apiService';
import { LineItem } from '@commercetools/platform-sdk';
import {
  setupQuantityHandlers,
  updateTotalPriceUI,
  updateSubtotalPriceUI,
} from './quantity-handlers';
import { formatPrice } from '../../../utils/general/price-formatter';
import { showToast } from '../../toast/toast';
import { updateBasketCounter } from '../../header/header';
import { findElement } from '../../../utils/general/searchElem';
import { createEmptyMessage } from '../../../utils/general/createEmptyMessage';
import { createLoadingOverlay } from '../../overlay/loadingOverlay';
import { calculateSubtotal } from '../basket-pay/prices/getSubtotalPrice';

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
  const overlay = createLoadingOverlay();
  const basketProducts = createElement(basketProductsParams);
  const emptyMessage = createEmptyMessage();
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
    textContent: 'CLEAR CART',
  };
  const clearBasketBtn = createElement(clearBasketBtnParams);
  clearBasketBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const items = findElement(
      basketProducts,
      'basket-products__basket-products-item',
      true,
    ) as HTMLElement[];
    const onlineItems = await fetchCartItems();
    try {
      await onlineItems.reduce(async (previousPromise, cartItem, i) => {
        overlay.style.display = 'flex';
        await previousPromise;
        await removeItemFromCart(cartItem.id);
        updateBasketCounter();
        items[i].remove();
      }, Promise.resolve());
      overlay.style.display = 'none';
    } catch (error) {
      showToast(error);
    }

    addInnerComponent(basketProducts, emptyMessage);
    updateTotalPriceUI(0);
    updateSubtotalPriceUI(0);
  });

  addInnerComponent(basketProducts, basketProductsTitle);
  addInnerComponent(basketProducts, clearBasketBtn);

  if (cartItems.length === 0) {
    addInnerComponent(basketProducts, emptyMessage);
  } else {
    cartItems.forEach((item) => {
      const productElement = createBasketProductsItem(item, emptyMessage);
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
  addInnerComponent(basketProducts, overlay);
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
function createBasketProductsItem(
  item: LineItem,
  emptyMessage: HTMLElement,
): BasketProductsItem {
  const basketProductsItemParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['basket-products__basket-products-item'],
  };
  const basketProductsItem = createElement(basketProductsItemParams);

  let size = '';
  if (item.variant.attributes) {
    item.variant.attributes.forEach((attribute) => {
      if (attribute.name === 'size' && Array.isArray(attribute.value)) {
        size = attribute.value[0];
      }
    });
  }

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
  const basketItemSizeParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['basket-products-item__item-description-size'],
    textContent: `Size: ${size.toString()}`,
  };
  const basketItemSize = createElement(basketItemSizeParams);
  addInnerComponent(basketItemDescriptionTitle, basketItemSize);
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
  const totalItemPrice = formatPrice(getDiscountedPrice(item) / 100);

  const basketItemUnitPriceParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['item-count-container__unit-price'],
    textContent: `Price: ${unitPrice}`,
  };
  const basketItemUnitPrice = createElement(basketItemUnitPriceParams);

  const basketItemTotalPriceParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['item-count-container__total-price'],
    textContent: `Total: ${totalItemPrice}`,
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
        addInnerComponent(parent, emptyMessage);
      }
      try {
        updateBasketCounter();

        const activeCart = await getActiveCart();
        if (activeCart) {
          const totalCartPrice = activeCart.totalPrice?.centAmount ?? 0;
          const subtotal = calculateSubtotal(activeCart);

          updateTotalPriceUI(totalCartPrice);
          updateSubtotalPriceUI(subtotal);
        }
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
