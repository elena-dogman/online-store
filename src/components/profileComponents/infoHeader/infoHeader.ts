import { Customer } from '@commercetools/platform-sdk';
import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../utils/general/baseComponent';
import { createEdit } from '../infoEdit/infoEdit';
import { checkLength } from './infoComponents';
import { buildPasswordBtn } from '../password/password';
import { buildAddAddressBtn } from '../infoMain/addressProfile/addAddress/addAddress';

export async function buildProfileHeader(
  userData: Customer,
): Promise<HTMLElement> {
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
  const buttonContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['profile-header__buttons-container'],
  };
  const buttonContainer = createElement(buttonContainerParams);
  const profileHeader = createElement(profileHeaderParams);
  const profileLogoContainer = createElement(profileLogoContainerParams);
  const profileLogoImg = createElement(profileLogoImgParams);
  const logoUserContainer = createElement(logoUserContainerParams);
  const logoUserTitle = createElement(logoUserTitleParams);
  const logoUserLink = createElement(logoUserLinkParams);
  const editbutton = createEdit() as HTMLButtonElement;
  const passwrodButton = buildPasswordBtn(userData);
  const addAddressButton = await buildAddAddressBtn();
  addInnerComponent(profileHeader, profileLogoContainer);
  addInnerComponent(profileLogoContainer, profileLogoImg);
  addInnerComponent(profileLogoContainer, logoUserContainer);
  addInnerComponent(logoUserContainer, logoUserTitle);
  addInnerComponent(logoUserContainer, logoUserLink);
  addInnerComponent(profileHeader, buttonContainer);
  addInnerComponent(buttonContainer, addAddressButton);
  addInnerComponent(buttonContainer, passwrodButton);
  addInnerComponent(buttonContainer, editbutton);
  let name = userData.firstName ? userData.firstName : '';
  let lastName = userData.lastName ? userData.lastName : '';
  let mail = userData.email ? userData.email : '';
  profileLogoImg.innerHTML = `${name[0]}${lastName[0]}`;
  logoUserTitle.innerHTML = `${name} ${lastName}`;
  logoUserLink.innerHTML = mail;
  logoUserTitle.innerHTML = checkLength(logoUserTitle.innerHTML);
  logoUserLink.innerHTML = checkLength(logoUserLink.innerHTML);
  name = checkLength(name);
  lastName = checkLength(lastName);
  mail = checkLength(mail);
  return profileHeader;
}
