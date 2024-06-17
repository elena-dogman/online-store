import {
  createElement,
  addInnerComponent,
  ElementParams,
} from '../../utils/general/baseComponent';
import {
  Pagination,
  Autoplay,
  Mousewheel,
  Navigation,
  Keyboard,
  Zoom,
} from 'swiper/modules';
import Swiper from 'swiper';
Swiper.use([Pagination, Autoplay, Mousewheel, Navigation, Keyboard, Zoom]);

export function modalSwiper(url: string[]): HTMLElement {
  const modalOverlayParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['modal-overlay'],
  };

  const modalContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['modal-container'],
  };

  const closeButtonParams: ElementParams<'button'> = {
    tag: 'button',
    classNames: ['close-button'],
    attributes: {
      type: 'button',
    },
    textContent: '×',
  };

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

    const swiperZoomContainerParams: ElementParams<'div'> = {
      tag: 'div',
      classNames: ['swiper-zoom-container'],
    };
    const swiperZoomContainer = createElement(swiperZoomContainerParams);

    const swiperSlide = createElement(swiperSlideParams);
    const imgSlide = createElement(imgSlideParams);

    addInnerComponent(swiperZoomContainer, imgSlide);
    addInnerComponent(swiperSlide, swiperZoomContainer);
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

  setTimeout(() => {
    const swiper = new Swiper('.swiper-container-modal', {
      direction: 'horizontal',
      loop: true,
      speed: 2000,
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
        delay: 1500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      mousewheel: {
        enabled: true,
        eventsTarget: '.modal-overlay',
      },
      zoom: {
        maxRatio: 2,
      },
      updateOnWindowResize: true,
    });
    let isZoomed = false;
    let isMouseDown = false;

    document
      .querySelectorAll('.swiper-zoom-container')
      .forEach((zoomContainer) => {
        zoomContainer.addEventListener('click', (event) => {
          event.stopPropagation();
          if (!isZoomed) {
            swiper.zoom.in();
            isZoomed = true;
          } else if (isMouseDown) {
            swiper.zoom.out();
            isZoomed = false;
          }
        });
        zoomContainer.addEventListener('mousedown', () => {
          isMouseDown = true;
        });
        zoomContainer.addEventListener('mouseup', () => {
          isMouseDown = false;
        });
      });
    modalContainer.addEventListener('classChange', () => {
      if (modalContainer.classList.contains('zoomed')) {
        closeButton.style.zIndex = '0';
      } else {
        closeButton.style.zIndex = '';
      }
    });

    function triggerClassChange(): void {
      const event = new Event('classChange');
      modalContainer.dispatchEvent(event);
    }

    swiper.on('zoomChange', () => {
      if (swiper.zoom.scale !== 1) {
        modalContainer.classList.remove('zoomed');
        triggerClassChange();
        swiper.autoplay.start();
        swiper.allowSlidePrev = true;
        swiper.allowSlideNext = true;
        swiper.allowTouchMove = true;
        swiper.mousewheel.enable();
      } else {
        modalContainer.classList.add('zoomed');
        triggerClassChange();
        swiper.autoplay.stop();
        swiper.allowSlidePrev = false;
        swiper.allowSlideNext = false;
        swiper.allowTouchMove = false;
        swiper.mousewheel.disable();
      }
    });
    closeButton.addEventListener('click', () => {
      if (swiper) {
        swiper.autoplay.stop();
      }
      modalOverlay.classList.add('hidden');
      modalContainer.classList.add('hidden');
      document.body.style.overflow = 'auto';

      const transitionEndHandler = (): void => {
        modalOverlay.style.visibility = 'hidden';
        modalOverlay.classList.remove('hidden');
        modalContainer.classList.remove('hidden');
        modalContainer.removeEventListener(
          'transitionend',
          transitionEndHandler,
        );
        modalOverlay.removeEventListener('transitionend', transitionEndHandler);
      };
      modalContainer.addEventListener('transitionend', transitionEndHandler);
      modalOverlay.addEventListener('transitionend', transitionEndHandler);
    });
  }, 0);

  document.body.appendChild(modalOverlay);

  return modalOverlay;
}
