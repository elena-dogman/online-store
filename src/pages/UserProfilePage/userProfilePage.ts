import { createHeader } from '../../components/header/header';
import { createInfo } from '../../components/profileComponents/userInfo';
import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../utils/baseComponent';

export function buildUserProfilePage(): HTMLElement {
  const userProfilePageParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['user-profile-page'],
  };
  const profileImgParams: ElementParams<'img'> = {
    tag: 'img',
    classNames: ['profile__img'],
    attributes: {
      alt: 'Profile Page Background Image',
      src: '/assets/registration/background.jpg',
    },
  };
  const profileImg = createElement(profileImgParams);
  const userProfilePage = createElement(userProfilePageParams);
  const infoContainer = createInfo();
  const header = createHeader();
  addInnerComponent(userProfilePage, header);
  addInnerComponent(userProfilePage, profileImg);
  addInnerComponent(userProfilePage, infoContainer);
  return userProfilePage;
}