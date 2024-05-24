import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../utils/baseComponent';
import { buildAddressProfile } from './addressProfile/addressProfile';
import { buildPersonalProfile } from './personalProfile';
export function buildProfileMain(): HTMLElement {
  const infoMainParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['profile-container__profile-main'],
  };
  const infoMain = createElement(infoMainParams);
  addInnerComponent(infoMain, buildPersonalProfile());
  addInnerComponent(infoMain, buildAddressProfile());
  return infoMain;
}
