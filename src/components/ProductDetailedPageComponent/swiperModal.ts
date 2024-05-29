import {
  createElement,
  addInnerComponent,
  ElementParams,
} from '../../utils/baseComponent';
import {
  Pagination,
  Autoplay,
  Mousewheel,
  Navigation,
  Keyboard,
} from 'swiper/modules';
import Swiper from 'swiper';
Swiper.use([Pagination, Autoplay, Mousewheel, Navigation, Keyboard]);

export function modalSwiper(url: string[]): HTMLElement {
  console.log(url, '111111');

  // Create modal overlay
  const modalOverlayParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['modal-overlay'],
  };

  // Create modal container
  const modalContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['modal-container'],
  };

  // Create close button
  const closeButtonParams: ElementParams<'button'> = {
    tag: 'button',
    classNames: ['close-button'],
    attributes: {
      type: 'button',
    },
    textContent: '×',
  };

  // Create swiper container
  const swiperParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['swiper-container-modal'],
  };
  const swiperWrapperParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['swiper-wrapper'],
  };
  const swiperSlideParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['swiper-slide', 'modal'],
  };
  const swiperPaginationParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['swiper-pagination-modal'],
  };

  const swiperNavigationPrevParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['swiper-button-prev'],
  };
  const swiperNavigationNextParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['swiper-button-next'],
  };
  const swiperNavigationPrevContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['swiper-button-prev-container-modal'],
  };
  const swiperNavigationNextContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['swiper-button-next-container-modal'],
  };

  const swiperPagination = createElement(swiperPaginationParams);
  const swiperNavigationPrev = createElement(swiperNavigationPrevParams);
  const swiperNavigationNext = createElement(swiperNavigationNextParams);
  const swiperNavigationPrevContainer = createElement(
    swiperNavigationPrevContainerParams,
  );
  const swiperNavigationNextContainer = createElement(
    swiperNavigationNextContainerParams,
  );
  const swiperWrapper = createElement(swiperWrapperParams);
  const swiperMain = createElement(swiperParams);
  url.forEach((urlimg) => {
    const imgSlideParams: ElementParams<'img'> = {
      tag: 'img',
      attributes: {
        alt: 'Felt Boots Img',
        src: urlimg,
      },
      classNames: ['img-slide-modal'],
    };
    const swiperSlide = createElement(swiperSlideParams);
    const imgSlide = createElement(imgSlideParams);
    addInnerComponent(swiperSlide, imgSlide);
    addInnerComponent(swiperWrapper, swiperSlide);
  });
  addInnerComponent(swiperMain, swiperWrapper);
  addInnerComponent(swiperMain, swiperPagination);
  addInnerComponent(swiperNavigationPrevContainer, swiperNavigationPrev);
  addInnerComponent(swiperNavigationNextContainer, swiperNavigationNext);
  addInnerComponent(swiperMain, swiperNavigationPrevContainer);
  addInnerComponent(swiperMain, swiperNavigationNextContainer);

  const modalOverlay = createElement(modalOverlayParams);
  const modalContainer = createElement(modalContainerParams);
  const closeButton = createElement(closeButtonParams);

  addInnerComponent(modalOverlay, closeButton);
  addInnerComponent(modalContainer, swiperMain);
  addInnerComponent(modalOverlay, modalContainer);

  closeButton.addEventListener('click', () => {
    modalOverlay.style.visibility = 'hidden';
    document.body.style.overflow = 'auto';
  });

  setTimeout(() => {
    new Swiper('.swiper-container-modal', {
      direction: 'horizontal',
      loop: true,
      speed: 1000,
      preventClicks: true,
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      navigation: {
        nextEl: '.swiper-button-next-container-modal',
        prevEl: '.swiper-button-prev-container-modal',
      },
      pagination: {
        el: '.swiper-pagination-modal',
        clickable: true,
      },
      autoplay: {
        delay: 30000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      mousewheel: {
        enabled: true,
        eventsTarget: '.modal-overlay',
      },
      updateOnWindowResize: true,
    });
  }, 0);

  document.body.appendChild(modalOverlay);

  return modalOverlay;
}
