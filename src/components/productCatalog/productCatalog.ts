import { ProductData } from '@commercetools/platform-sdk';
import { fetchProducts } from '../../api/apiService';
import { createElement, addInnerComponent } from '../../utils/baseComponent';

export function createProductCatalog(): HTMLElement {
  const catalogContainer = createElement({
    tag: 'div',
    classNames: ['catalog-container'],
  });

  fetchProducts().then((response: ProductData[]) => {
    response.forEach(product => {
      const productName = product.name?.['en-US'] ?? 'No name';
      const productDescription = product.description?.['en-US'] ?? 'No description';
      const productImage = product.masterVariant.images?.[0]?.url ?? 'No image';

      const productCard = createElement({
        tag: 'div',
        classNames: ['product-card'],
      });

      const imageElement = createElement({
        tag: 'img',
        classNames: ['product-image'],
        attributes: { src: productImage, alt: productName },
      });

      const nameElement = createElement({
        tag: 'h3',
        classNames: ['product-name'],
        textContent: productName,
      });

      const descriptionElement = createElement({
        tag: 'p',
        classNames: ['product-description'],
        textContent: productDescription,
      });

      addInnerComponent(productCard, imageElement);
      addInnerComponent(productCard, nameElement);
      addInnerComponent(productCard, descriptionElement);

      addInnerComponent(catalogContainer, productCard);
    });
  }).catch(error => {
    console.error('Error creating product catalog:', error);
    catalogContainer.innerHTML = 'Error loading catalog';
  });

  return catalogContainer;
}
