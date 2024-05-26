import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../utils/baseComponent';
import { buildAddressProfile } from './addressProfile/addressProfile';
import { buildPersonalProfile } from './personalProfile';
export async function buildProfileForm(): Promise<HTMLElement> {
  const infoFormParams: ElementParams<'form'> = {
    tag: 'form',
    classNames: ['profile-container__profile-form'],
    attributes: { id: 'profile-form' },
  };

  const addressProfile = await buildAddressProfile();
  const personalProfile = await buildPersonalProfile();
  const infoForm = createElement(infoFormParams);
  addInnerComponent(infoForm, personalProfile);
  addInnerComponent(infoForm, addressProfile);
  return infoForm;
}
