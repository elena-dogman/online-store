import { createElement } from '../general/baseComponent';
export function createErrorElement(): HTMLElement {
  return createElement({
    tag: 'span',
    classNames: ['error'],
  });
}
