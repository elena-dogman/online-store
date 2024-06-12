import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../baseComponent';

export default function createRemoveIcon(type: string): HTMLElement {
  const removeIconContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: [`${type}__remove-icon-container`, 'remove-icon-container'],
  };
  const removeIconParams: ElementParams<'img'> = {
    tag: 'img',
    classNames: ['remove_icon'],
    attributes: {
      src: '../assets/basket/bin.png',
    },
  };
  const removeIcon = createElement(removeIconParams);
  const removeIconContainer = createElement(removeIconContainerParams);
  addInnerComponent(removeIconContainer, removeIcon);
  return removeIconContainer;
}
