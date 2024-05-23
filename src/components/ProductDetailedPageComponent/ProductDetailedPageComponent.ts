import {
  createElement,
  ElementParams,
  addInnerComponent,
} from '../../utils/baseComponent';
import { createSwiper } from './createSwiperProductDetailedPage';
import { ClientResponse, Product } from '@commercetools/platform-sdk';

export function productDetailedPageComponent(ID: string): HTMLElement {
  const detailedProductContainerParams: ElementParams<'section'> = {
    tag: 'section',
    classNames: ['product_detailed_container'],
  };
  const detailedProductContainer = createElement(
    detailedProductContainerParams,
  );

  createSwiper(ID)
    .then(
      ({
        swiperContainer,
        response,
      }: {
        swiperContainer: HTMLElement;
        response: ClientResponse<Product>;
      }) => {
        addInnerComponent(detailedProductContainer, swiperContainer);

        const productData = response.body.masterData.current;
        console.log(productData);

        const descriptionContainerParams: ElementParams<'div'> = {
          tag: 'div',
          classNames: ['description_container'],
        };
        const descriptionContainer = createElement(descriptionContainerParams);

        const productTitleParams: ElementParams<'h2'> = {
          tag: 'h2',
          classNames: ['product_title'],
          textContent: productData.name['en-US'] || 'Product Name',
        };
        const productTitle = createElement(productTitleParams);

        const productPriceContainerParams: ElementParams<'div'> = {
          tag: 'div',
          classNames: ['price_container'],
        };

        const productPriceParams: ElementParams<'h3'> = {
          tag: 'h3',
          classNames: ['product_price'],
          textContent:
            productData.masterVariant?.prices &&
            productData.masterVariant.prices[0]
              ? `${(Number(productData.masterVariant.prices[0].value.centAmount) / 100).toFixed(2)} ${productData.masterVariant.prices[0].value.currencyCode}`
              : 'Price not available',
        };

        const productDiscountPriceParams: ElementParams<'span'> = {
          tag: 'span',
          classNames: ['discount_price'],
          textContent:
            productData.masterVariant?.prices &&
            productData.masterVariant.prices[0]?.discounted
              ? `${(Number(productData.masterVariant.prices[0].discounted.value.centAmount) / 100).toFixed(2)} ${productData.masterVariant.prices[0].discounted.value.currencyCode}`
              : '',
        };

        const productPriceContainer = createElement(
          productPriceContainerParams,
        );
        const productPrice = createElement(productPriceParams);
        const productDiscountPrice = createElement(productDiscountPriceParams);

        addInnerComponent(productPriceContainer, productPrice);
        addInnerComponent(productPriceContainer, productDiscountPrice);

        addInnerComponent(descriptionContainer, productTitle);
        addInnerComponent(descriptionContainer, productPriceContainer);
        addInnerComponent(detailedProductContainer, descriptionContainer);
      },
    )
    .catch((error) => {
      console.error('Error creating swiper:', error);
    });

  return detailedProductContainer;
}
