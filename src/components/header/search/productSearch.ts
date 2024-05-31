import { addInnerComponent, createElement, ElementParams } from '../../../utils/baseComponent';

export function createSearchComponent(): HTMLElement {
  const searchWrapperParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['search__wrapper'],
  };
  const searchWrapper = createElement(searchWrapperParams);

  const searchInputParams: ElementParams<'input'> = {
    tag: 'input',
    classNames: ['search__input'],
    attributes: { placeholder: 'Search' },
  };
  const searchInput = createElement(searchInputParams);

  const searchButtonParams: ElementParams<'button'> = {
    tag: 'button',
    classNames: ['search__button'],
  };
  const searchButton = createElement(searchButtonParams);

  const searchIcon = createElement({
    tag: 'img',
    classNames: ['search__icon'],
    attributes: {
      src: '/assets/header/search.png',
      alt: 'Search',
    },
  });
  addInnerComponent(searchButton, searchIcon);

  addInnerComponent(searchWrapper, searchButton);
  addInnerComponent(searchWrapper, searchInput);

  return searchWrapper;
}
