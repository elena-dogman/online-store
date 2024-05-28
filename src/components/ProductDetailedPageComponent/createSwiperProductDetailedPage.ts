import {
  createElement,
  ElementParams,
  addInnerComponent,
} from '../../utils/baseComponent';
import { getDetailedProduct } from '../../api/apiService';
import Swiper from 'swiper';
import {
  Pagination,
  Autoplay,
  Scrollbar,
  Mousewheel,
  EffectCube,
  Navigation,
  Keyboard,
} from 'swiper/modules';
import { ClientResponse, Product } from '@commercetools/platform-sdk';
import { modalSwiper } from './swiperModal';
Swiper.use([
  Pagination,
  Autoplay,
  Scrollbar,
  Mousewheel,
  EffectCube,
  Navigation,
  Keyboard,
]);

export function createSwiper(ID: string): Promise<{
  swiperContainer: HTMLElement;
  response: ClientResponse<Product>;
}> {
  const swiperContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['swiper-container'],
  };
  const swiperParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['swiper'],
  };
  const swiperWrapperParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['swiper-wrapper'],
  };
  const swiperSlideParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['swiper-slide'],
  };
  const swiperPaginationParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['swiper-pagination'],
  };
  const swiperScrollbarParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['swiper-scrollbar'],
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
    classNames: ['swiper-button-prev-container'],
  };
  const swiperNavigationNextContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['swiper-button-next-container'],
  };

  const swiperContainer = createElement(swiperContainerParams);
  const swiperScrollbar = createElement(swiperScrollbarParams);
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
  const imgArray: string[] = [];
  return getDetailedProduct(ID)
    .then((response: ClientResponse<Product> | undefined) => {
      if (response && response.body) {
        response.body.masterData.current.masterVariant.images?.forEach(
          (image) => {
            const swiperSlide = createElement(swiperSlideParams);
            const swiperZoomContainerParams: ElementParams<'div'> = {
              tag: 'div',
              classNames: ['swiper-zoom-container'],
            };
            const swiperZoomContainer = createElement(
              swiperZoomContainerParams,
            );

            const imgSlideParams: ElementParams<'img'> = {
              tag: 'img',
              attributes: {
                alt: 'Felt Boots Img',
                src: image.url,
              },
              classNames: ['img-slide'],
            };

            imgArray.push(image.url);
            const imgSlide = createElement(imgSlideParams);

            addInnerComponent(swiperZoomContainer, imgSlide);
            addInnerComponent(swiperSlide, swiperZoomContainer);
            addInnerComponent(swiperWrapper, swiperSlide);
          },
        );
        const modalOverlay = modalSwiper(imgArray);
        document.querySelector('#app')?.append(modalOverlay);
        addInnerComponent(swiperMain, swiperWrapper);
        addInnerComponent(swiperMain, swiperPagination);
        addInnerComponent(swiperNavigationPrevContainer, swiperNavigationPrev);
        addInnerComponent(swiperNavigationNextContainer, swiperNavigationNext);
        addInnerComponent(swiperMain, swiperNavigationPrevContainer);
        addInnerComponent(swiperMain, swiperNavigationNextContainer);
        addInnerComponent(swiperMain, swiperScrollbar);
        addInnerComponent(swiperContainer, swiperMain);

        setTimeout(() => {
          new Swiper('.swiper', {
            direction: 'horizontal',
            loop: true,
            speed: 1000,
            preventClicks: true,
            keyboard: {
              enabled: false,
              onlyInViewport: true,
            },
            effect: 'cube',
            cubeEffect: {
              slideShadows: true,
            },
            navigation: {
              nextEl: '.swiper-button-next-container',
              prevEl: '.swiper-button-prev-container',
            },
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
            autoplay: {
              delay: 300000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            },
            scrollbar: {
              el: '.swiper-scrollbar',
              draggable: true,
            },
            mousewheel: {
              enabled: true,
              eventsTarget: '.swiper',
            },
            updateOnWindowResize: true,
            preventClicksPropagation: true,
            simulateTouch: true,
            resizeObserver: true,
            grabCursor: true,
          });
        }, 0);
        swiperWrapper.addEventListener('click', (e) => {
          e.preventDefault();
          modalOverlay.style.visibility = 'visible';
        });
        return { swiperContainer, response };
      } else {
        throw new Error('No product details found');
      }
    })
    .catch((error) => {
      console.error('Error fetching product details:', error);
      throw error;
    });
}
