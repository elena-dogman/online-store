import { createElement, addInnerComponent, clear, ElementParams } from '../../utils/baseComponent';
import { createHeader } from '../../components/header/header';
import { createProductCatalog } from '../../components/catalog/productCatalog/productCatalog';
import { createFilterComponent } from '../../components/catalog/productFilter/productFilter';
import { createSortComponent } from '../../components/catalog/productSort/productSort';
import { fetchFilteredProducts, fetchProducts, fetchCategories } from '../../api/apiService';
import { ProductProjection } from '@commercetools/platform-sdk';
import { createPagination } from '../../components/catalog/pagination/pagination';

interface Filters {
  audience: Set<string>;
  category: Set<string>;
  size: Set<string>;
}

const categoriesMap: Record<string, string> = {};

async function fetchAndMapCategories(): Promise<void> {
  const categories = await fetchCategories();
  categories.forEach(category => {
    categoriesMap[category.id] = category.name['en-US'];
  });
}

function getFiltersFromURL(): Filters {
  const params = new URLSearchParams(window.location.search);
  const filters: Filters = {
    audience: new Set(params.getAll('audience')),
    category: new Set(
      params.getAll('category')
        .map(name => Object.keys(categoriesMap)
          .find(id => categoriesMap[id] === name) || name)),
    size: new Set(params.getAll('size')),
  };
  return filters;
}

function updateURLWithFilters(filters: Filters): void {
  const params = new URLSearchParams();
  filters.audience.forEach(value => params.append('audience', value));
  filters.category.forEach(value => {
    const categoryName = categoriesMap[value] || value;
    params.append('category', categoryName);
  });
  filters.size.forEach(value => params.append('size', value));
  history.pushState(null, '', '?' + params.toString());
}

function createLoadingOverlay(): HTMLElement {
  const overlay = createElement({
    tag: 'div',
    classNames: ['loading-overlay'],
  });

  const spinner = createElement({
    tag: 'div',
    classNames: ['loading-spinner'],
  });

  overlay.appendChild(spinner);

  return overlay;
}

export async function createCatalogPage(): Promise<HTMLElement> {
  await fetchAndMapCategories();

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
  const loadingOverlay = createLoadingOverlay();

  let currentPage = 1;
  const itemsPerPage = 8;
  let currentSort = 'price asc';

  const filters: Filters = getFiltersFromURL();

  const updateFilters = (filterName: keyof Filters, value: string, checked: boolean): void => {
    if (checked) {
      filters[filterName].add(value);
    } else {
      filters[filterName].delete(value);
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
      if (filters[key].size > 0) {
        if (key === 'category') {
          const values = Array.from(filters[key]).map(value => `subtree("${value}")`).join(',');
          return `categories.id: ${values}`;
        } else {
          const values = Array.from(filters[key]).map(value => `"${value}"`).join(',');
          return `variants.attributes.${key}:(${values})`;
        }
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
  });

  const sortComponent = createSortComponent(async (sort: string) => {
    currentSort = sort;
    await renderProducts(1, itemsPerPage, currentSort);
  });

  pageContainer.prepend(header);
  addInnerComponent(pageContainer, filterWrapper);
  addInnerComponent(filterWrapper, filterComponent);
  addInnerComponent(pageContainer, catalogContainerWrapper);
  addInnerComponent(catalogContainerWrapper, sortComponent);
  addInnerComponent(catalogContainerWrapper, catalogContainer);
  addInnerComponent(catalogContainerWrapper, paginationContainer);
  pageContainer.appendChild(loadingOverlay);

  await renderProducts(currentPage, itemsPerPage, currentSort);

  return pageContainer;
}
