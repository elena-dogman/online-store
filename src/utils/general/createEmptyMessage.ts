import { addInnerComponent, createElement } from './baseComponent';

export function createEmptyMessage(): HTMLElement {
  const emptyMessageLink = createElement({
    tag: 'a',
    classNames: ['basket-products__empty-message', 'empty-message__link'],
    textContent: 'Go to catalog',
    attributes: { href: '/catalog' },
  });
  const emptyMessageText = createElement({
    tag: 'p',
    classNames: ['basket-products__empty-message'],
    textContent: 'Your cart is empty',
  });
  const lineBreak = createElement({ tag: 'br' });
  const emptyMessage = createElement({
    tag: 'div',
    classNames: ['empty-message'],
  });
  addInnerComponent(emptyMessage, emptyMessageText);
  addInnerComponent(emptyMessage, lineBreak);
  addInnerComponent(emptyMessage, emptyMessageLink);
  return emptyMessage;
}
