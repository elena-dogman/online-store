import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../utils/baseComponent';
import { buildProfileHeader } from './infoHeader/infoHeader';
import { buildProfileForm } from './infoMain/profileForm';

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
  const header = await buildProfileHeader();
  const form = await buildProfileForm();
  addInnerComponent(profileContainer, profileWrapper);
  addInnerComponent(profileWrapper, header);
  addInnerComponent(profileWrapper, form);
  return profileContainer;
}
