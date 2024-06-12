import { Cart } from '@commercetools/platform-sdk';
import { getActiveCart } from '../../../../api/apiService';
import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../../utils/general/baseComponent';
import { createInput } from '../../../../utils/general/createInput';
import { getTotalPrice } from '../getTotalPrice';
import createBasketPayInformation from './basketPayInformation';


const cart = await getActiveCart();
const totalPrice = getTotalPrice(cart as Cart);

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

  const basketApplyButtonPapams: ElementParams<'button'> = {
    tag: 'button',
    classNames: ['basket-form__apply-button'],
    textContent: 'Apply',
    attributes: { disabled: '' },
  };
  const basketApplyButton = createElement(basketApplyButtonPapams);
  addInnerComponent(basketDiscountLabel, basketDiscountInput);
  addInnerComponent(basketDiscountLabel, basketApplyButton);
  const basketPayInfContainer = createBasketPayInformation(totalPrice);
  const basketPayButtonPapams: ElementParams<'button'> = {
    tag: 'button',
    classNames: ['basket-form__submit-button'],
    textContent: 'Checkout',
    attributes: { disabled: '' },
  };
  const basketPayButton = createElement(basketPayButtonPapams);
  addInnerComponent(basketPayForm, basketPayTitle);
  addInnerComponent(basketPayForm, basketDiscountLabel);
  addInnerComponent(basketPayForm, basketPayInfContainer);
  addInnerComponent(basketPayForm, basketPayButton);
  return basketPayForm;
}
