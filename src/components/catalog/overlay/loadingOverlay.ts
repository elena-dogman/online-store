import { createElement } from '../../../utils/baseComponent';


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
