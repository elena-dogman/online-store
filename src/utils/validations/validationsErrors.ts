import { createElement } from '../baseComponent';
export function createErrorElement(): HTMLElement {
  return createElement({
    tag: 'span',
    classNames: ['error'],
  });
}
