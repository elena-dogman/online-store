import { createElement, addInnerComponent, clear, ElementParams } from '../../utils/baseComponent';
import { createHeader } from '../../components/header/header';
import { createProductCatalog } from '../../components/catalog/productCatalog/productCatalog';
import { createFilterComponent } from '../../components/catalog/productFilter/productFilter';
import { fetchFilteredProducts, fetchProducts } from '../../api/apiService';
import { ProductProjection } from '@commercetools/platform-sdk';
import { createPagination } from '../../components/catalog/pagination/pagination';

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

  const header = createHeader();
  const filterComponent = await createFilterComponent();

  let currentPage = 1;
  const itemsPerPage = 8;
  let allProducts: ProductProjection[] = await fetchProducts();

  const renderProducts = (products: ProductProjection[], page: number, itemsPerPageCount: number): void => {
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

    clear(catalogContainerWrapper);
    addInnerComponent(catalogContainerWrapper, catalogContainer);
    addInnerComponent(catalogContainerWrapper, pagination);
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
  addInnerComponent(filterWrapper, filterComponent);
  addInnerComponent(pageContainer, catalogContainerWrapper);

  renderProducts(allProducts, currentPage, itemsPerPage);

  return pageContainer;
}