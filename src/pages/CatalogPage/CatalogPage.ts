import { createElement, addInnerComponent, clear, ElementParams } from '../../utils/baseComponent';
import { createHeader } from '../../components/header/header';
import { createProductCatalog } from '../../components/catalog/productCatalog/productCatalog';
import { createFilterComponent } from '../../components/catalog/productFilter/productFilter';
import { fetchFilteredProducts, fetchProducts } from '../../api/apiService';
import { ProductProjection } from '@commercetools/platform-sdk';
import { createPagination } from '../../components/catalog/pagination/pagination';

interface Filters {
  audience: Set<string>;
  category: Set<string>;
  size: Set<string>;
}

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
    classNames: ['pagination-container'],
  };
  const paginationContainer = createElement(paginationContainerParams);

  const header = createHeader();
  const filterComponent = await createFilterComponent();

  let currentPage = 1;
  const itemsPerPage = 8;
  const allProducts: ProductProjection[] = await fetchProducts();
  const filters: Filters = {
    audience: new Set<string>(),
    category: new Set<string>(),
    size: new Set<string>(),
  };

  const updateFilters = (filterName: keyof Filters, value: string, checked: boolean): void => {
    if (checked) {
      filters[filterName].add(value);
    } else {
      filters[filterName].delete(value);
    }
  };

  const renderProducts = (
    products: ProductProjection[],
    page: number,
    itemsPerPageCount: number): void => {
    clear(catalogContainer);

    const start = (page - 1) * itemsPerPageCount;
    const end = start + itemsPerPageCount;
    const paginatedProducts = products.slice(start, end);

    const productCatalog = createProductCatalog(paginatedProducts);
    addInnerComponent(catalogContainer, productCatalog);

    const pagination = createPagination({
      totalItems: products.length,
      itemsPerPage: itemsPerPageCount,
      currentPage: page,
      onPageChange: (newPage) => {
        currentPage = newPage;
        renderProducts(products, currentPage, itemsPerPageCount);
      },
    });

    clear(paginationContainer);
    addInnerComponent(paginationContainer, pagination);
  };

  filterComponent.addEventListener('change', async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const filterName = target.classList[0].split('-')[0] as keyof Filters;

    updateFilters(filterName, target.value, target.checked);

    const selectedFilters: string[] = [];

    const buildFilterString = (key: keyof Filters): string => {
      if (filters[key].size > 0) {
        const values = Array.from(filters[key]).map(value => `"${value}"`).join(',');
        return `variants.attributes.${key}:${values}`;
      }
      return '';
    };

    const audienceFilter = buildFilterString('audience');
    const categoryFilter = buildFilterString('category');
    const sizeFilter = buildFilterString('size');

    if (audienceFilter) selectedFilters.push(audienceFilter);
    if (categoryFilter) selectedFilters.push(categoryFilter);
    if (sizeFilter) selectedFilters.push(sizeFilter);

    console.log('Selected Filters:', selectedFilters);

    let filteredProducts: ProductProjection[] = [];
    if (selectedFilters.length > 0) {
      filteredProducts = await fetchFilteredProducts(selectedFilters);
    } else {
      filteredProducts = await fetchProducts();
    }

    renderProducts(filteredProducts, 1, itemsPerPage);
  });

  pageContainer.prepend(header);
  addInnerComponent(pageContainer, filterWrapper);
  addInnerComponent(filterWrapper, filterComponent);
  addInnerComponent(pageContainer, catalogContainerWrapper);
  addInnerComponent(catalogContainerWrapper, catalogContainer);
  addInnerComponent(catalogContainerWrapper, paginationContainer);

  renderProducts(allProducts, currentPage, itemsPerPage);

  return pageContainer;
}
