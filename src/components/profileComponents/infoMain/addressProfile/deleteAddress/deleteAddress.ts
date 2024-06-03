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
  const parent = elem.parentElement;
  const ancestor = parent?.parentElement;
  const form = ancestor?.parentElement as HTMLFormElement;
  const deleteButtons = Array.from(
    ancestor?.querySelectorAll('.address-prof-container__delete-btn') || [],
  );
  const userData = await getUserData();
  const addressList = userData.addresses;
  const index = deleteButtons.indexOf(elem);
  if (addressList[index]?.id === undefined) {
    parent?.remove();
    fillObjectWithUniqueKeys(form, false, validStatus);
    checkAllInputs();
  } else {
    const body: CustomerUpdateBody = {
      version: userData.version,
      actions: [
        {
          action: 'removeAddress',
          addressId: addressList[index].id,
        },
      ],
    };
    updateCustomer(body);
    parent?.remove();
    fillObjectWithUniqueKeys(form, false, validStatus);
    checkAllInputs();
  }
}
