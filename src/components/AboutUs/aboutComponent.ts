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
    imageSrc: '../assets/about/slider/4.png',
    title: 'Never Say Never',
    text: 'We don’t believe in giving up. When faced with a challenge, our default response is, “Never say never.” We keep pushing, learning, and adapting until we succeed.',
  },
  {
    imageSrc: '../assets/about/slider/5.png',
    title: 'Embrace the Chaos',
    text: "We thrive on chaos! If something can go wrong, we find a way to make it fun. After all, what's a project without a few (hundred) unexpected twists?",
  },
  {
    imageSrc: '../assets/about/slider/6.png',
    title: 'Code Until You’re Cross-eyed',
    text: 'We believe that true dedication shows when you’re staring at code so long it looks like abstract art. Coffee and code marathons are our specialty!',
  },
];
const teamMembers = [
  {
    name: 'Ivan',
    role: 'team spirit',
    details: ['style master', 'ex marine engineer', 'friendly toxic'],
    imageSrc: '../assets/about/members/ivan.jpg',
    github: 'https://github.com/dropthedead',
  },
  {
    name: 'Elena',
    role: 'team lead',
    details: ['agile guru', 'does kickboxing', 'lactose intolerant'],
    imageSrc: '../assets/about/members/elena.jpg',
    github: 'https://github.com/elena-dogman',
  },

  {
    name: 'Leonid',
    role: 'team engine',
    details: ['meeting maestro', 'bibliophile', 'banana hater'],
    imageSrc: '../assets/about/members/leonid.jpg',
    github: 'https://github.com/nesmeian',
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
  In this journey, <a class="no-hash" data-target="our_team">Elena</a> took on the role of team lead, handling the catalog, various project components, 
  and managing agile practices with meticulous updates to the Kanban board.
  <a class="no-hash" data-target="our_team">Ivan</a> developed the detailed page and authentication page, playing a crucial role in ensuring the responsiveness 
  of the project's pages. Meanwhile, <a class="no-hash" data-target="our_team">Leonid</a> developed the profile and registration pages, sparking many of the team's 
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

  function initializeSwiper(): Swiper {
    const screenWidth = window.innerWidth;
    const slidesPerView = screenWidth <= 768 ? 1 : 3;

    const slider = new Swiper('.swiper', {
      direction: 'horizontal',
      loop: true,
      slidesPerView: slidesPerView,
      spaceBetween: 30,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      updateOnWindowResize: true,
    });

    return slider;
  }

  setTimeout(() => {
    const slider = initializeSwiper();

    window.addEventListener('resize', () => {
      slider.params.slidesPerView = window.innerWidth <= 768 ? 1 : 3;
      slider.update();
    });
  }, 0);

  const ourTeamParams: ElementParams<'section'> = {
    tag: 'section',
    classNames: ['our_team'],
    textContent: 'Our Team',
    attributes: {
      id: 'our_team',
    },
  };
  const ourTeamContainer = createElement(ourTeamParams);

  const teamMembersParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['team_members'],
  };
  const teamMembersContainer = createElement(teamMembersParams);
  addInnerComponent(aboutContainer, ourTeamContainer);
  addInnerComponent(ourTeamContainer, teamMembersContainer);

  teamMembers.forEach((member, index) => {
    const classNames = ['team-member'];
    if (index === 0) {
      classNames.push('left');
    } else if (index === 1) {
      classNames.push('top');
    } else if (index === 2) {
      classNames.push('right');
    }

    const memberContainerParams: ElementParams<'div'> = {
      tag: 'div',
      classNames: classNames,
    };
    const memberContainer = createElement(memberContainerParams);
    const memberImageParams: ElementParams<'img'> = {
      tag: 'img',
      attributes: {
        src: member.imageSrc,
        alt: member.name,
      },
      classNames: ['team-member-image'],
    };
    const memberImage = createElement(memberImageParams);

    const memberTextContainerParams: ElementParams<'div'> = {
      tag: 'div',
      classNames: ['text_container'],
    };
    const memberTextContainer = createElement(memberTextContainerParams);

    const memberNameParams: ElementParams<'h3'> = {
      tag: 'h3',
      classNames: ['member_name'],
      textContent: member.name,
    };
    const memberName = createElement(memberNameParams);

    const githubLogoParams: ElementParams<'img'> = {
      tag: 'img',
      attributes: {
        src: '../assets/about/git.png',
        alt: 'GitHub Logo',
        title: 'GitHub Profile',
      },
      classNames: ['github-logo'],
    };
    const githubLogo = createElement(githubLogoParams);

    const githubLinkParams: ElementParams<'a'> = {
      tag: 'a',
      attributes: {
        href: member.github,
        target: '_blank',
      },
    };
    const githubLink = createElement(githubLinkParams);
    addInnerComponent(githubLink, githubLogo);
    addInnerComponent(memberName, githubLink);

    const memberRoleParams: ElementParams<'p'> = {
      tag: 'p',
      classNames: ['member_role'],
      textContent: member.role,
    };
    const memberRole = createElement(memberRoleParams);

    const memberDetailsParams: ElementParams<'ul'> = {
      tag: 'ul',
      classNames: ['member_details'],
    };
    const memberDetails = createElement(memberDetailsParams);

    member.details.forEach((detail) => {
      const detailItemParams: ElementParams<'li'> = {
        tag: 'li',
        textContent: detail,
      };
      const detailItem = createElement(detailItemParams);
      addInnerComponent(memberDetails, detailItem);
    });

    addInnerComponent(memberContainer, memberImage);
    addInnerComponent(memberContainer, memberTextContainer);
    addInnerComponent(memberTextContainer, memberName);
    addInnerComponent(memberTextContainer, memberRole);
    addInnerComponent(memberTextContainer, memberDetails);
    addInnerComponent(teamMembersContainer, memberContainer);
  });
  const bgAnimation = createElement({
    tag: 'div',
    classNames: ['bg-animation'],
  });
  const stars = createElement({ tag: 'div', attributes: { id: 'stars' } });
  const stars2 = createElement({ tag: 'div', attributes: { id: 'stars2' } });
  const stars3 = createElement({ tag: 'div', attributes: { id: 'stars3' } });
  const stars4 = createElement({ tag: 'div', attributes: { id: 'stars4' } });
  addInnerComponent(bgAnimation, stars);
  addInnerComponent(bgAnimation, stars2);
  addInnerComponent(bgAnimation, stars3);
  addInnerComponent(bgAnimation, stars4);
  document.body.appendChild(bgAnimation);

  const makeMagicButtonParams: ElementParams<'button'> = {
    tag: 'button',
    classNames: ['make-magic-button'],
  };
  const magicWandImageParams: ElementParams<'img'> = {
    tag: 'img',
    attributes: {
      src: '../assets/about/magic-wand.png',
      alt: 'Magic Wand',
    },
    classNames: ['magic-wand-image'],
  };
  const magicWandImage = createElement(magicWandImageParams);
  const makeMagicButton = createElement(makeMagicButtonParams);
  addInnerComponent(makeMagicButton, magicWandImage);
  makeMagicButton.addEventListener('click', toggleMagic);
  document.body.appendChild(makeMagicButton);

  const schoolLogoContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['school-logo_container'],
  };
  const schoolLogoContainer = createElement(schoolLogoContainerParams);
  const schoolLogoLinkParams: ElementParams<'a'> = {
    tag: 'a',
    classNames: ['school-logo_link'],
    attributes: {
      href: 'https://rs.school/',
      target: '_blank',
    },
  };
  const schoolLogoLink = createElement(schoolLogoLinkParams);
  const schoolLogoIconParams: ElementParams<'img'> = {
    tag: 'img',
    classNames: ['school-logo_icon'],
    attributes: {
      src: '../assets/about/school_logo.svg',
    },
  };
  const schoolLogoIcon = createElement(schoolLogoIconParams);
  addInnerComponent(schoolLogoLink, schoolLogoIcon);
  addInnerComponent(schoolLogoContainer, schoolLogoLink);
  addInnerComponent(aboutContainer, schoolLogoContainer);
  function toggleMagic(): void {
    const aboutUs = document.querySelector('.about_us');
    if (aboutUs?.classList.contains('magic-active')) {
      aboutUs.classList.remove('magic-active');
      makeMagicButton.style.background = '#ead1eb';
      schoolLogoIcon.style.fill = 'white';
      stopAnimation();
      resetTextColors();
    } else {
      aboutUs?.classList.add('magic-active');
      makeMagicButton.style.background = 'white';
      showAnimation();
      changeTextColors();
    }
  }

  function changeTextColors(): void {
    const textElements = document.querySelectorAll('.magic-text');
    textElements.forEach((element) => {
      element.classList.add('magic-text-white');
    });
  }

  function resetTextColors(): void {
    const textElements = document.querySelectorAll('.magic-text');
    textElements.forEach((element) => {
      element.classList.remove('magic-text-white');
    });
  }
  function stopAnimation(): void {
    bgAnimation.style.opacity = '0';
  }
  function showAnimation(): void {
    bgAnimation.style.opacity = '1';
  }

  window.addEventListener('load', () => {
    aboutContainer.classList.add('visible');
  });

  window.addEventListener('scroll', () => {
    const teamMemberContainers = document.querySelectorAll('.team-member');
    const ourTeamPosition = ourTeamContainer?.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;
    if (ourTeamPosition && ourTeamPosition < screenPosition) {
      ourTeamContainer.classList.add('visible');
      teamMemberContainers.forEach((container, index) => {
        setTimeout(() => {
          container.classList.add('visible');
        }, 100 * index);
      });
    }
  });
  return aboutContainer;
}
