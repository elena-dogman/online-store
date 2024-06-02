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

export async function buildDeleteAddressBtn(): Promise<HTMLElement> {
  const userData = await getUserData();
  const deleteAddressBtnParams: ElementParams<'button'> = {
    tag: 'button',
    classNames: ['address-prof-container__delete-btn', 'profile-btn'],
    textContent: 'Delete Address',
  };
  const deleteAddressBtn = createElement(deleteAddressBtnParams);
  deleteAddressBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const parent = deleteAddressBtn.parentElement;
    const ancestor = parent?.parentElement;
    const form = ancestor?.parentElement as HTMLFormElement;
    console.log(form);
    const deleteButtons = Array.from(
      ancestor?.querySelectorAll('.address-prof-container__delete-btn') || [],
    );
    // const formBtn = findElement(form, '.profile-header__btn-edit');
    // console.log(formBtn);
    const addressList = userData.addresses;
    const elem = e.target as HTMLButtonElement;
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
      console.log(validStatus);
      fillObjectWithUniqueKeys(form, false, validStatus);
      checkAllInputs();
    }
  });
  return deleteAddressBtn;
}
