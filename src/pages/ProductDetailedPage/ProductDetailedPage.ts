import {
  createElement,
  ElementParams,
  addInnerComponent,
} from '../../utils/baseComponent';
import { createHeader } from '../../components/header/header';
import { productDetailedPageComponent } from '../../components/ProductDetailedPageComponent/ProductDetailedPageComponent';

export function createDetailedProductPage(
  params?: Record<string, string>,
): HTMLElement {
  if (!params || !params.id) {
    const errorContainer = createElement({
      tag: 'div',
      classNames: ['error'],
      textContent: 'Product ID not found.',
    });
    return errorContainer;
  }

  const productContainerParams: ElementParams<'section'> = {
    tag: 'section',
    classNames: ['product_container'],
  };
  const productContainer = createElement(productContainerParams);
  const header = createHeader();
  productContainer.prepend(header);
  const productDetailedContainer = productDetailedPageComponent(params.id);
  addInnerComponent(productContainer, productDetailedContainer);
  return productContainer;
}
