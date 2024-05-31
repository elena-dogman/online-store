import { getUserData } from '../../api/apiService';
import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../utils/baseComponent';
import { buildProfileHeader } from './infoHeader/infoHeader';
import { buildProfileForm } from './infoMain/profileForm';

export async function createInfo(): Promise<HTMLElement | undefined> {
  const profileContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['profile-container'],
  };
  const profileContainer = createElement(profileContainerParams);
  const profileWrapperParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['profile-container__profile-wrapper'],
  };
  try {
    const userData = await getUserData();
    const profileWrapper = createElement(profileWrapperParams);
    const header = await buildProfileHeader(userData);
    const form = await buildProfileForm(userData);
    if (form) {
      addInnerComponent(profileContainer, profileWrapper);
      addInnerComponent(profileWrapper, header);
      addInnerComponent(profileWrapper, form);
    }
    return profileContainer;
  } catch (err) {
    return;
  }
}
