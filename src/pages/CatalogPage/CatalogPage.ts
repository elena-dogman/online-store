import { createElement, addInnerComponent, clear, ElementParams } from '../../utils/baseComponent';
import { createHeader } from '../../components/header/header';
import { createProductCatalog } from '../../components/productCatalog/productCatalog';
import { createFilterComponent } from '../../components/productFilter/productFilter';
import { fetchFilteredProducts, fetchProducts } from '../../api/apiService';
import { ProductProjection } from '@commercetools/platform-sdk';

export async function createCatalogPage(): Promise<HTMLElement> {
  const pageContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['catalog-page-container'],
  };
  const pageContainer = createElement(pageContainerParams);

  const filterWrapperParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['filter-wrapper'],
  };
  const filterWrapper = createElement(filterWrapperParams);

  const catalogContainerWrapperParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['catalog-container-wrapper'],
  };
  const catalogContainerWrapper = createElement(catalogContainerWrapperParams);

  const catalogContainerParams: ElementParams<'section'> = {
    tag: 'section',
    classNames: ['catalog-container'],
  };
  const catalogContainer = createElement(catalogContainerParams);

  const paginationContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['pagination'],
  };
  const paginationContainer = createElement(paginationContainerParams);

  const header = createHeader();
  const filterComponent = await createFilterComponent();

  const filterTextParams: ElementParams<'p'> = {
    tag: 'p',
    textContent: 'Use the filters below to narrow down your product search:',
    classNames: ['filter-instructions'],
  };
  const filterText = createElement(filterTextParams);

  let currentPage = 1;
  const itemsPerPage = 8;
  let allProducts: ProductProjection[] = await fetchProducts();

  const renderPagination = (totalItems: number, itemsPerPageCount: number, currentPageIndex: number): void => {
    const totalPages = Math.ceil(totalItems / itemsPerPageCount);

    clear(paginationContainer);

    const createPageButton = (pageNumber: number): HTMLElement => {
      const pageButton = createElement({
        tag: 'button',
        textContent: pageNumber.toString(),
        classNames: pageNumber === currentPageIndex ? ['active'] : [],
        callbacks: [
          {
            eventType: 'click',
            callback: (): void => {
              currentPage = pageNumber;
              renderProducts(allProducts, currentPage, itemsPerPageCount);
            },
          },
        ],
      });

      return pageButton;
    };

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = createPageButton(i);
      addInnerComponent(paginationContainer, pageButton);
    }
  };

  const renderProducts = (products: ProductProjection[], page: number, itemsPerPageCount: number): void => {
    clear(catalogContainer);

    const start = (page - 1) * itemsPerPageCount;
    const end = start + itemsPerPageCount;
    const paginatedProducts = products.slice(start, end);

    const productCatalog = createProductCatalog(paginatedProducts);
    addInnerComponent(catalogContainer, productCatalog);

    renderPagination(products.length, itemsPerPageCount, page);
  };

  filterComponent.addEventListener('change', async () => {
    const selectedFilters: string[] = [];

    const audienceCheckboxes = filterComponent.querySelectorAll('.audience-filter:checked') as NodeListOf<HTMLInputElement>;
    const categoryCheckboxes = filterComponent.querySelectorAll('.category-filter:checked') as NodeListOf<HTMLInputElement>;
    const sizeCheckboxes = filterComponent.querySelectorAll('.size-filter:checked') as NodeListOf<HTMLInputElement>;

    audienceCheckboxes.forEach(checkbox => {
      selectedFilters.push(`variants.attributes.audience:"${checkbox.value}"`);
    });

    categoryCheckboxes.forEach(checkbox => {
      selectedFilters.push(`variants.attributes.category:"${checkbox.value}"`);
    });

    sizeCheckboxes.forEach(checkbox => {
      selectedFilters.push(`variants.attributes.size:"${checkbox.value}"`);
    });

    if (selectedFilters.length > 0) {
      allProducts = await fetchFilteredProducts(selectedFilters);
    } else {
      allProducts = await fetchProducts();
    }

    renderProducts(allProducts, 1, itemsPerPage);
  });

  pageContainer.prepend(header);
  addInnerComponent(pageContainer, filterWrapper);
  addInnerComponent(filterWrapper, filterText);
  addInnerComponent(filterWrapper, filterComponent);
  addInnerComponent(pageContainer, catalogContainerWrapper);
  addInnerComponent(catalogContainerWrapper, catalogContainer);
  addInnerComponent(catalogContainerWrapper, paginationContainer);
  renderProducts(allProducts, currentPage, itemsPerPage);

  return pageContainer;
}