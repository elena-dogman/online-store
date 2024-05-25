import { getUserData } from '../../../api/apiService';
import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../utils/baseComponent';
import { checkLength } from './infoComponents';

export function buildProfileHeader(): HTMLElement {
  const profileHeaderParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['profile__header'],
  };
  const profileLogoContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['profile-header__logo-container'],
  };
  const profileLogoImgParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['profile-logo__logo-img'],
    textContent: 'AR',
  };
  const logoUserContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['profile-logo__user-container'],
  };
  const logoUserTitleParams: ElementParams<'h2'> = {
    tag: 'h2',
    classNames: ['profile-logo__user-title'],
    textContent: 'Alex Rawles',
  };
  const logoUserLinkParams: ElementParams<'a'> = {
    tag: 'a',
    classNames: ['profile-logo__user-link', 'link'],
    textContent: 'alexarawles@gmail.com',
  };

  const profileHeader = createElement(profileHeaderParams);
  const profileLogoContainer = createElement(profileLogoContainerParams);
  const profileLogoImg = createElement(profileLogoImgParams);
  const logoUserContainer = createElement(logoUserContainerParams);
  const logoUserTitle = createElement(logoUserTitleParams);
  const logoUserLink = createElement(logoUserLinkParams);
  addInnerComponent(profileHeader, profileLogoContainer);
  addInnerComponent(profileLogoContainer, profileLogoImg);
  addInnerComponent(profileLogoContainer, logoUserContainer);
  addInnerComponent(logoUserContainer, logoUserTitle);
  addInnerComponent(logoUserContainer, logoUserLink);

  const infoHeaderButtonParams: ElementParams<'button'> = {
    tag: 'button',
    classNames: ['profile-header__btn-edit'],
    textContent: 'Edit',
  };
  const infoHeaderButton = createElement(infoHeaderButtonParams);
  getUserData()
    .then((userData) => {
      if (userData) {
        let name = userData.body.firstName ? userData.body.firstName : '';
        let lastName = userData.body.lastName ? userData.body.lastName : '';
        let mail = userData.body.email ? userData.body.email : '';
        profileLogoImg.innerHTML = `${name[0]}${lastName[0]}`;
        logoUserTitle.innerHTML = `${name} ${lastName}`;
        logoUserLink.innerHTML = mail;
        logoUserTitle.innerHTML = checkLength(logoUserTitle.innerHTML);
        logoUserLink.innerHTML = checkLength(logoUserLink.innerHTML);
        name = checkLength(name);
        lastName = checkLength(lastName);
        mail = checkLength(mail);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  addInnerComponent(profileHeader, infoHeaderButton);
  return profileHeader;
}
