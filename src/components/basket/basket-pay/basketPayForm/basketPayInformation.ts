import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../../utils/general/baseComponent';

export default function createBasketPayInformation(): HTMLElement {
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
  const basketPayInfSubtotalPricePapams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['basket-inf-container__subtotal-price'],
    textContent: '$2000',
  };
  const basketPayInfSubtotalPrice = createElement(
    basketPayInfSubtotalPricePapams,
  );
  addInnerComponent(
    basketPayInfSubtotalContainer,
    basketPayInfSubtotalDescription,
  );
  addInnerComponent(basketPayInfSubtotalContainer, basketPayInfSubtotalPrice);
  const basketPayInfTaxContainerPapams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['basket-inf-container__tax-container'],
  };
  const basketPayInfTaxContainer = createElement(
    basketPayInfTaxContainerPapams,
  );
  const basketPayInfTaxEstimateContainerPapams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['tax-container__estimate-container', 'inf-container'],
  };
  const basketPayInfTaxEstimateContainer = createElement(
    basketPayInfTaxEstimateContainerPapams,
  );
  const basketPayInfEstimateDescriptionPapams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['basket-inf-container__estimate-description'],
    textContent: 'Estimated Tax',
  };
  const basketPayInfEstimateDescription = createElement(
    basketPayInfEstimateDescriptionPapams,
  );
  const basketPayInfEstimatePricePapams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['basket-inf-container__estimate-price'],
    textContent: '$3000',
  };
  const basketPayInfEstimatePrice = createElement(
    basketPayInfEstimatePricePapams,
  );
  addInnerComponent(
    basketPayInfTaxEstimateContainer,
    basketPayInfEstimateDescription,
  );
  addInnerComponent(
    basketPayInfTaxEstimateContainer,
    basketPayInfEstimatePrice,
  );

  const basketPayInfTaxShippingContainerPapams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['tax-container__shipping-container', 'inf-container'],
  };
  const basketPayInfTaxShippingContainer = createElement(
    basketPayInfTaxShippingContainerPapams,
  );

  const basketPayInfShippingDescriptionPapams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['basket-inf-container__shipping-description'],
    textContent: 'Estimated shipping & Handling',
  };
  const basketPayInfShippingDescription = createElement(
    basketPayInfShippingDescriptionPapams,
  );
  const basketPayInfShippingPricePapams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['basket-inf-container__shipping-price', 'inf-container'],
    textContent: '$3000',
  };
  const basketPayInfShippingPrice = createElement(
    basketPayInfShippingPricePapams,
  );
  addInnerComponent(
    basketPayInfTaxShippingContainer,
    basketPayInfShippingDescription,
  );
  addInnerComponent(
    basketPayInfTaxShippingContainer,
    basketPayInfShippingPrice,
  );

  const basketPayInfTaxTotalContainerPapams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['tax-container__shipping-container', 'inf-container'],
  };
  const basketPayInfTaxTotalContainer = createElement(
    basketPayInfTaxTotalContainerPapams,
  );

  const basketPayInfTotalDescriptionPapams: ElementParams<'h3'> = {
    tag: 'h3',
    classNames: ['basket-inf-container__total-description'],
    textContent: 'Total',
  };
  const basketPayInfTotalDescription = createElement(
    basketPayInfTotalDescriptionPapams,
  );
  const basketPayInfTotalPricePapams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['basket-inf-container__total-price', 'inf-container'],
    textContent: '$3000',
  };
  const basketPayInfTotalPrice = createElement(basketPayInfTotalPricePapams);
  addInnerComponent(
    basketPayInfTaxTotalContainer,
    basketPayInfTotalDescription,
  );
  addInnerComponent(basketPayInfTaxTotalContainer, basketPayInfTotalPrice);

  addInnerComponent(basketPayInfTaxContainer, basketPayInfTaxEstimateContainer);
  addInnerComponent(basketPayInfTaxContainer, basketPayInfTaxShippingContainer);

  addInnerComponent(basketPayInfContainer, basketPayInfSubtotalContainer);
  addInnerComponent(basketPayInfContainer, basketPayInfTaxContainer);
  addInnerComponent(basketPayInfContainer, basketPayInfTaxTotalContainer);

  return basketPayInfContainer;
}
