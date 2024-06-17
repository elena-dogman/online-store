import {
  addInnerComponent,
  createElement,
  ElementParams,
} from '../../utils/general/baseComponent';
import { createPromoCodesModal } from './promocodesmodal';
export async function createHero(): Promise<HTMLElement> {
  const containerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['hero-container'],
    textContent: '',
  };
  const heroContainer = createElement(containerParams);

  const imageParams: ElementParams<'img'> = {
    tag: 'img',
    classNames: ['hero-image'],
    attributes: {
      src: '/assets/mainPage/hero-img.png',
      alt: 'Not Found',
    },
  };
  const heroImg = createElement(imageParams);

  const promoCodesBtnParams: ElementParams<'button'> = {
    tag: 'button',
    classNames: ['promo-codes-btn'],
    textContent: 'Promo Codes',
  };
  const promoCodesBtn = createElement(promoCodesBtnParams);

  promoCodesBtn.addEventListener('click', async () => {
    const modal = await createPromoCodesModal();
    modal.style.display = 'block';
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    const handleClickOutside = (event: MouseEvent): void => {
      const modalContent = modal.querySelector('.modal-content');
      if (modalContent && !modalContent.contains(event.target as Node)) {
        modal.remove();
        modal.style.display = 'none';
        document.body.style.overflow = '';
        document.removeEventListener('click', handleClickOutside);
      }
    };
    document.addEventListener('click', handleClickOutside);
  });
  addInnerComponent(heroContainer, heroImg);
  addInnerComponent(heroContainer, promoCodesBtn);

  return heroContainer;
}
