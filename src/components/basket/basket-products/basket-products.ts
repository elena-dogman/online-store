import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../utils/general/baseComponent';
import createRemoveIcon from '../../../utils/general/deleteIcon/deleteIcon';
import { fetchCartItems } from '../../../api/apiService';

interface BasketItem {
  name: string;
  img: string;
  id: string;
  count: string;
  price: string;
  totalPrice: string;
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
    let totalPrice = 0;

    cartItems.forEach(item => {
      const itemTotalPrice = (item.price.value.centAmount * item.quantity) / 100;
      totalPrice += itemTotalPrice;

      const productElement = createBasketProductsItem({
        name: item.name['en-US'],
        img: item.variant.images?.[0]?.url || 'default-image-url',
        id: item.id,
        count: item.quantity.toString(),
        price: `$${(item.price.value.centAmount / 100).toFixed(2)}`,
        totalPrice: `$${itemTotalPrice.toFixed(2)}`,
      });
      addInnerComponent(basketProducts, productElement);
    });

    const totalElement = createElement({
      tag: 'div',
      classNames: ['basket-products__total'],
      textContent: `Total: $${totalPrice.toFixed(2)}`,
    });
    addInnerComponent(basketProducts, totalElement);
  }

  return basketProducts;
}

function createBasketProductsItem(config: BasketItem): HTMLElement {
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
      src: config.img,
    },
  };
  const basketItemImg = createElement(basketItemImgParams);

  const basketItemDescriptionTitleParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['basket-products-item__item-description-title'],
    textContent: config.name,
  };
  const basketItemDescriptionTitle = createElement(basketItemDescriptionTitleParams);

  addInnerComponent(basketItemWrapper, basketItemImg);
  addInnerComponent(basketItemWrapper, basketItemDescriptionTitle);

  const basketItemDescriptionContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['basket-products-item__item-description-container'],
  };
  const basketItemDescriptionContainer = createElement(basketItemDescriptionContainerParams);

  const basketItemCountContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['basket-products-item__item-count-container'],
  };
  const basketItemCountContainer = createElement(basketItemCountContainerParams);

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
    textContent: config.count,
  };
  const basketItemCountView = createElement(basketItemCountViewParams);

  const basketItemCountPriceParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['item-count-container__count-price'],
    textContent: config.price,
  };
  const basketItemCountPrice = createElement(basketItemCountPriceParams);

  const basketItemTotalPriceParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['item-count-container__count-total'],
    textContent: `Total: ${config.totalPrice}`,
  };
  const basketItemTotalPrice = createElement(basketItemTotalPriceParams);

  const removeIcon = createRemoveIcon('basket-products');

  addInnerComponent(basketProductsItem, basketItemWrapper);
  addInnerComponent(basketProductsItem, basketItemDescriptionContainer);
  addInnerComponent(basketProductsItem, basketItemCountContainer);
  addInnerComponent(basketItemCountContainer, basketItemCountSubtract);
  addInnerComponent(basketItemCountContainer, basketItemCountView);
  addInnerComponent(basketItemCountContainer, basketItemCountAdd);
  addInnerComponent(basketItemCountContainer, basketItemCountPrice);
  addInnerComponent(basketItemCountContainer, basketItemTotalPrice);
  addInnerComponent(basketItemCountContainer, removeIcon);

  return basketProductsItem;
}
