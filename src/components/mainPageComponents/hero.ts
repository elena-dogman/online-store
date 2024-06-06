import { addInnerComponent, createElement, ElementParams } from '../../utils/general/baseComponent';

export function createHero(): HTMLElement {
  const containerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['hero-container'],
    textContent: '',
  };
  const heroContainer = createElement(containerParams);

  const imageParams: ElementParams<'img'> = {
    tag: 'img',
    classNames: ['hero-image'],
    attributes: {
      src: '/assets/mainPage/hero-img.png',
      alt: 'Not Found',
    },
  };
  const heroImg = createElement(imageParams);

  addInnerComponent(heroContainer, heroImg);
  return heroContainer;
}