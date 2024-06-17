import {
  ElementParams,
  createElement,
} from '../../../../../utils/general/baseComponent';
import { findElement } from '../../../../../utils/general/searchElem';
import { addEmptyCountryList } from '../addressProfile';
import {
  fillObjectWithUniqueKeys,
  validStatus,
} from '../../../../../utils/validations/booleanValid';
import {
  CustomerUpdateBody,
  getUserData,
  updateCustomer,
} from '../../../../../api/apiService';
import { randomString } from '../../../../../utils/general/randomId';
import {
  infoReadvalidStatus,
  setInfoReadvalidStatus,
} from '../../../infoEdit/infoBoolean';
let counter = 0;
export async function buildAddAddressBtn(): Promise<HTMLElement> {
  const addAddressBtnParams: ElementParams<'button'> = {
    tag: 'button',
    classNames: ['profile-header__btn-add-address', 'profile-btn'],
    textContent: 'Add Address',
    attributes: { form: 'profile-form' },
  };
  const addAddressBtn = createElement(addAddressBtnParams) as HTMLButtonElement;

  addAddressBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    await addAddress(e);
  });
  return addAddressBtn;
}

async function addAddress(e: Event): Promise<void> {
  const userData = await getUserData();
  if (userData) {
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
    fillObjectWithUniqueKeys(form, false, validStatus);
    const body: CustomerUpdateBody = {
      version: userData.version,
      actions: [
        {
          action: 'addAddress',
          address: {
            key: randomString(),
            city: 'Chose Your Country',
            postalCode: 'Chose Your Country',
            streetName: 'Chose Your Country',
            country: 'AF',
          },
        },
      ],
    };
    await updateCustomer(body);
    const post = findElement(
      newAddress,
      'profile-form__post-input',
    ) as HTMLInputElement;
    const newUSerdata = await getUserData();
    const id = newUSerdata.addresses[newUSerdata.addresses.length - 1].id;

    if (id) {
      post.setAttribute('addressid', id);
    }
    if (infoReadvalidStatus) {
      setInfoReadvalidStatus('name', true);
    }
    elem.setAttribute('disabled', '');
    const saveBtn = document.querySelector(
      '.profile-header__btn-edit',
    ) as HTMLButtonElement;
    saveBtn.textContent = 'Edit';
  }
}
