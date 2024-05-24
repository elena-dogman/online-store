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

  const filterContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['filter-container'],
  };
  const filterContainer = createElement(filterContainerParams);

  const catalogContainerParams: ElementParams<'div'> = {
    tag: 'div',
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

  let currentPage = 1;
  const itemsPerPage = 8;
  let allProducts: ProductProjection[] = await fetchProducts();

  const renderPagination = (
    totalItems: number,
    itemsPerPageCount: number,
    currentPageIndex: number,
  ): void => {
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

  const renderProducts = (
    products: ProductProjection[],
    page: number,
    itemsPerPageCount: number,
  ): void => {
    clear(catalogContainer);

    const start = (page - 1) * itemsPerPageCount;
    const end = start + itemsPerPageCount;
    const paginatedProducts = products.slice(start, end);

    const productCatalog = createProductCatalog(paginatedProducts);
    addInnerComponent(catalogContainer, productCatalog);
    addInnerComponent(catalogContainer, paginationContainer);

    renderPagination(products.length, itemsPerPageCount, page);
  };

  filterComponent.addEventListener('change', async () => {
    const selectedAudience = (filterComponent.querySelector('.audience-filter') as HTMLSelectElement)?.value;
    const selectedCategory = (filterComponent.querySelector('.category-filter') as HTMLSelectElement)?.value;
    const maxPrice = (filterComponent.querySelector('.price-filter') as HTMLInputElement)?.value;
    const selectedSize = (filterComponent.querySelector('.size-filter') as HTMLSelectElement)?.value;

    const filters = [];
    if (selectedAudience) {
      filters.push(`variants.attributes.audience:"${selectedAudience}"`);
    }
    if (selectedCategory) {
      filters.push(`variants.attributes.category:"${selectedCategory}"`);
    }
    if (maxPrice) {
      filters.push(`variants.scopedPrice.currentValue.centAmount:range (0 to ${parseInt(maxPrice) * 100})`);
    }
    if (selectedSize) {
      filters.push(`variants.attributes.size:"${selectedSize}"`);
    }

    allProducts = await fetchFilteredProducts(filters);
    renderProducts(allProducts, 1, itemsPerPage);
  });

  pageContainer.prepend(header);
  addInnerComponent(pageContainer, filterContainer);
  addInnerComponent(filterContainer, filterComponent);
  addInnerComponent(pageContainer, catalogContainer);
  renderProducts(allProducts, currentPage, itemsPerPage);

  return pageContainer;
}