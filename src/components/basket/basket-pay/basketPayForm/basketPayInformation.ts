import {
  createElement,
  ElementParams,
  addInnerComponent,
} from '../../../../utils/general/baseComponent';

export default function createBasketPayInformation(
  totalPrice: number,
): HTMLElement {
  const basketPayInfContainerPapams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['basket-pay__basket-inf-container'],
  };
  const basketPayInfContainer = createElement(basketPayInfContainerPapams);

  const basketPayInfSubtotalContainerPapams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['basket-inf-container__subtotal-container', 'inf-container'],
  };
  const basketPayInfSubtotalContainer = createElement(
    basketPayInfSubtotalContainerPapams,
  );

  const basketPayInfSubtotalDescriptionPapams: ElementParams<'h3'> = {
    tag: 'h3',
    classNames: ['basket-inf-container__subtotal-description'],
    textContent: 'Subtotal',
  };
  const basketPayInfSubtotalDescription = createElement(
    basketPayInfSubtotalDescriptionPapams,
  );

  const formattedSubtotalPrice = isNaN(totalPrice)
    ? '$0.00'
    : `$${(totalPrice / 100).toFixed(2)}`;

  const basketPayInfSubtotalPricePapams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['basket-inf-container__subtotal-price'],
    textContent: formattedSubtotalPrice,
  };
  const basketPayInfSubtotalPrice = createElement(
    basketPayInfSubtotalPricePapams,
  );
  addInnerComponent(
    basketPayInfSubtotalContainer,
    basketPayInfSubtotalDescription,
  );
  addInnerComponent(basketPayInfSubtotalContainer, basketPayInfSubtotalPrice);

  const basketPayInfTotalContainerPapams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['tax-container__shipping-container', 'inf-container'],
  };
  const basketPayInfTotalContainer = createElement(
    basketPayInfTotalContainerPapams,
  );

  const basketPayInfTotalDescriptionPapams: ElementParams<'h3'> = {
    tag: 'h3',
    classNames: ['basket-inf-container__total-description'],
    textContent: 'Total',
  };
  const basketPayInfTotalDescription = createElement(
    basketPayInfTotalDescriptionPapams,
  );

  const formattedTotalPrice = isNaN(totalPrice)
    ? '$0.00'
    : `$${(totalPrice / 100).toFixed(2)}`;

  const basketPayInfTotalPricePapams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['basket-inf-container__total-price', 'inf-container'],
    textContent: formattedTotalPrice,
  };
  const basketPayInfTotalPrice = createElement(basketPayInfTotalPricePapams);
  addInnerComponent(basketPayInfTotalContainer, basketPayInfTotalDescription);
  addInnerComponent(basketPayInfTotalContainer, basketPayInfTotalPrice);

  addInnerComponent(basketPayInfContainer, basketPayInfSubtotalContainer);
  addInnerComponent(basketPayInfContainer, basketPayInfTotalContainer);

  return basketPayInfContainer;
}
