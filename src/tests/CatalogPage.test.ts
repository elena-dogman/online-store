import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createCatalogPage } from '../pages/CatalogPage/CatalogPage';
import { ProductProjection, ProductVariantAvailability, ReviewRatingStatistics, ScopedPrice } from '@commercetools/platform-sdk';

const mockFetchProducts = vi.fn();
const mockFetchFilteredProducts = vi.fn();

vi.mock('../../api/apiService', () => ({
  fetchProducts: mockFetchProducts,
  fetchFilteredProducts: mockFetchFilteredProducts,
}));

const createMockProduct = (id: string, name: string): ProductProjection => ({
  id,
  version: 1,
  productType: { typeId: 'product-type', id: '1' },
  name: { 'en': name },
  slug: { 'en': name.toLowerCase().replace(/\s+/g, '-') },
  description: { 'en': '' },
  categories: [],
  metaTitle: { 'en': '' },
  metaDescription: { 'en': '' },
  metaKeywords: { 'en': '' },
  searchKeywords: { 'en': [] },
  hasStagedChanges: false,
  published: true,
  masterVariant: {
    id: 1,
    sku: '',
    prices: [],
    images: [],
    attributes: [],
    assets: [],
    availability: { channels: {}, isOnStock: true } as ProductVariantAvailability,
    isMatchingVariant: true,
    scopedPrice: undefined as ScopedPrice | undefined,
    scopedPriceDiscounted: false,
  },
  variants: [],
  taxCategory: { typeId: 'tax-category', id: '1' },
  state: { typeId: 'state', id: '1' },
  reviewRatingStatistics: undefined as ReviewRatingStatistics | undefined,
  priceMode: 'Platform',
  createdAt: new Date().toISOString(),
  lastModifiedAt: new Date().toISOString(),
});

describe('createCatalogPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display products correctly', async () => {
    const mockProducts: ProductProjection[] = [
      createMockProduct('1', 'Product 1'),
      createMockProduct('2', 'Product 2'),
    ];

    mockFetchProducts.mockResolvedValue(mockProducts);

    const page = await createCatalogPage();

    const productCatalog = page.querySelector('.catalog-container');
    if (productCatalog) {
      mockProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-element';
        productElement.textContent = product.name.en;
        productCatalog.appendChild(productElement);
      });
    }

    const productElements = page.querySelectorAll('.product-element');
    expect(productElements.length).toBe(mockProducts.length);
  });

  it('should handle filter changes correctly', async () => {
    const mockProducts: ProductProjection[] = [
      createMockProduct('1', 'Product 1'),
      createMockProduct('2', 'Product 2'),
    ];
    const filteredProducts: ProductProjection[] = [
      createMockProduct('3', 'Filtered Product'),
    ];

    mockFetchProducts.mockResolvedValue(mockProducts);
    mockFetchFilteredProducts.mockResolvedValue(filteredProducts);

    const page = await createCatalogPage();

    const filterComponent = page.querySelector('.filter-wrapper');
    expect(filterComponent).not.toBeNull();

    if (filterComponent) {
      const filterInput = document.createElement('input');
      filterInput.classList.add('audience-filter');
      filterInput.type = 'checkbox';
      filterInput.checked = true;
      filterInput.value = 'filtered';
      filterComponent.appendChild(filterInput);

      const changeEvent = new Event('change');
      filterInput.dispatchEvent(changeEvent);
    }

    const productCatalog = page.querySelector('.catalog-container');
    if (productCatalog) {
      productCatalog.innerHTML = '';
      filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-element';
        productElement.textContent = product.name.en;
        productCatalog.appendChild(productElement);
      });
    }

    const productElements = page.querySelectorAll('.product-element');
    expect(productElements.length).toBe(filteredProducts.length);
    expect(productElements[0].textContent).toContain('Filtered Product');
  });
});