
import { searchProducts } from '../../../api/apiService';
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
  const searchInput = createElement(searchInputParams) as HTMLInputElement;

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

  const searchFormParams: ElementParams<'form'> = {
    tag: 'form',
    classNames: ['search__form'],
  };
  const searchForm = createElement(searchFormParams);

  addInnerComponent(searchForm, searchInput);
  addInnerComponent(searchForm, searchButton);
  addInnerComponent(searchWrapper, searchForm);

  searchForm.addEventListener('submit', async (event: Event) => {
    event.preventDefault();
    const searchText = searchInput.value.trim();
    if (searchText) {
      try {
        const searchResults = await searchProducts(searchText);
        const customEvent = new CustomEvent('searchResults', {
          detail: searchResults,
        });
        document.dispatchEvent(customEvent);
      } catch (error) {
        console.error('Search error:', error);
      }
    }
  });

  return searchWrapper;
}
