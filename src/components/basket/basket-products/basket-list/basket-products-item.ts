import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../../utils/general/baseComponent';
import createRemoveIcon from '../../../../utils/general/deleteIcon/deleteIcon';
interface BasketItem {
  name: string;
  img: string;
  id: string;
  count: string;
  price: string;
}
export default function createBasketProductsItem(
  config: BasketItem,
): HTMLElement {
  const basketProductsItemPapams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['basket-products__basket-products-item'],
  };
  const basketProductsItem = createElement(basketProductsItemPapams);

  const basketItemImgParams: ElementParams<'img'> = {
    tag: 'img',
    classNames: ['basket-products-item__item-img'],
    attributes: {
      alt: 'basket product image',
      src: config.img,
    },
  };
  const basketItemImg = createElement(basketItemImgParams);

  const basketItemDescriptionContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['basket-products-item__item-description-container'],
  };

  const basketItemDescriptionContainer = createElement(
    basketItemDescriptionContainerParams,
  );
  const basketItemDescriptionTitleParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['basket-products-item__item-description-title'],
    textContent: config.name,
  };

  const basketItemDescriptionTitle = createElement(
    basketItemDescriptionTitleParams,
  );

  const basketItemDescriptionIdParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['basket-products-item__item-description-id'],
    textContent: config.id,
  };

  const basketItemDescriptionId = createElement(basketItemDescriptionIdParams);

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
    textContent: config.count,
  };
  const basketItemCountView = createElement(basketItemCountViewParams);

  const basketItemCountPriceParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['item-count-container__count-price'],
    textContent: config.price,
  };
  const basketItemCountPrice = createElement(basketItemCountPriceParams);

  const removeIcon = createRemoveIcon('basket-products');
  addInnerComponent(basketProductsItem, basketItemImg);
  addInnerComponent(basketProductsItem, basketItemDescriptionContainer);
  addInnerComponent(basketItemDescriptionContainer, basketItemDescriptionTitle);
  addInnerComponent(basketItemDescriptionContainer, basketItemDescriptionId);
  addInnerComponent(basketProductsItem, basketItemCountContainer);
  addInnerComponent(basketItemCountContainer, basketItemCountSubtract);
  addInnerComponent(basketItemCountContainer, basketItemCountView);
  addInnerComponent(basketItemCountContainer, basketItemCountAdd);
  addInnerComponent(basketItemCountContainer, basketItemCountPrice);
  addInnerComponent(basketItemCountContainer, removeIcon);
  return basketProductsItem;
}
