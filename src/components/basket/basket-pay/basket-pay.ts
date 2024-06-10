import {
  ElementParams,
  createElement,
} from '../../../utils/general/baseComponent';

export default function createBasketPayContainer(): HTMLElement {
  const basketPayPapams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['basket-wrapper__basket-pay'],
  };
  const basketPay = createElement(basketPayPapams);
  return basketPay;
}
