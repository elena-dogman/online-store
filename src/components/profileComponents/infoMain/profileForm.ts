import { Customer } from '@commercetools/platform-sdk';
import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../utils/usefullFunctions/baseComponent';

import { buildAddressProfile } from './addressProfile/addressProfile';
import { buildPersonalProfile } from './personalProfile/personalProfile';
export async function buildProfileForm(
  data: Customer,
): Promise<HTMLElement | undefined> {
  const infoFormParams: ElementParams<'form'> = {
    tag: 'form',
    classNames: ['profile-container__profile-form'],
    attributes: { id: 'profile-form' },
  };

  const addressProfile = buildAddressProfile(data);
  const personalProfile = buildPersonalProfile(data);

  const infoForm = createElement(infoFormParams);
  addInnerComponent(infoForm, personalProfile);
  addInnerComponent(infoForm, addressProfile);

  return infoForm;
}
