import { Cart } from '@commercetools/platform-sdk';
import { getActiveCart, applyPromoCode } from '../../../../api/apiService';
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
  };

  const basketApplyButton = createElement(basketApplyButtonPapams);
  const errorSpanParams: ElementParams<'span'> = {
    tag: 'span',
    classNames: ['error-message'],
    textContent: '',
  };
  const errorSpan = createElement(errorSpanParams);

  const successSpanParams: ElementParams<'span'> = {
    tag: 'span',
    classNames: ['success-message'],
    textContent: '',
  };
  const successSpan = createElement(successSpanParams);

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

  basketApplyButton.addEventListener('click', async (event: Event) => {
    event.preventDefault();
    errorSpan.style.display = 'none';
    successSpan.style.display = 'none';
    const discountCode = basketDiscountInput.value.trim();
    if (!discountCode) {
      errorSpan.textContent = 'Please enter a promo code';
      errorSpan.style.display = 'block';
      return;
    }
    try {
      const activeCart = await getActiveCart();
      if (activeCart) {
        const cartId = activeCart.id;
        const cartVersion = activeCart.version;
        if (activeCart.discountCodes && activeCart.discountCodes.length > 0) {
          errorSpan.textContent = 'Only one promo code allowed!';
          errorSpan.style.display = 'block';
          return;
        }
        const body = {
          version: cartVersion,
          actions: [
            {
              action: 'addDiscountCode' as const,
              code: discountCode,
            },
          ],
        };
        const response = await applyPromoCode(cartId, body);
        console.log(response);
        if (
          response &&
          'statusCode' in response &&
          response.statusCode === 400
        ) {
          errorSpan.textContent = 'Invalid promo code';
          errorSpan.style.display = 'block';
        } else if (response && 'body' in response) {
          successSpan.textContent = 'Promo code applied successfully';
          successSpan.style.display = 'block';
        }
      }
    } catch (error) {
      throw new Error();
    }
  });

  return basketPayForm;
}
