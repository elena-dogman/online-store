import { ProductProjection } from '@commercetools/platform-sdk';
import { createElement, addInnerComponent } from '../../utils/baseComponent';

export function createProductCatalog(filteredProducts: ProductProjection[] = []): HTMLElement {
  const catalogContainer = createElement({
    tag: 'div',
    classNames: ['catalog-container'],
  });

  const productsToDisplay = filteredProducts.length > 0 ? filteredProducts : [];

  productsToDisplay.forEach(product => {
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

  return catalogContainer;
}
