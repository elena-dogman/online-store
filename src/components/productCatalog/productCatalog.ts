import { ProductProjection } from '@commercetools/platform-sdk';
import { fetchProducts } from '../../api/apiService';
import { createElement, addInnerComponent } from '../../utils/baseComponent';
import { navigateTo } from '../../router/router';

export function createProductCatalog(): HTMLElement {
  const catalogContainer = createElement({
    tag: 'div',
    classNames: ['catalog-container'],
  });

  fetchProducts().then((response: ProductProjection[]) => {
    console.log('Response in createProductCatalog:', response);
    response.forEach(product => {
      let productName = 'No name';
      let productDescription = 'No description';
      let productImage = 'No image';
      let price: string | undefined = undefined;
      let discountedPrice: string | undefined = undefined;

      if (product.name && product.name['en-US']) {
        productName = product.name['en-US'];
      }

      if (product.description && product.description['en-US']) {
        productDescription = product.description['en-US'];
      }

      if (
        product.masterVariant.images &&
        product.masterVariant.images[0] &&
        product.masterVariant.images[0].url
      ) {
        productImage = product.masterVariant.images[0].url;
      }

      if (product.masterVariant.prices && product.masterVariant.prices[0] && product.masterVariant.prices[0].value) {
        price = `$${(product.masterVariant.prices[0].value.centAmount / 100).toFixed(2)}`;
      }

      if (product.masterVariant.prices && product.masterVariant.prices[0] && product.masterVariant.prices[0].discounted) {
        discountedPrice = `$${(product.masterVariant.prices[0].discounted.value.centAmount / 100).toFixed(2)}`;
      }

      const productCard = createElement({
        tag: 'div',
        classNames: ['product-card'],
        callbacks: [
          {
            eventType: 'click',
            callback: (): void => navigateTo(`/product/${product.id}`),
          },
        ],
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

      const priceContainer = createElement({
        tag: 'div',
        classNames: ['product-price-container'],
      });

      if (discountedPrice) {
        const originalPriceElement = createElement({
          tag: 'p',
          classNames: ['product-original-price'],
          textContent: price,
        });
        const discountedPriceElement = createElement({
          tag: 'p',
          classNames: ['product-discounted-price'],
          textContent: discountedPrice,
        });
        addInnerComponent(priceContainer, originalPriceElement);
        addInnerComponent(priceContainer, discountedPriceElement);
      } else {
        const priceElement = createElement({
          tag: 'p',
          classNames: ['product-price'],
          textContent: price,
        });
        addInnerComponent(priceContainer, priceElement);
      }

      addInnerComponent(productCard, imageElement);
      addInnerComponent(productCard, nameElement);
      addInnerComponent(productCard, descriptionElement);
      addInnerComponent(productCard, priceContainer);

      addInnerComponent(catalogContainer, productCard);
    });
  }).catch(error => {
    console.error('Error creating product catalog:', error);
    catalogContainer.innerHTML = 'Error loading catalog';
  });

  return catalogContainer;
}
