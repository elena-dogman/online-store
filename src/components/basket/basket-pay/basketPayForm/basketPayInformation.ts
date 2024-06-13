import { createElement, ElementParams, addInnerComponent } from '../../../../utils/general/baseComponent';

export default function createBasketPayInformation(totalPrice: number, discountCodeText: string): HTMLElement {
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

  const formattedSubtotalPrice = isNaN(totalPrice) ? '$0.00' : `$${(totalPrice / 100).toFixed(2)}`;

  const basketPayInfSubtotalPriceParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['basket-inf-container__subtotal-price'],
    textContent: formattedSubtotalPrice,
  };
  const basketPayInfSubtotalPrice = createElement(basketPayInfSubtotalPriceParams);

  addInnerComponent(basketPayInfSubtotalContainer, basketPayInfSubtotalDescription);
  addInnerComponent(basketPayInfSubtotalContainer, basketPayInfSubtotalPrice);

  if (discountCodeText) {
    const basketPayInfDiscountCodeParams: ElementParams<'div'> = {
      tag: 'div',
      classNames: ['basket-inf-container__discount-code'],
    };
    const basketPayInfDiscountCode = createElement(basketPayInfDiscountCodeParams);

    const discountCodeLabelParams: ElementParams<'span'> = {
      tag: 'span',
      classNames: ['basket-inf-container__discount-code-label'],
      textContent: 'Applied Promo Code: ',
    };
    const discountCodeLabel = createElement(discountCodeLabelParams);

    const discountCodeTextElementParams: ElementParams<'em'> = {
      tag: 'em',
      classNames: ['basket-inf-container__discount-code-text'],
      textContent: discountCodeText,
    };
    const discountCodeTextElement = createElement(discountCodeTextElementParams);

    addInnerComponent(basketPayInfDiscountCode, discountCodeLabel);
    addInnerComponent(basketPayInfDiscountCode, discountCodeTextElement);
    addInnerComponent(basketPayInfSubtotalContainer, basketPayInfDiscountCode);
  }

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

  const formattedTotalPrice = isNaN(totalPrice) ? '$0.00' : `$${(totalPrice / 100).toFixed(2)}`;

  const basketPayInfTotalPriceParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['basket-inf-container__total-price', 'inf-container'],
    textContent: formattedTotalPrice,
  };
  const basketPayInfTotalPrice = createElement(basketPayInfTotalPriceParams);

  addInnerComponent(basketPayInfTotalContainer, basketPayInfTotalDescription);
  addInnerComponent(basketPayInfTotalContainer, basketPayInfTotalPrice);

  addInnerComponent(basketPayInfContainer, basketPayInfSubtotalContainer);
  addInnerComponent(basketPayInfContainer, basketPayInfTotalContainer);

  return basketPayInfContainer;
}
