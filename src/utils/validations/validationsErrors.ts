import { createElement } from '../usefullFunctions/baseComponent';
export function createErrorElement(): HTMLElement {
  return createElement({
    tag: 'span',
    classNames: ['error'],
  });
}
