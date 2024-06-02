import {
  ElementParams,
  createElement,
} from '../../../../../utils/general/baseComponent';
import {
  CustomerUpdateBody,
  getUserData,
  updateCustomer,
} from '../../../../../api/apiService';

export async function buildDeleteAddressBtn(): Promise<HTMLElement> {
  const userData = await getUserData();
  const deleteAddressBtnParams: ElementParams<'button'> = {
    tag: 'button',
    classNames: ['address-prof-container__delete-btn', 'profile-btn'],
    textContent: 'Delete Address',
  };
  const deleteAddressBtn = createElement(deleteAddressBtnParams);
  deleteAddressBtn.addEventListener('click', (e) => {
    const ancestor = deleteAddressBtn.parentElement?.parentElement;
    const parent = deleteAddressBtn.parentElement;
    const deleteButtons = Array.from(
      ancestor?.querySelectorAll('.address-prof-container__delete-btn') || [],
    );
    const addressList = userData.addresses;
    const elem = e.target as HTMLButtonElement;
    const index = deleteButtons.indexOf(elem);
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
  });
  return deleteAddressBtn;
}
