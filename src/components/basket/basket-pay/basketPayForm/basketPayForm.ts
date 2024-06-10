import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../../utils/general/baseComponent';
import { createInput } from '../../../../utils/general/createInput';
import createBasketPayInformation from './basketPayInformation';

export default function createBasketPayForm(): HTMLElement {
  const basketPayFormPapams: ElementParams<'form'> = {
    tag: 'form',
    classNames: ['basket-pay__basket-form'],
  };
  const basketPayForm = createElement(basketPayFormPapams);
  const basketPayTitlePapams: ElementParams<'h2'> = {
    tag: 'h2',
    classNames: ['basket-pay__basket-title'],
    textContent: 'Order Summary',
  };
  const basketPayTitle = createElement(basketPayTitlePapams);

  const [basketDiscountLabel, basketDiscountInput] = createInput(
    'basket-discount',
    [
      ['basket-discount-label', 'label-basket'],
      ['basket-discount-input', 'input-basket'],
    ],
    'basket-discount',
    'basket-discount',
  );
  basketDiscountInput.setAttribute('placeholder', 'Code');
  basketDiscountLabel.textContent = 'Discount code / Promo code';

  addInnerComponent(basketDiscountLabel, basketDiscountInput);

  const [basketBonusLabel, basketBonusInput] = createInput(
    'basket-bonus',
    [
      ['basket-bonus-label', 'label-basket'],
      ['basket-bonus-input', 'input-basket'],
    ],
    'basket-bonus',
    'basket-bonus',
  );
  basketBonusInput.setAttribute('placeholder', 'Enter Card Number');
  basketBonusLabel.textContent = 'Your bonus card number';

  const basketPayInfContainer = createBasketPayInformation();
  const basketPayButtonPapams: ElementParams<'button'> = {
    tag: 'button',
    classNames: ['basket-form__submit-button'],
    textContent: 'Checkout',
    attributes: { disabled: '' },
  };
  const basketPayButton = createElement(basketPayButtonPapams);
  addInnerComponent(basketBonusLabel, basketBonusInput);
  addInnerComponent(basketPayForm, basketPayTitle);
  addInnerComponent(basketPayForm, basketDiscountLabel);
  addInnerComponent(basketPayForm, basketBonusLabel);
  addInnerComponent(basketPayForm, basketPayInfContainer);
  addInnerComponent(basketPayForm, basketPayButton);
  return basketPayForm;
}
