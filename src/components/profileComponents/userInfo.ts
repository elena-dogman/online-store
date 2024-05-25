import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../utils/baseComponent';
import { buildProfileHeader } from './infoHeader/infoHeader';
import { buildProfileMain } from './infoMain/profileForm';

export async function createInfo(): Promise<HTMLElement> {
  const profileContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['profile-container'],
  };
  const profileContainer = createElement(profileContainerParams);
  const profileWrapperParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['profile-container__profile-wrapper'],
  };
  const profileWrapper = createElement(profileWrapperParams);
  addInnerComponent(profileContainer, profileWrapper);

  addInnerComponent(profileWrapper, buildProfileHeader());
  addInnerComponent(profileWrapper, await buildProfileMain());
  return profileContainer;
}
