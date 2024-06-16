import { describe, it, expect, beforeEach, vi } from 'vitest';
import createBasketPayInformation from '../components/basket/basket-pay/basketPayForm/basketPayInformation';
import { appEvents } from '../utils/general/eventEmitter';


describe('createBasketPayInformation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create basket pay information container with subtotal and total', () => {
    const totalPrice = 12345;
    const subtotal = 6789;
    const discountCodeText = '';

    const container = createBasketPayInformation(totalPrice, subtotal, discountCodeText);

    const subtotalElement = container.querySelector('.basket-inf-container__subtotal-price');
    const totalElement = container.querySelector('.basket-inf-container__total-price');
    const discountCodeElement = container.querySelector('.basket-inf-container__discount-code') as HTMLElement;

    expect(subtotalElement).not.toBeNull();
    expect(totalElement).not.toBeNull();
    expect(discountCodeElement).not.toBeNull();

    expect(subtotalElement?.textContent).toBe('$67.89');
    expect(totalElement?.textContent).toBe('$123.45');
    expect(discountCodeElement?.style.display).toBe('none');
  });

  it('should display discount code description when promoCodeApplied event is emitted', () => {
    const totalPrice = 12345;
    const subtotal = 6789;
    const discountCodeText = '';

    const container = createBasketPayInformation(totalPrice, subtotal, discountCodeText);

    const discountCodeElement = container.querySelector('.basket-inf-container__discount-code') as HTMLElement;
    const discountCodeNameElement = container.querySelector('.discount-code-name');

    expect(discountCodeElement).not.toBeNull();
    expect(discountCodeElement?.style.display).toBe('none');

    appEvents.emit('promoCodeApplied', { discountCode: '20% OFF' });

    expect(discountCodeElement?.style.display).toBe('');
    expect(discountCodeNameElement?.textContent).toBe('20% OFF');
  });

  it('should show discount code if already applied', () => {
    const totalPrice = 12345;
    const subtotal = 6789;
    const discountCodeText = '15% OFF';

    const container = createBasketPayInformation(totalPrice, subtotal, discountCodeText);

    const discountCodeElement = container.querySelector('.basket-inf-container__discount-code') as HTMLElement;
    const discountCodeNameElement = container.querySelector('.discount-code-name');

    expect(discountCodeElement).not.toBeNull();
    expect(discountCodeElement?.style.display).toBe('');
    expect(discountCodeNameElement?.textContent).toBe('15% OFF');
  });
});
