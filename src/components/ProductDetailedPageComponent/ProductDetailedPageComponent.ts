import {
  createElement,
  ElementParams,
  addInnerComponent,
} from '../../utils/baseComponent';
import { getDetailedProduct } from '../../api/apiService';
import Swiper from 'swiper';
import { Pagination, Autoplay, Scrollbar } from 'swiper/modules';
import { ClientResponse, Product } from '@commercetools/platform-sdk';
Swiper.use([Pagination, Autoplay, Scrollbar]);
export function productDetailedPageComponent(ID: string): HTMLElement {
  const detailedProductContainerParams: ElementParams<'section'> = {
    tag: 'section',
    classNames: ['product_detailed_container'],
  };
  const detailedProductContainer = createElement(
    detailedProductContainerParams,
  );

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
  const swiperScrollbar = createElement(swiperScrollbarParams);
  const swiperPagination = createElement(swiperPaginationParams);
  const swiperWrapper = createElement(swiperWrapperParams);
  const swiperMain = createElement(swiperParams);

  getDetailedProduct(ID)
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
              classNames: ['img_slide'],
            };
            const imgSlide = createElement(imgSlideParams);
            addInnerComponent(swiperSlide, imgSlide);
            addInnerComponent(swiperWrapper, swiperSlide);
          },
        );

        addInnerComponent(swiperMain, swiperWrapper);
        addInnerComponent(swiperMain, swiperPagination);
        addInnerComponent(swiperMain, swiperScrollbar);
        addInnerComponent(detailedProductContainer, swiperMain);

        new Swiper('.swiper', {
          direction: 'horizontal',
          loop: true,
          speed: 1000,
          pagination: {
            el: '.swiper-pagination',
          },
          autoplay: {
            delay: 3000,
          },
          scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
          },
        });
      }
    })
    .catch((error) => {
      console.error('Error fetching product details:', error);
    });

  return detailedProductContainer;
}
