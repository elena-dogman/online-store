import { createElement, addInnerComponent, clear, ElementParams } from '../../utils/baseComponent';
import { createHeader } from '../../components/header/header';
import { createProductCatalog } from '../../components/productCatalog/productCatalog';
import { createFilterComponent } from '../../components/productFilter/productFilter';
import { fetchFilteredProducts, fetchProducts } from '../../api/apiService';

export async function createCatalogPage(): Promise<HTMLElement> {
  const catalogContainerParams: ElementParams<'section'> = {
    tag: 'section',
    classNames: ['catalog_container'],
  };
  const catalogContainer = createElement(catalogContainerParams);

  const header = createHeader();
  const filterComponent = await createFilterComponent();

  // Fetch initial products
  const initialProducts = await fetchProducts();
  const productCatalog = createProductCatalog(initialProducts);

  filterComponent.addEventListener('change', () => {
    const selectedCategory = (filterComponent.querySelector('.category-filter') as HTMLSelectElement)?.value;
    const selectedAudience = (filterComponent.querySelector('.audience-filter') as HTMLSelectElement)?.value;
    const maxPrice = (filterComponent.querySelector('.price-filter') as HTMLInputElement)?.value;
    const selectedSize = (filterComponent.querySelector('.size-filter') as HTMLSelectElement)?.value;

    const filters = [];
    if (selectedCategory) {
      filters.push(`categories.id:"${selectedCategory}"`);
    }
    if (selectedAudience) {
      filters.push(`variants.attributes.audience:"${selectedAudience}"`);
    }
    if (maxPrice) {
      filters.push(`variants.scopedPrice.currentValue.centAmount:range (0 to ${parseInt(maxPrice) * 100})`);
    }
    if (selectedSize) {
      filters.push(`variants.attributes.size:"${selectedSize}"`);
    }

    fetchFilteredProducts(filters).then(filteredProducts => {
      const newProductCatalog = createProductCatalog(filteredProducts);
      clear(productCatalog);
      addInnerComponent(catalogContainer, newProductCatalog);
    });
  });

  catalogContainer.prepend(header);
  addInnerComponent(catalogContainer, filterComponent);
  addInnerComponent(catalogContainer, productCatalog);

  return catalogContainer;
}
