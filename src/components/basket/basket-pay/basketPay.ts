import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../utils/general/baseComponent';
import createBasketPayForm from './basketPayForm/basketPayForm';

export default async function createBasketPayContainer(): Promise<HTMLElement> {
  const basketPayPapams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['basket-wrapper__basket-pay'],
  };
  const basketPay = createElement(basketPayPapams);
  const basketPayForm = await createBasketPayForm();
  addInnerComponent(basketPay, basketPayForm);
  return basketPay;
}
