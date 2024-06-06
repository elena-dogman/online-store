import {
  ElementParams,
  createElement,
} from '../../../../../utils/general/baseComponent';
import {
  CustomerUpdateBody,
  getUserData,
  updateCustomer,
} from '../../../../../api/apiService';
import {
  checkAllInputs,
  fillObjectWithUniqueKeys,
  validStatus,
} from '../../../../../utils/validations/booleanValid';
import { findElement } from '../../../../../utils/general/searchElem';

export function buildDeleteAddressBtn(): HTMLElement {
  const deleteAddressBtnParams: ElementParams<'button'> = {
    tag: 'button',
    classNames: ['address-prof-container__delete-btn', 'profile-btn'],
    textContent: 'Delete Address',
  };
  const deleteAddressBtn = createElement(deleteAddressBtnParams);
  deleteAddressBtn.addEventListener('click', clickDeleteButton);
  return deleteAddressBtn;
}
async function clickDeleteButton(e: Event): Promise<void> {
  e.preventDefault();
  const elem = e.target as HTMLButtonElement;
  const parent = elem.parentElement as HTMLInputElement;
  const ancestor = parent?.parentElement;
  const form = ancestor?.parentElement as HTMLFormElement;
  const deleteButtons = Array.from(
    ancestor?.querySelectorAll('.address-prof-container__delete-btn') || [],
  );
  const post = findElement(
    parent,
    'profile-form__post-input',
  ) as HTMLInputElement;
  const userData = await getUserData();
  const addressList = userData.addresses.reverse();
  const index = deleteButtons.indexOf(elem);
  const id = post.getAttribute('addressid');
  if (addressList[index]?.id === undefined) {
    parent?.remove();
    fillObjectWithUniqueKeys(form, false, validStatus);
    checkAllInputs();
  } else {
    if (id) {
      const body: CustomerUpdateBody = {
        version: userData.version,
        actions: [
          {
            action: 'removeAddress',
            addressId: id,
          },
        ],
      };
      parent?.remove();
      updateCustomer(body);
      fillObjectWithUniqueKeys(form, false, validStatus);
      console.log(validStatus);
      checkAllInputs();
    }
  }
}
