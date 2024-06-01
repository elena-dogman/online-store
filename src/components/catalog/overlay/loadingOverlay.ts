import { createElement } from '../../../utils/usefullFunctions/baseComponent';

export function createLoadingOverlay(): HTMLElement {
  const overlay = createElement({
    tag: 'div',
    classNames: ['loading-overlay'],
  });

  const spinner = createElement({
    tag: 'div',
    classNames: ['loading-spinner'],
  });

  overlay.append(spinner);

  return overlay;
}
