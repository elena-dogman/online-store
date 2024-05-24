import {
  ElementParams,
  createElement,
  addInnerComponent,
} from './baseComponent';

export function createIconContainer(
  imageUrl: string,
  text1: string,
  text2: string,
  containerClasses: string[] = [],
  imageContainerClasses: string[] = [],
  textContainerClasses: string[] = [],
  text1Classes: string[] = [],
  text2Classes: string[] = [],
): HTMLElement {
  const containerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['icon_container', ...containerClasses],
  };

  const imageContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: imageContainerClasses,
  };

  const imageParams: ElementParams<'img'> = {
    tag: 'img',
    attributes: {
      src: imageUrl,
    },
  };

  const textContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: textContainerClasses,
  };

  const text1Params: ElementParams<'div'> = {
    tag: 'div',
    textContent: text1,
    classNames: text1Classes,
  };

  const text2Params: ElementParams<'div'> = {
    tag: 'div',
    textContent: text2,
    classNames: text2Classes,
  };

  const container = createElement(containerParams);
  const imageContainer = createElement(imageContainerParams);
  const image = createElement(imageParams);
  const textContainer = createElement(textContainerParams);
  const text1Element = createElement(text1Params);
  const text2Element = createElement(text2Params);

  addInnerComponent(imageContainer, image);
  addInnerComponent(textContainer, text1Element);
  addInnerComponent(textContainer, text2Element);
  addInnerComponent(container, imageContainer);
  addInnerComponent(container, textContainer);

  return container;
}
