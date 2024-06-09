import { addToCart } from '../../../api/apiService';
import { navigateTo } from '../../../router/router';
import {
  createElement,
  addInnerComponent,
} from '../../../utils/general/baseComponent';
import { ProductProjection } from '@commercetools/platform-sdk';

export function createProductCatalog(
  products: ProductProjection[],
): HTMLElement {
  const catalogContainer = createElement({
    tag: 'div',
    classNames: ['catalog-grid'],
  });

  products.forEach((product) => {
    const productName = product.name?.['en-US'] ?? 'No name';
    const productDescription =
      product.description?.['en-US'] ?? 'No description';
    const productImage = product.masterVariant.images?.[0]?.url ?? 'No image';

    let price: string | undefined = undefined;
    let discountedPrice: string | undefined = undefined;

    if (product.masterVariant.prices && product.masterVariant.prices[0]) {
      const priceObj = product.masterVariant.prices[0];
      price = `$${(priceObj.value.centAmount / 100).toFixed(2)}`;
      if (priceObj.discounted) {
        discountedPrice = `$${(priceObj.discounted.value.centAmount / 100).toFixed(2)}`;
      }
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

    const contentWrapper = createElement({
      tag: 'div',
      classNames: ['product-content-wrapper'],
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

const addToCartButton = createElement({
      tag: 'button',
      classNames: ['add-to-cart-button'],
      textContent: 'ADD TO CART',
       callbacks: [
    {
      eventType: 'click',
      callback: (event: Event): void => {
        const mouseEvent = event as MouseEvent;
        (async (): Promise<void> => {
          mouseEvent.stopPropagation();

          const button = mouseEvent.currentTarget as HTMLButtonElement;
          button.disabled = true;
          button.textContent = 'Adding...';

          try {
            const productId = product.id;
            const variantId = product.masterVariant.id;
            await addToCart(productId, variantId, 1);

            button.textContent = 'Added!';
            setTimeout(() => {
              button.textContent = 'ADD TO CART';
              button.disabled = false;
            }, 2000);
          } catch (error) {
            console.error('Error adding to cart:', error);
            button.textContent = 'Error!';
            setTimeout(() => {
              button.textContent = 'ADD TO CART';
              button.disabled = false;
            }, 2000);
          }
        })();
      },
    },
  ],
});
    addInnerComponent(contentWrapper, imageElement);
    addInnerComponent(contentWrapper, nameElement);
    addInnerComponent(contentWrapper, descriptionElement);
    addInnerComponent(contentWrapper, priceContainer);
    addInnerComponent(productCard, contentWrapper);
    addInnerComponent(productCard, addToCartButton);

    addInnerComponent(catalogContainer, productCard);
  });

  return catalogContainer;
}
