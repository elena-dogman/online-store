import { createElement, addInnerComponent, clear, ElementParams } from '../../utils/baseComponent';
import { createHeader } from '../../components/header/header';
import { createProductCatalog } from '../../components/catalog/productCatalog/productCatalog';
import { createSortComponent } from '../../components/catalog/productSort/productSort';
import { fetchFilteredProducts, fetchProducts } from '../../api/apiService';
import { createPagination } from '../../components/catalog/pagination/pagination';
import { ProductProjection } from '@commercetools/platform-sdk';
import {
  fetchAndMapCategories,
  Filters,
  getFiltersFromURL,
  updateURLWithFilters,
} from '../../components/catalog/filter/filters';
import { createFilterComponent } from '../../components/catalog/filter/productFilter';
import { createLoadingOverlay } from '../../components/catalog/overlay/loadingOverlay';
import { buildBreadcrumbs, generateBreadcrumbLinks } from '../../components/breadcrumbs/breadcrumbs';

export async function createCatalogPage(): Promise<HTMLElement> {
  await fetchAndMapCategories();

  const pageContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['catalog-page-container'],
  };
  const pageContainer = createElement(pageContainerParams);

  const breadcrumbContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['breadcrumb-container'],
  };
  const breadcrumbContainer = createElement(breadcrumbContainerParams);

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
  const loadingOverlay = createLoadingOverlay();

  let currentPage = 1;
  const itemsPerPage = 8;
  let currentSort = 'price asc';

  const filters: Filters = getFiltersFromURL();

  const updateFilters = (filterName: keyof Filters, value: string, checked: boolean): void => {
    if (filterName === 'category') {
      filters.category = checked ? value : '';
    } else {
      if (checked) {
        filters[filterName].add(value);
      } else {
        filters[filterName].delete(value);
      }
    }
    updateURLWithFilters(filters);
    console.log(`Updated Filters: ${filterName}`, filters[filterName]);
  };

  const showLoadingOverlay = (): void => {
    loadingOverlay.style.display = 'flex';
    paginationContainer.classList.remove('visible');
  };

  const hideLoadingOverlay = (): void => {
    loadingOverlay.style.display = 'none';
    paginationContainer.classList.add('visible');
  };

  const renderProducts = async (page: number, itemsPerPageCount: number, sort: string): Promise<void> => {
    console.log('Rendering products with sort:', sort);
    showLoadingOverlay();
    clear(catalogContainer);

    const selectedFilters: string[] = [];

    const buildFilterString = (key: keyof Filters): string => {
      if (key === 'category') {
        return filters.category ? `categories.id: subtree("${filters.category}")` : '';
      } else if (filters[key].size > 0) {
        const values = Array.from(filters[key]).map(value => `${value}`).join(',');
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

    let products: ProductProjection[] = [];
    if (selectedFilters.length > 0) {
      products = await fetchFilteredProducts(selectedFilters, sort);
    } else {
      products = await fetchProducts(sort);
    }

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
        renderProducts(currentPage, itemsPerPageCount, currentSort);
      },
    });

    clear(paginationContainer);
    addInnerComponent(paginationContainer, pagination);
    hideLoadingOverlay();
  };

  filterComponent.addEventListener('change', async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const filterName = target.classList[0].split('-')[0] as keyof Filters;

    updateFilters(filterName, target.value, target.checked);
    await renderProducts(1, itemsPerPage, currentSort);

    if (filterName === 'category') {
      const breadcrumbs = await buildBreadcrumbs(target.value);
      const breadcrumbLinks = generateBreadcrumbLinks(breadcrumbs);
      clear(breadcrumbContainer);
      addInnerComponent(breadcrumbContainer, breadcrumbLinks);
    }
  });

  const sortComponent = createSortComponent(async (sort: string) => {
    currentSort = sort;
    await renderProducts(1, itemsPerPage, currentSort);
  });

  const initialBreadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Catalog', url: '/catalog' },
  ];
  const initialBreadcrumbLinks = generateBreadcrumbLinks(initialBreadcrumbs);
  addInnerComponent(breadcrumbContainer, initialBreadcrumbLinks);

  pageContainer.prepend(header);
  pageContainer.appendChild(breadcrumbContainer);
  addInnerComponent(pageContainer, filterWrapper);
  addInnerComponent(filterWrapper, filterComponent);
  addInnerComponent(pageContainer, catalogContainerWrapper);
  addInnerComponent(catalogContainerWrapper, sortComponent);
  addInnerComponent(catalogContainerWrapper, catalogContainer);
  addInnerComponent(catalogContainerWrapper, paginationContainer);
  pageContainer.append(loadingOverlay);

  await renderProducts(currentPage, itemsPerPage, currentSort);

  return pageContainer;
}
