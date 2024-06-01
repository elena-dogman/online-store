import { createElement, addInnerComponent, clear, ElementParams } from '../../utils/baseComponent';
import { createHeader } from '../../components/header/header';
import { createProductCatalog } from '../../components/catalog/productCatalog/productCatalog';
import { createSortComponent } from '../../components/catalog/productSort/productSort';
import { fetchFilteredProducts, fetchProducts } from '../../api/apiService';
import { createPagination } from '../../components/catalog/pagination/pagination';
import { ProductProjection, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import {
  fetchAndMapCategories,
  getFiltersFromURL,
  updateURLWithFilters,
  buildCategoryPath,
  categoriesMap,
  Filters,
} from '../../components/catalog/filter/filters';
import { createFilterComponent } from '../../components/catalog/filter/productFilter';
import { createLoadingOverlay } from '../../components/catalog/overlay/loadingOverlay';
import { generateBreadcrumbLinks } from '../../components/breadcrumbs/breadcrumbs';

export async function buildBreadcrumbsFromUrl(): Promise<{ name: string; url: string }[]> {
  const url = new URL(window.location.href);
  const categoryName = url.searchParams.get('category');

  const breadcrumbs = [{ name: 'Home', url: '/' }, { name: 'Catalog', url: '/catalog' }];
  if (!categoryName) {
    return breadcrumbs;
  }

  const categoryId = Object.keys(categoriesMap).find(id => categoriesMap[id].name === categoryName);
  if (!categoryId) {
    return breadcrumbs;
  }

  const categoryPath = buildCategoryPath(categoryId);
  categoryPath.forEach(category => {
    breadcrumbs.push({
      name: category.name,
      url: `/catalog?category=${category.name}`,
    });
  });

  return breadcrumbs;
}

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

  let filters = getFiltersFromURL();

  const updateBreadcrumbs = async (): Promise<void> => {
    const breadcrumbs = await buildBreadcrumbsFromUrl();
    const breadcrumbLinks = generateBreadcrumbLinks(breadcrumbs);
    clear(breadcrumbContainer);
    addInnerComponent(breadcrumbContainer, breadcrumbLinks);

    breadcrumbContainer.querySelectorAll('a').forEach(anchor => {
      anchor.addEventListener('click', async (event: Event) => {
        event.preventDefault();
        const target = event.currentTarget as HTMLAnchorElement;
        const url = new URL(target.href);
        const params = new URLSearchParams(url.search);
        filters = {
          ...filters,
          category: params.get('category') || '',
        };
        updateURLWithFilters(filters);
        history.pushState({}, '', url.toString());
        await updateBreadcrumbs();
        await renderProducts(1, itemsPerPage, currentSort);
      });
    });
  };

  const updateFilters = async (filterName: keyof Filters, value: string, checked: boolean): Promise<void> => {
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
    await updateBreadcrumbs();
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

    await updateFilters(filterName, target.value, target.checked);
    clear(catalogContainer);
    await renderProducts(1, itemsPerPage, currentSort);
  });

  const sortComponent = createSortComponent(async (sort: string) => {
    currentSort = sort;
    await renderProducts(1, itemsPerPage, currentSort);
  });

  const initialBreadcrumbs = await buildBreadcrumbsFromUrl();
  const initialBreadcrumbLinks = generateBreadcrumbLinks(initialBreadcrumbs);
  addInnerComponent(breadcrumbContainer, initialBreadcrumbLinks);

  breadcrumbContainer.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', async (event: Event) => {
      event.preventDefault();
      const target = event.currentTarget as HTMLAnchorElement;
      const url = new URL(target.href);
      const params = new URLSearchParams(url.search);
      filters = {
        ...filters,
        category: params.get('category') || '',
      };
      updateURLWithFilters(filters);
      history.pushState({}, '', url.toString());
      await updateBreadcrumbs();
      await renderProducts(1, itemsPerPage, currentSort);
    });
  });

  pageContainer.prepend(header);
  addInnerComponent(pageContainer, breadcrumbContainer);
  addInnerComponent(pageContainer, filterWrapper);
  addInnerComponent(filterWrapper, filterComponent);
  addInnerComponent(pageContainer, catalogContainerWrapper);
  addInnerComponent(catalogContainerWrapper, sortComponent);
  addInnerComponent(catalogContainerWrapper, catalogContainer);
  addInnerComponent(catalogContainerWrapper, paginationContainer);
  pageContainer.append(loadingOverlay);

 document.addEventListener('searchResults', (event) => {
    const customEvent = event as CustomEvent;
    const searchResults = customEvent.detail as ProductProjectionPagedQueryResponse;
    displaySearchResults(searchResults);
  });

  const displaySearchResults = (searchResults: ProductProjectionPagedQueryResponse): void => {
    const products = searchResults.results;
    clear(catalogContainer);

    if (products.length > 0) {
      const productCatalog = createProductCatalog(products);
      addInnerComponent(catalogContainer, productCatalog);
    } else {
      const noResultsMessage = createElement({
        tag: 'div',
        classNames: ['no-results-message'],
        textContent: 'No products found.',
      });
      addInnerComponent(catalogContainer, noResultsMessage);
    }
  };

  await renderProducts(currentPage, itemsPerPage, currentSort);

  window.addEventListener('popstate', async () => {
    await updateBreadcrumbs();
    await renderProducts(currentPage, itemsPerPage, currentSort);
  });

  return pageContainer;
}
