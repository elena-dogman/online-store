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
  const removeIconContainer = createElement(removeIconContainerParams);
  const removeIconLeftLineParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: [`${type}__remove-icon-left-line`, 'remove-icon-left-line'],
  };
  const removeIconRightLineParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: [`${type}__remove-icon-right-line`, 'remove-icon-right-line'],
  };
  const removeIconLeftLine = createElement(removeIconLeftLineParams);
  const removeIconRightLine = createElement(removeIconRightLineParams);

  addInnerComponent(removeIconContainer, removeIconLeftLine);
  addInnerComponent(removeIconContainer, removeIconRightLine);
  return removeIconContainer;
}
