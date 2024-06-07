import {
  addInnerComponent,
  createElement,
  ElementParams,
} from '../../utils/general/baseComponent';
import { createHeader } from '../../components/header/header';
import { createHero } from '../../components/mainPageComponents/hero';
import { createReviewCards } from '../../components/mainPageComponents/reviews';
import { createSaleCards } from '../../components/mainPageComponents/sale';

export function createMainPage(): HTMLElement {
  const pageContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['main-page-wrapper'],
  };
  const container = createElement(pageContainerParams);

  const header = createHeader();
  addInnerComponent(container, header);

  const hero = createHero();
  addInnerComponent(container, hero);

  const saleHeadingParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['sale-heading'],
    textContent: 'Special Offers',
  };
  const saleHeading = createElement(saleHeadingParams);
  addInnerComponent(container, saleHeading);

  const saleCards = createSaleCards();
  addInnerComponent(container, saleCards);

  const reviewHeadingParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['review-heading'],
    textContent: 'Our Happy Customers',
  };
  const reviewHeading = createElement(reviewHeadingParams);
  addInnerComponent(container, reviewHeading);

  const reviewCards = createReviewCards();
  addInnerComponent(container, reviewCards);

  return container;
}