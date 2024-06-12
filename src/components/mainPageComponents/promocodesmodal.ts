import {
  addInnerComponent,
  createElement,
  ElementParams,
} from '../../utils/general/baseComponent';
import { getDiscountCodes } from '../../api/apiService';

export async function createPromoCodesModal(): Promise<HTMLElement> {
  const modalContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['promo-modal-container'],
    textContent: '',
  };
  const modalContainer = createElement(modalContainerParams);

  const modalContentParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['modal-content'],
    textContent: '',
  };
  const modalContent = createElement(modalContentParams);

  const modalHeaderParams: ElementParams<'h2'> = {
    tag: 'h2',
    classNames: ['modal-header'],
    textContent: 'Available Promo Codes',
  };
  const modalHeader = createElement(modalHeaderParams);

  const promoCodes = await getDiscountCodes();
  const promoListParams: ElementParams<'ul'> = {
    tag: 'ul',
    classNames: ['promo-list'],
    textContent: '',
  };
  const promoList = createElement(promoListParams);

  promoCodes.body.results.forEach((promo) => {
    const promoCodeContainerParams: ElementParams<'div'> = {
      tag: 'div',
      classNames: ['promo-code-container'],
    };
    const promoCodeContainer = createElement(promoCodeContainerParams);

    const promoCodeParams: ElementParams<'span'> = {
      tag: 'span',
      classNames: ['promo-code'],
      textContent: promo.code,
    };
    const promoCode = createElement(promoCodeParams);

    const copyIconParams: ElementParams<'img'> = {
      tag: 'img',
      classNames: ['copy-icon'],
      attributes: {
        src: '../assets/mainPage/copy.png',
        alt: 'copy to clipboard icon',
      },
    };
    const copyIcon = createElement(copyIconParams);

    copyIcon.addEventListener('click', () => {
      navigator.clipboard
        .writeText(promo.code)
        .then(() => {
          showSnackbar('Promo code copied!');
        })
        .catch((error) => {
          console.error('Failed to copy promo code: ', error);
        });
    });

    function showSnackbar(message: string): void {
      const snackbar = document.createElement('div');
      snackbar.className = 'snackbar';
      snackbar.textContent = message;
      document.body.appendChild(snackbar);

      snackbar.classList.add('show');

      setTimeout(() => {
        snackbar.classList.remove('show');
        setTimeout(() => {
          snackbar.remove();
        }, 500);
      }, 3000);
    }

    addInnerComponent(promoCodeContainer, promoCode);
    addInnerComponent(promoCodeContainer, copyIcon);

    const promoDescriptionContainerParams: ElementParams<'div'> = {
      tag: 'div',
      classNames: ['promo-description-container'],
    };
    const promoDescriptionContainer = createElement(
      promoDescriptionContainerParams,
    );
    const promoDescriptionParams: ElementParams<'p'> = {
      tag: 'p',
      classNames: ['promo-description'],
      textContent: promo.description ? promo.description['en-US'] : '',
    };
    const promoDescription = createElement(promoDescriptionParams);
    addInnerComponent(promoDescriptionContainer, promoDescription);
    const promoListItemParams: ElementParams<'div'> = {
      tag: 'div',
      classNames: ['promo-item'],
    };
    const promoListItem = createElement(promoListItemParams);
    addInnerComponent(promoListItem, promoCodeContainer);
    addInnerComponent(promoListItem, promoDescriptionContainer);
    addInnerComponent(promoList, promoListItem);
  });

  const closeIconParams: ElementParams<'span'> = {
    tag: 'span',
    classNames: ['close-icon'],
    textContent: '×',
  };
  const closeIcon = createElement(closeIconParams);

  closeIcon.addEventListener('click', () => {
    modalContainer.remove();
    document.body.style.overflow = '';
  });

  addInnerComponent(modalContent, closeIcon);
  addInnerComponent(modalContent, modalHeader);
  addInnerComponent(modalContent, promoList);
  addInnerComponent(modalContainer, modalContent);

  return modalContainer;
}
