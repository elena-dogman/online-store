import {
  createElement,
  ElementParams,
  addInnerComponent,
} from '../../utils/baseComponent';
import { getDetailedProduct } from '../../api/apiService';
import Swiper from 'swiper';
import { Pagination, Autoplay, Scrollbar, Mousewheel } from 'swiper/modules';
import { ClientResponse, Product } from '@commercetools/platform-sdk';

Swiper.use([Pagination, Autoplay, Scrollbar, Mousewheel]);

export function createSwiper(
  ID: string,
): Promise<{
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

  const swiperContainer = createElement(swiperContainerParams);
  const swiperScrollbar = createElement(swiperScrollbarParams);
  const swiperPagination = createElement(swiperPaginationParams);
  const swiperWrapper = createElement(swiperWrapperParams);
  const swiperMain = createElement(swiperParams);

  return getDetailedProduct(ID)
    .then((response: ClientResponse<Product> | undefined) => {
      if (response && response.body) {
        response.body.masterData.current.masterVariant.images?.forEach(
          (image) => {
            const swiperSlide = createElement(swiperSlideParams);
            const imgSlideParams: ElementParams<'img'> = {
              tag: 'img',
              attributes: {
                src: image.url,
              },
              classNames: ['img-slide'],
            };
            const imgSlide = createElement(imgSlideParams);
            addInnerComponent(swiperSlide, imgSlide);
            addInnerComponent(swiperWrapper, swiperSlide);
          },
        );

        addInnerComponent(swiperMain, swiperWrapper);
        addInnerComponent(swiperMain, swiperPagination);
        addInnerComponent(swiperMain, swiperScrollbar);
        addInnerComponent(swiperContainer, swiperMain);

        // Ensure the Swiper is initialized after the elements are added to the DOM
        setTimeout(() => {
          new Swiper('.swiper', {
            direction: 'horizontal',
            loop: true,
            speed: 1000,
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
            autoplay: {
              delay: 30000,
              disableOnInteraction: false,
            },
            scrollbar: {
              el: '.swiper-scrollbar',
              draggable: true,
            },
            mousewheel: {
              enabled: true,
              eventsTarget: '.swiper',
            },
          });
        }, 0);

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
