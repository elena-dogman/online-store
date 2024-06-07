import {
  createElement,
  addInnerComponent,
  ElementParams,
} from '../../utils/general/baseComponent';

interface SaleCardParams {
  saleImageSrc: string;
  saleStickerText: string;
  cardLink: string;
}

export function createSaleCard(params: SaleCardParams): HTMLElement {
  const { saleImageSrc, saleStickerText, cardLink } = params;

  const containerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['sale-card-container'],
  };
  const saleCardContainer = createElement(containerParams);

  const imageParams: ElementParams<'img'> = {
    tag: 'img',
    classNames: ['sale-image'],
    attributes: {
      src: saleImageSrc,
      alt: 'Product on sale image',
    },
  };
  const saleImage = createElement(imageParams);

  const saleStickerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['sale-sticker'],
    textContent: saleStickerText,
  };
  const saleSticker = createElement(saleStickerParams);

  const saleButtonParams: ElementParams<'button'> = {
    tag: 'button',
    classNames: ['sale-button'],
    textContent: 'Shop now',
    attributes: {
      type: 'button',
    },
  };
  const saleButton = createElement(saleButtonParams);

  saleCardContainer.addEventListener('click', () => {
    window.location.href = cardLink;
  });

  saleButton.addEventListener('click', (event) => {
    event.stopPropagation();
    window.location.href = cardLink;
  });

  addInnerComponent(saleCardContainer, saleSticker);
  addInnerComponent(saleCardContainer, saleImage);
  addInnerComponent(saleCardContainer, saleButton);

  return saleCardContainer;
}

export function createSaleCards(): HTMLElement {
  const saleCardsWrapperParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['sale-cards-wrapper'],
  };
  const saleCardsWrapper = createElement(saleCardsWrapperParams);

  const saleCardsContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['sale-cards-container'],
  };
  const saleCardsContainer = createElement(saleCardsContainerParams);

  const saleCards = [
    {
      saleImageSrc: '/assets/mainPage/genshin.png',
      saleStickerText: '20% Off Gamer Boots',
      cardLink: '/catalog',
    },
    {
      saleImageSrc: '/assets/mainPage/recording.png',
      saleStickerText: '5% Off RSS Collection',
      cardLink: '/catalog?category=RSS+inspired',
    },
    {
      saleImageSrc: '/assets/mainPage/kitty.png',
      saleStickerText: '10% Off Kids Boots',
      cardLink: '/catalog?category=kids',
    },
  ];

  saleCards.forEach((cardParams) => {
    const saleCard = createSaleCard(cardParams);
    addInnerComponent(saleCardsContainer, saleCard);
  });

  addInnerComponent(saleCardsWrapper, saleCardsContainer);
  return saleCardsWrapper;
}
