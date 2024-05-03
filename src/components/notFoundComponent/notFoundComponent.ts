import { createElement, addInnerComponent, EventCallback, ElementParams } from '../../utils/baseComponent';

export function createNotFoundPage(): HTMLElement {
  const containerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['not-found-container'],
    textContent: '',
  };
  const container = createElement(containerParams);

  const imageParams: ElementParams<'img'> = {
    tag: 'img',
    classNames: ['not-found-image'],
    attributes: {
      src: '/assets/404-img.png',
      alt: 'Not Found',
    },
  };
  const image = createElement(imageParams);

  const contentContainer = createElement({ tag: 'div', classNames: ['not-found-content'] });

  const headingParams: ElementParams<'h1'> = {
    tag: 'h1',
    classNames: ['not-found-title'],
    textContent: 'OOPS!',
  };
  const heading = createElement(headingParams);

  const descriptionParams: ElementParams<'p'> = {
    tag: 'p',
    classNames: ['not-found-description'],
    textContent: 'Looks like big foot has broken the link.',
  };
  const description = createElement(descriptionParams);

  const backHomeCallback: EventCallback = {
    eventType: 'click',
    callback: () => window.location.href = '/',
  };
  const buttonParams: ElementParams<'button'> = {
    tag: 'button',
    classNames: ['back-home-button'],
    textContent: 'Back to homepage',
    callbacks: [backHomeCallback],
  };
  const backButton = createElement(buttonParams);

  addInnerComponent(contentContainer, heading);
  addInnerComponent(contentContainer, description);
  addInnerComponent(contentContainer, backButton);

  addInnerComponent(container, image);
  addInnerComponent(container, contentContainer);

  return container;
}

