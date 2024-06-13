import { createElement } from './baseComponent';

export function createEmptyMessage(): HTMLElement {
  const emptyMessage = createElement({
    tag: 'p',
    classNames: ['basket-products__empty-message'],
    textContent: 'Your cart is empty.',
  });
  return emptyMessage;
}
