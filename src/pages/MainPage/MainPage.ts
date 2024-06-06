import {
  addInnerComponent,
  createElement,
  ElementParams,
} from '../../utils/general/baseComponent';
import { createHeader } from '../../components/header/header';
import { createHero } from '../../components/mainPageComponents/hero';
import { createReviewCards } from '../../components/mainPageComponents/reviews';

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
