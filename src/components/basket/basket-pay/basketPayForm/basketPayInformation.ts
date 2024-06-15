import { createElement, ElementParams, addInnerComponent } from '../../../../utils/general/baseComponent';
import { formatPrice } from '../../../../utils/general/price-formatter';

export default function createBasketPayInformation(totalPrice: number, subtotal: number, discountCodeText: string): HTMLElement {
  const basketPayInfContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['basket-pay__basket-inf-container'],
  };
  const basketPayInfContainer = createElement(basketPayInfContainerParams);

  const basketPayInfSubtotalContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['basket-inf-container__subtotal-container', 'inf-container'],
  };
  const basketPayInfSubtotalContainer = createElement(basketPayInfSubtotalContainerParams);

  const basketPayInfSubtotalDescriptionParams: ElementParams<'h3'> = {
    tag: 'h3',
    classNames: ['basket-inf-container__subtotal-description'],
    textContent: 'Subtotal',
  };
  const basketPayInfSubtotalDescription = createElement(basketPayInfSubtotalDescriptionParams);

  const formattedSubtotalPrice = formatPrice(subtotal / 10);

  const basketPayInfSubtotalPriceParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['basket-inf-container__subtotal-price'],
    textContent: formattedSubtotalPrice,
  };
  const basketPayInfSubtotalPrice = createElement(basketPayInfSubtotalPriceParams);

  addInnerComponent(basketPayInfSubtotalContainer, basketPayInfSubtotalDescription);
  addInnerComponent(basketPayInfSubtotalContainer, basketPayInfSubtotalPrice);

  const basketPayInfTotalContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['tax-container__shipping-container', 'inf-container'],
  };
  const basketPayInfTotalContainer = createElement(basketPayInfTotalContainerParams);

  const basketPayInfTotalDescriptionParams: ElementParams<'h3'> = {
    tag: 'h3',
    classNames: ['basket-inf-container__total-description'],
    textContent: 'Total',
  };
  const basketPayInfTotalDescription = createElement(basketPayInfTotalDescriptionParams);

  const formattedTotalPrice = formatPrice(totalPrice / 100);

  const basketPayInfTotalPriceParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['basket-inf-container__total-price', 'inf-container'],
    textContent: formattedTotalPrice,
  };
  const basketPayInfTotalPrice = createElement(basketPayInfTotalPriceParams);

  addInnerComponent(basketPayInfTotalContainer, basketPayInfTotalDescription);
  addInnerComponent(basketPayInfTotalContainer, basketPayInfTotalPrice);

  if (discountCodeText) {
    const discountCodeContainerParams: ElementParams<'div'> = {
      tag: 'div',
      classNames: ['basket-inf-container__discount-code'],
    };
    const discountCodeContainer = createElement(discountCodeContainerParams);

    const discountCodeDescriptionParams: ElementParams<'span'> = {
      tag: 'span',
      classNames: ['discount-code-description'],
      textContent: 'Applied Promo Code: ',
    };
    const discountCodeDescription = createElement(discountCodeDescriptionParams);

    const discountCodeNameParams: ElementParams<'span'> = {
      tag: 'span',
      classNames: ['discount-code-name'],
      textContent: discountCodeText,
    };
    const discountCodeName = createElement(discountCodeNameParams);

    addInnerComponent(discountCodeDescription, discountCodeName);
    addInnerComponent(discountCodeContainer, discountCodeDescription);
    addInnerComponent(basketPayInfContainer, discountCodeContainer);
  }

  addInnerComponent(basketPayInfContainer, basketPayInfSubtotalContainer);
  addInnerComponent(basketPayInfContainer, basketPayInfTotalContainer);

  return basketPayInfContainer;
}