import {
  createElement,
  ElementParams,
  addInnerComponent,
} from '../../utils/general/baseComponent';
import { createSwiper } from './createSwiperProductDetailedPage';
import { createIconContainer } from '../../utils/general/createIconContainer';
import { Category, ClientResponse, Product } from '@commercetools/platform-sdk';
import { generateBreadcrumbLinks } from '../breadcrumbs/breadcrumbs';
import { isCustomError } from '../../utils/general/customError';
import { showToast } from '../toast/toast';
import { RoutePaths } from '../../types/types';
import { addToCart } from '../../api/apiService';
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
        categoryResponses,
      }: {
        swiperContainer: HTMLElement;
        response: ClientResponse<Product>;
        categoryResponses: ClientResponse<Category>[];
      }) => {
        const replaceDashWithPlus = (text: string): string =>
          text.replace(/-/g, '+');
        const breadcrumbs = [
          { name: 'home', url: RoutePaths.Main },
          { name: 'catalog', url: '/catalog' },
        ];

        if (categoryResponses.length > 0) {
          breadcrumbs.push({
            name: categoryResponses[0].body.name['en-US'],
            url: `/catalog?category=${replaceDashWithPlus(categoryResponses[0].body.name['en-US'])}`,
          });
        }

        if (categoryResponses.length > 1) {
          breadcrumbs.push({
            name: categoryResponses[1].body.name['en-US'],
            url: `/catalog?category=${replaceDashWithPlus(categoryResponses[1].body.name['en-US'])}`,
          });
        }
        const breadCrumbsContainer = generateBreadcrumbLinks(breadcrumbs);

        const productData = response.body.masterData.current;

        addInnerComponent(detailedProductContainer, breadCrumbsContainer);
        addInnerComponent(detailedProductContainer, swiperContainer);

        const attributes = productData.masterVariant.attributes;
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

        const hasDiscount =
          productData.masterVariant?.prices &&
          productData.masterVariant.prices[0]?.discounted;

        const productPriceParams: ElementParams<'h3'> = {
          tag: 'h3',
          classNames: hasDiscount
            ? ['product_price', 'discounted_price']
            : ['product_price'],
          textContent:
            productData.masterVariant?.prices &&
            productData.masterVariant.prices[0]
              ? `$${(productData.masterVariant.prices[0].value.centAmount / 100).toFixed(2)}`
              : 'Price not available',
        };

        const productDiscountPriceParams: ElementParams<'span'> = {
          tag: 'span',
          classNames: ['discount_price'],
          textContent: hasDiscount
            ? `$${(
                (productData.masterVariant.prices[0]?.discounted?.value
                  .centAmount ?? 0) / 100
              ).toFixed(2)}`
            : '',
        };

        const productPriceContainer = createElement(
          productPriceContainerParams,
        );
        const productPrice = createElement(productPriceParams);
        const productDiscountPrice = createElement(productDiscountPriceParams);

        addInnerComponent(productPriceContainer, productPrice);
        if (hasDiscount) {
          addInnerComponent(productPriceContainer, productDiscountPrice);
        }

        addInnerComponent(descriptionContainer, productTitle);
        addInnerComponent(descriptionContainer, productPriceContainer);

        const productDescriptionText =
          productData.description?.['en-US'] ||
          'There should be a description... But it is missing somehow';

        const productDescriptionParams: ElementParams<'p'> = {
          tag: 'p',
          classNames: ['product_description'],
          textContent: productDescriptionText,
        };
        const productDescription = createElement(productDescriptionParams);

        const sizeContainerParams: ElementParams<'div'> = {
          tag: 'div',
          classNames: ['size_container'],
        };
        const sizeContainer = createElement(sizeContainerParams);

        const sizeTitleParams: ElementParams<'h3'> = {
          tag: 'h3',
          classNames: ['size_title'],
          textContent: 'Choose your size:',
        };
        const sizeTitle = createElement(sizeTitleParams);
        addInnerComponent(sizeContainer, sizeTitle);
        const sizeButtonContainerParams: ElementParams<'div'> = {
          tag: 'div',
          classNames: ['size_button_container'],
        };
        const sizeButtonContainer = createElement(sizeButtonContainerParams);
        addInnerComponent(sizeContainer, sizeButtonContainer);
        const sizes: number[] = [];
        if (productData.masterVariant.attributes) {
          const sizeAttribute = attributes?.find(
            (attr) => attr.name === 'size',
          );
          const firstSize = sizeAttribute ? sizeAttribute.value : undefined;
          sizes.push(firstSize);
        }

        productData.variants.forEach((variant) => {
          if (variant.attributes) {
            variant.attributes.forEach((attribute) => {
              if (attribute.name === 'size' && Array.isArray(attribute.value)) {
                attribute.value.forEach((size: number) => {
                  if (typeof size === 'number') {
                    sizes.push(size);
                  }
                });
              }
            });
          }
        });

        sizes.sort((a, b) => a - b);

        sizes.forEach((size) => {
          const sizeButtonParams: ElementParams<'button'> = {
            tag: 'button',
            classNames: ['size_button'],
            textContent: size.toString(),
          };
          const sizeButton = createElement(sizeButtonParams);
          sizeButton.addEventListener('click', () => {
            const allSizeButtons =
              sizeContainer.querySelectorAll('.size_button');
            allSizeButtons.forEach((btn) => {
              btn.classList.remove('__selected');
            });
            sizeButton.classList.add('__selected');
          });
          addInnerComponent(sizeButtonContainer, sizeButton);
        });
        const addToCartBtnParams: ElementParams<'button'> = {
          tag: 'button',
          classNames: ['add_to_cart', 'button'],
          textContent: 'Add to Cart',
          attributes: {
            type: 'button',
          },
        };
        const errorMessageParams: ElementParams<'span'> = {
          tag: 'span',
          classNames: ['error_message'],
          textContent: 'Choose size first!',
          attributes: {
            style: 'visibility: hidden; color: red;',
          },
        };
        const errorMessage = createElement(errorMessageParams);
        const addToCartBtn = createElement(
          addToCartBtnParams,
        ) as HTMLButtonElement;
        const iconsContainerParams: ElementParams<'div'> = {
          tag: 'div',
          classNames: ['icons_container'],
        };
        addToCartBtn.addEventListener('click', async () => {
          const selectedSizeButton = sizeContainer.querySelector(
            '.size_button.__selected',
          );
          const selectedSize = Number(selectedSizeButton?.innerHTML);

          if (!selectedSizeButton) {
            errorMessage.textContent = 'Please select a size.';
            errorMessage.style.visibility = 'visible';
            return;
          } else {
            errorMessage.style.visibility = 'hidden';
          }
          addToCartBtn.disabled = true;
          errorMessage.textContent = 'Adding to cart, please wait...';
          errorMessage.style.visibility = 'visible';

          try {
            const variants = response.body.masterData.current.masterVariant;
            let variantId = null;

            if (
              variants.attributes?.some(
                (attr) =>
                  attr.name === 'size' && attr.value.includes(selectedSize),
              )
            ) {
              variantId = variants.id;
            }
            if (!variantId && response.body.masterData.current.variants) {
              for (const variant of response.body.masterData.current.variants) {
                if (variant.attributes) {
                  if (
                    variant.attributes.some(
                      (attr) =>
                        attr.name === 'size' &&
                        attr.value.includes(selectedSize),
                    )
                  ) {
                    variantId = variant.id;
                    break;
                  }
                }
              }
            }
            if (variantId) {
              const cartResponse = await addToCart(response.body.id, variantId);

              if (
                cartResponse.statusCode === 200 ||
                cartResponse.statusCode === 201
              ) {
                errorMessage.textContent = 'Successfully added!';
                addToCartBtn.disabled = false;
                errorMessage.style.visibility = 'hidden';
              } else {
                throw new Error('Could not add to cart.');
              }
            } else {
              throw new Error('Size not found in any variant');
            }
          } catch (error) {
            showToast(error);
          }
        });
        const deliveryIconContainer = createIconContainer(
          '../assets/detailedProduct/Delivery.png',
          'Free Delivery',
          '1-2 days',
          ['delivery'],
          ['delivery_icon_container'],
          ['text_container'],
          ['text_top'],
          ['text_bottom'],
        );
        const stockIconContainer = createIconContainer(
          '../assets/detailedProduct/Stock.png',
          'In Stock',
          'Today',
          ['stock'],
          ['stock_icon_container'],
          ['text_container'],
          ['text_top'],
          ['text_bottom'],
        );
        const guaranteedIconContainer = createIconContainer(
          '../assets/detailedProduct/Guaranteed.png',
          'Guaranteed',
          '1 year',
          ['guaranteed'],
          ['guaranteed_icon_container'],
          ['text_container'],
          ['text_top'],
          ['text_bottom'],
        );
        const iconsContainer = createElement(iconsContainerParams);
        addInnerComponent(iconsContainer, deliveryIconContainer);
        addInnerComponent(iconsContainer, stockIconContainer);
        addInnerComponent(iconsContainer, guaranteedIconContainer);

        addInnerComponent(descriptionContainer, sizeContainer);
        addInnerComponent(descriptionContainer, productDescription);
        addInnerComponent(descriptionContainer, errorMessage);
        addInnerComponent(descriptionContainer, addToCartBtn);
        addInnerComponent(descriptionContainer, iconsContainer);

        addInnerComponent(detailedProductContainer, descriptionContainer);
      },
    )
    .catch((error) => {
      if (isCustomError(error)) {
        showToast(error.body.message);
      } else if (error instanceof Error) {
        showToast(error.message);
      } else {
        showToast('An unknown error occurred');
      }
      throw error;
    });

  return detailedProductContainer;
}
