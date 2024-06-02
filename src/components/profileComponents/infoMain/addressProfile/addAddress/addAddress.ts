import { Customer } from '@commercetools/platform-sdk';
import {
  ElementParams,
  createElement,
} from '../../../../../utils/general/baseComponent';
import { findElement } from '../../../../../utils/general/searchElem';
import { addEmptyCountryList } from '../addressProfile';
import { showClick } from '../../../infoEdit/infoEditComponents';
let counter = 0;
export function buildAddAddressBtn(userData: Customer): HTMLElement {
  const addAddressBtnParams: ElementParams<'button'> = {
    tag: 'button',
    classNames: ['profile-header__btn-add-address', 'profile-btn'],
    textContent: 'Add Address',
    attributes: { form: 'profile-form' },
  };
  const addAddressBtn = createElement(addAddressBtnParams) as HTMLButtonElement;
  addAddressBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const elem = e.target as HTMLButtonElement;
    const form = elem.form as HTMLFormElement;
    const newAddress = addEmptyCountryList();
    const addressContainer = findElement(
      form,
      'profile-form__address-prof-container',
    ) as HTMLElement;
    if (newAddress) {
      counter--;
      newAddress.style.order = counter.toString();
      addressContainer.append(newAddress);
    }
    showClick(e, userData);
  });
  return addAddressBtn;
}
