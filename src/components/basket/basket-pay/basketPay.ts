import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../utils/general/baseComponent';
import createBasketPayForm from './basketPayForm/basketPayForm';

export default function createBasketPayContainer(): HTMLElement {
  const basketPayPapams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['basket-wrapper__basket-pay'],
  };
  const basketPay = createElement(basketPayPapams);
  const basketPayForm = createBasketPayForm();
  addInnerComponent(basketPay, basketPayForm);
  return basketPay;
}
