import {
  createElement,
  addInnerComponent,
  ElementParams,
} from '../../utils/general/baseComponent';

interface ReviewCardParams {
  reviewImageSrc: string;
  reviewContent: string;
  reviewName: string;
}

export function createReviewCard(params: ReviewCardParams): HTMLElement {
  const { reviewImageSrc, reviewContent, reviewName } = params;

  const containerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['review-card-container'],
  };
  const reviewCardContainer = createElement(containerParams);

  const imageWrapperParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['review-image-wrapper'],
  };
  const reviewImageWrapper = createElement(imageWrapperParams);

  const imageParams: ElementParams<'img'> = {
    tag: 'img',
    classNames: ['review-image'],
    attributes: {
      src: reviewImageSrc,
      alt: 'reviewer image',
    },
  };
  const reviewImage = createElement(imageParams);

  const heartIconParams: ElementParams<'img'> = {
    tag: 'img',
    classNames: ['heart-icon'],
    attributes: {
      src: '/assets/mainPage/heart.png',
      alt: 'heart icon',
    },
  };
  const heartIcon = createElement(heartIconParams);

  addInnerComponent(reviewImageWrapper, reviewImage);
  addInnerComponent(reviewImageWrapper, heartIcon);

  const contentContainer = createElement({
    tag: 'div',
    classNames: ['review-content'],
  });

  const textContainer = createElement({
    tag: 'div',
    classNames: ['review-text-container'],
  });

  const descriptionParams: ElementParams<'p'> = {
    tag: 'p',
    classNames: ['review-description'],
    textContent: reviewContent,
  };
  const reviewDescription = createElement(descriptionParams);

  const nameParams: ElementParams<'p'> = {
    tag: 'p',
    classNames: ['review-name'],
    textContent: reviewName,
  };
  const reviewNameElement = createElement(nameParams);

  const iconParams: ElementParams<'img'> = {
    tag: 'img',
    classNames: ['review-icon'],
    attributes: {
      src: '/assets/mainPage/stars.png',
      alt: 'five stars',
    },
  };
  const reviewIcon = createElement(iconParams);

  addInnerComponent(textContainer, reviewDescription);
  addInnerComponent(textContainer, reviewNameElement);
  addInnerComponent(contentContainer, textContainer);
  addInnerComponent(contentContainer, reviewIcon);

  addInnerComponent(reviewCardContainer, reviewImageWrapper);
  addInnerComponent(reviewCardContainer, contentContainer);

  return reviewCardContainer;
}

export function createReviewCards(): HTMLElement {
  const reviewCardsContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['review-cards-container'],
  };
  const reviewCardsContainer = createElement(reviewCardsContainerParams);

  const reviewCards = [
    {
      reviewImageSrc: '/assets/mainPage/jason.png',
      reviewContent: `These are boots for real men.
    For those who know the price of success.
    For those who have fallen and risen.
    It doesn't matter how much money you have, what matters is the boots you wear.`,
      reviewName: 'Jason S.',
    },
    {
      reviewImageSrc: '/assets/mainPage/donald.png',
      reviewContent: `When I put on boots from Valenki Store,
      all the women flying with me on a private jet to the beach were simply delighted.
      I charmed them; they couldn't take their eyes off me!`,
      reviewName: 'Donald T.',
    },
    {
      reviewImageSrc: '/assets/mainPage/pavel.png',
      reviewContent: `Simply the best. These boots go perfectly with Stone Island and Burberry.
      They are comfortable to walk in on stage and you look cool.`,
      reviewName: 'Pavel T.',
    },
  ];

  reviewCards.forEach((cardParams) => {
    const reviewCard = createReviewCard(cardParams);
    addInnerComponent(reviewCardsContainer, reviewCard);
  });

  return reviewCardsContainer;
