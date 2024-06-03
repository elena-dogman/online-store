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
let counter = 0;
export function buildAddAddressBtn(): HTMLElement {
  const addAddressBtnParams: ElementParams<'button'> = {
    tag: 'button',
    classNames: ['profile-header__btn-add-address', 'profile-btn'],
    textContent: 'Add Address',
    attributes: { form: 'profile-form' },
  };
  const addAddressBtn = createElement(addAddressBtnParams) as HTMLButtonElement;
  addAddressBtn.addEventListener('click', addAddress);
  return addAddressBtn;
}
async function addAddress(e: Event): Promise<void> {
  e.preventDefault();
  const elem = e.target as HTMLButtonElement;
  const form = elem.form as HTMLFormElement;
  const newAddress = addEmptyCountryList(); // Await the async function call
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
}
