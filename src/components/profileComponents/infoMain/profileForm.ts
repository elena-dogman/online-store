import { Customer } from '@commercetools/platform-sdk';
import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../utils/general/baseComponent';

import { buildAddressProfile } from './addressProfile/addressProfile';
import { buildPersonalProfile } from './personalProfile/personalProfile';
import {
  fillObjectWithUniqueKeys,
  validStatus,
} from '../../../utils/validations/booleanValid';
export async function buildProfileForm(
  data: Customer,
): Promise<HTMLElement | undefined> {
  const infoFormParams: ElementParams<'form'> = {
    tag: 'form',
    classNames: ['profile-container__profile-form'],
    attributes: { id: 'profile-form' },
  };

  const addressProfile = await buildAddressProfile(data);
  const personalProfile = buildPersonalProfile(data);

  const infoForm = createElement(infoFormParams) as HTMLFormElement;
  addInnerComponent(infoForm, personalProfile);
  addInnerComponent(infoForm, addressProfile);
  fillObjectWithUniqueKeys(infoForm, true, validStatus);
  return infoForm;
}
