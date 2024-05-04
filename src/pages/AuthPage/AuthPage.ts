import { createAuthForm } from '../../components/AuthPageForm/createAuthPageForm';
import {
  createElement,
  ElementParams,
  addInnerComponent,
} from '../../utils/baseComponent';
import { createHeader } from '../../components/header/header';
export function createAuthPage(): HTMLElement {
  const authSectionContainerParams: ElementParams<'section'> = {
    tag: 'section',
    classNames: ['auth_section'],
  };
  const authSectionContainer = createElement(authSectionContainerParams);
  const imageParams: ElementParams<'img'> = {
    tag: 'img',
    classNames: ['auth_section-background_image'],
    attributes: {
      src: '/assets/witcher_felt_boots_auth_page_2.jpg',
      alt: 'Beautiful Felt Boots',
    },
  };

  const header = createHeader();
  const authFormBgImage = createElement(imageParams);
  const authForm = createAuthForm();

  // here will be validation after function of validation is ready (Lenya is in progress)
  //   authForm[1].addEventListener(
  //     'input', //validateInput)
  //   );
  //   authForm[2].addEventListener(
  //     'input', //validateInput)
  //   );
  //
  authSectionContainer.prepend(header);
  addInnerComponent(authSectionContainer, authFormBgImage);
  addInnerComponent(authSectionContainer, authForm[0]);
  return authSectionContainer;
}
