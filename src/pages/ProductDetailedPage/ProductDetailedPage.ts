import {
  createElement,
  ElementParams,
  addInnerComponent,
} from '../../utils/baseComponent';
import { createHeader } from '../../components/header/header';
import { productDetailedPageComponent } from '../../components/ProductDetailedPageComponent/ProductDetailedPageComponent';
export function createDetailedProductPage(): HTMLElement {
  const productContainerParams: ElementParams<'section'> = {
    tag: 'section',
    classNames: ['product_container'],
  };
  const productContainer = createElement(productContainerParams);
  const header = createHeader();
  const productDetailedContainer = productDetailedPageComponent(
    '797ea592-fba5-4d5a-bc90-474d804362a8',
  );
  productContainer.prepend(header);
  addInnerComponent(productContainer, productDetailedContainer);
  return productContainer;
}
