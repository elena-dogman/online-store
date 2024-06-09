import {
  createElement,
  ElementParams,
  addInnerComponent,
} from '../../utils/general/baseComponent';
import { Autoplay, Mousewheel, Keyboard, Navigation } from 'swiper/modules';
import Swiper from 'swiper';
Swiper.use([Autoplay, Mousewheel, Keyboard, Navigation]);

const slidesData = [
  {
    imageSrc: '../assets/about/slider/1.png',
    title: 'Effective communication',
    text: 'Clear and open communication is essential for successful teamwork. We prioritize regular check-ins, active listening, and transparent discussions to ensure that everyone is on the same page.',
  },
  {
    imageSrc: '../assets/about/slider/2.png',
    title: 'Team Spirit and Camaraderie',
    text: 'A strong sense of team spirit and camaraderie is at the heart of our success. We celebrate each other’s achievements, support one another during tough times, and create a positive, collaborative atmosphere that makes our work environment enjoyable and productive.',
  },
  {
    imageSrc: '../assets/about/slider/3.png',
    title: 'Humor and Positivity',
    text: 'We believe that humor and a positive attitude are essential ingredients for a healthy and productive work environment. By encouraging laughter and light-hearted moments, we reduce stress, build stronger bonds, and keep our team’s spirits high. A touch of humor helps us navigate challenges with a smile and keeps our creativity flowing.',
  },
  {
    imageSrc: '../assets/about/slider/1.png',
    title: 'Effective communication',
    text: 'Clear and open communication is essential for successful teamwork. We prioritize regular check-ins, active listening, and transparent discussions to ensure that everyone is on the same page.',
  },
  {
    imageSrc: '../assets/about/slider/2.png',
    title: 'Team Spirit and Camaraderie',
    text: 'A strong sense of team spirit and camaraderie is at the heart of our success. We celebrate each other’s achievements, support one another during tough times, and create a positive, collaborative atmosphere that makes our work environment enjoyable and productive.',
  },
  {
    imageSrc: '../assets/about/slider/3.png',
    title: 'Humor and Positivity',
    text: 'We believe that humor and a positive attitude are essential ingredients for a healthy and productive work environment. By encouraging laughter and light-hearted moments, we reduce stress, build stronger bonds, and keep our team’s spirits high. A touch of humor helps us navigate challenges with a smile and keeps our creativity flowing.',
  },
];

export function aboutComponent(): HTMLElement {
  const aboutContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['about_us_container'],
  };
  const aboutContainer = createElement(aboutContainerParams);

  const missionParams: ElementParams<'section'> = {
    tag: 'section',
    classNames: ['mission_container'],
  };
  const missionHeaderParams: ElementParams<'h2'> = {
    tag: 'h2',
    classNames: ['mission_header'],
    textContent: 'Our Mission',
  };
  const missionTextParams: ElementParams<'p'> = {
    tag: 'p',
    classNames: ['mission_text'],
    textContent: `
      We were never the best. None of us were at the top of RSS scoreboard. None of us had prior experience in web development. 
      But we had a vision - to come together as a team of three underdogs and, through shared learning, create something truly unique. 
      We harnessed each of our strengths and worked together to overcome our weaknesses through collaboration and support. 
      Our mission is to demonstrate that anything is possible if you don’t give up, no matter how challenging it gets. 
      We believe in ourselves - believe in yourself, too.
    `,
  };
  const missionContainer = createElement(missionParams);
  const missionHeader = createElement(missionHeaderParams);
  const missionText = createElement(missionTextParams);
  addInnerComponent(missionContainer, missionHeader);
  addInnerComponent(missionContainer, missionText);

  const buildingTogetherHeaderParams: ElementParams<'h2'> = {
    tag: 'h2',
    classNames: ['mission_header'],
    textContent: 'Building Together',
  };
  const buildingTogetherTextParams: ElementParams<'p'> = {
    tag: 'p',
    classNames: ['building_together_text'],
  };

  const buildingTogetherHeader = createElement(buildingTogetherHeaderParams);
  const buildingTogetherText = createElement(buildingTogetherTextParams);
  buildingTogetherText.innerHTML = `
  In this journey, <a href="#elena">Elena</a> took on the role of team lead, handling the catalog, various project components, 
  and managing agile practices with meticulous updates to the Kanban board. 
  <a href="#ivan">Ivan</a> developed the detailed page and authentication page, playing a crucial role in ensuring the responsiveness 
  of the project's pages. Meanwhile, <a href="#leonid">Leonid</a> developed the profile and registration pages, sparking many of the team's 
  crucial discussions and meetings.
`;
  addInnerComponent(missionContainer, buildingTogetherHeader);
  addInnerComponent(missionContainer, buildingTogetherText);

  const sliderContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['slider-container'],
  };
  const sliderContainer = createElement(sliderContainerParams);
  const swiperParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['swiper'],
  };
  const swiperWrapperParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['swiper-wrapper'],
  };
  const swiper = createElement(swiperParams);
  const swiperWrapper = createElement(swiperWrapperParams);
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
  const swiperNavigationPrev = createElement(swiperNavigationPrevParams);
  const swiperNavigationNext = createElement(swiperNavigationNextParams);
  const swiperNavigationPrevContainer = createElement(
    swiperNavigationPrevContainerParams,
  );
  const swiperNavigationNextContainer = createElement(
    swiperNavigationNextContainerParams,
  );

  slidesData.forEach((slideData) => {
    const slideParams: ElementParams<'div'> = {
      tag: 'div',
      classNames: ['swiper-slide'],
    };
    const slide = createElement(slideParams);

    const imgParams: ElementParams<'img'> = {
      tag: 'img',
      attributes: {
        src: slideData.imageSrc,
        alt: 'Slide Image',
      },
      classNames: ['slide-image'],
    };
    const imgSlide = createElement(imgParams);

    const titleParams: ElementParams<'h2'> = {
      tag: 'h2',
      textContent: slideData.title,
      classNames: ['slide-title'],
    };
    const titleSlide = createElement(titleParams);

    const textParams: ElementParams<'p'> = {
      tag: 'p',
      textContent: slideData.text,
      classNames: ['slide-text'],
    };
    const textSlide = createElement(textParams);

    addInnerComponent(slide, imgSlide);
    addInnerComponent(slide, titleSlide);
    addInnerComponent(slide, textSlide);

    addInnerComponent(swiperWrapper, slide);
  });

  const sliderSectionParams: ElementParams<'section'> = {
    tag: 'section',
    classNames: ['slider'],
  };
  const sliderSection = createElement(sliderSectionParams);

  addInnerComponent(swiper, swiperWrapper);
  addInnerComponent(swiperNavigationNextContainer, swiperNavigationNext);
  addInnerComponent(swiperNavigationPrevContainer, swiperNavigationPrev);
  addInnerComponent(swiper, swiperNavigationPrevContainer);
  addInnerComponent(swiper, swiperNavigationNextContainer);
  addInnerComponent(sliderContainer, swiper);

  addInnerComponent(sliderSection, sliderContainer);

  addInnerComponent(aboutContainer, missionContainer);
  addInnerComponent(aboutContainer, sliderContainer);

  setTimeout(() => {
    new Swiper('.swiper', {
      direction: 'horizontal',
      loop: true,
      slidesPerView: 3,
      spaceBetween: 30,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }, 0);
  return aboutContainer;
}
