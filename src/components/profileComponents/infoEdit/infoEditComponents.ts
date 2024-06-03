import { Customer, MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import {
  CustomerUpdateBody,
  getUserData,
  updateCustomer,
} from '../../../api/apiService';
import {
  findElement,
  getCountriesList,
} from '../../../utils/general/searchElem';
import {
  checkAllInputs,
  fillObjectWithUniqueKeys,
  validStatus,
} from '../../../utils/validations/booleanValid';

import { addCountriesList } from '../../registrationForm/address/addressComponents';
import { infoReadvalidStatus, setInfoReadvalidStatus } from './infoBoolean';
import countrys from 'country-list-js';
import { randomString } from '../../../utils/general/randomId';
import { isEmptyArray } from '../../../utils/general/filterElem';
export async function showClick(e: Event): Promise<void> {
  e.preventDefault();
  let elem = e.target as HTMLButtonElement;
  if (!elem.classList.contains('profile-header__btn-edit')) {
    setInfoReadvalidStatus('name', true);
    const parent = elem.parentElement as HTMLElement;
    elem = findElement(parent, 'profile-header__btn-edit') as HTMLButtonElement;
    elem.setAttribute('disabled', '');
    elem.textContent = 'Edit';
  }

  const form = elem.form as HTMLFormElement;
  const name = form.elements.namedItem('Name') as HTMLInputElement;
  const lastName = form.elements.namedItem('Last Name') as HTMLInputElement;
  const date = form.elements.namedItem('Date') as HTMLInputElement;
  const email = form.elements.namedItem('Email') as HTMLInputElement;
  const post = Array.from(
    form.elements.namedItem('post') as RadioNodeList,
  ) as HTMLInputElement[];
  const city = Array.from(
    form.elements.namedItem('city') as RadioNodeList,
  ) as HTMLInputElement[];
  const street = Array.from(
    form.elements.namedItem('street') as RadioNodeList,
  ) as HTMLInputElement[];
  const postElem = form.elements.namedItem('post') as HTMLInputElement;
  const cityElem = form.elements.namedItem('city') as HTMLInputElement;
  const streetElem = form.elements.namedItem('street') as HTMLInputElement;
  elem.classList.toggle('btn-edit--active');
  const countrie = [
    findElement(form, 'address-prof__countries-list'),
  ] as HTMLInputElement[];
  const countries = Array.from(getCountriesList(post));
  if (!isEmptyArray(post) && !isEmptyArray(city) && !isEmptyArray(street)) {
    if (name && lastName && date && post && city && street && email) {
      toggleReadOnly(
        countries,
        name,
        lastName,
        date,
        email,
        ...post,
        ...city,
        ...street,
      );
    }
  } else {
    if (
      name &&
      lastName &&
      date &&
      postElem &&
      cityElem &&
      streetElem &&
      email
    ) {
      toggleReadOnly(
        countrie,
        name,
        lastName,
        date,
        email,
        postElem,
        cityElem,
        streetElem,
      );
    }
  }

  fillObjectWithUniqueKeys(form, true, validStatus);
  checkAllInputs();
  changeText(elem);
}

function changeText(text: HTMLButtonElement): void {
  if (text.innerHTML === 'Edit') {
    text.innerHTML = 'Save';
  } else {
    text.innerHTML = 'Edit';
  }
}

async function toggleReadOnly(
  countries: HTMLElement[],
  ...args: HTMLInputElement[]
): Promise<void> {
  const result: MyCustomerUpdateAction[] = [];
  const data = await getUserData();
  if (infoReadvalidStatus.name) {
    args.flat().forEach((e) => {
      e.removeAttribute('readonly');
      dateToggleReadonly(e);
    });
    countries.forEach((e) => {
      e.classList.remove('readonly');
      removeCheckBoxDisabled(e, infoReadvalidStatus.name);
      e.addEventListener('click', addCountriesList, true);
    });
    setInfoReadvalidStatus('name', false);
  } else {
    const body: CustomerUpdateBody = {
      version: data.version,
      actions: [],
    };
    args.flat().forEach((e) => {
      dateToggleReadonly(e);
      const act = checkInput(e, data);
      result.push(...act);
      e.setAttribute('readonly', '');
    });
    countries.forEach((e) => {
      removeCheckBoxDisabled(e, infoReadvalidStatus.name);
      e.classList.add('readonly');
      e.removeEventListener('click', addCountriesList, true);
    });
    body.actions = result;
    updateCustomer(body);
    setInfoReadvalidStatus('name', true);
    console.log(data);
  }
}

function checkInput(
  elem: HTMLInputElement,
  data: Customer,
): MyCustomerUpdateAction[] {
  const result: MyCustomerUpdateAction[] = [];
  if (elem.getAttribute('name') === 'Name') {
    const action: MyCustomerUpdateAction = {
      action: 'setFirstName',
      firstName: elem.value,
    };

    result.push(action);
  } else if (elem.getAttribute('name') === 'Last Name') {
    const action: MyCustomerUpdateAction = {
      action: 'setLastName',
      lastName: elem.value,
    };
    result.push(action);
  } else if (elem.getAttribute('name') === 'Email') {
    const action: MyCustomerUpdateAction = {
      action: 'changeEmail',
      email: elem.value,
    };
    result.push(action);
  } else if (elem.getAttribute('name') === 'Date') {
    const month = elem.previousSibling as HTMLInputElement;
    const day = month?.previousSibling as HTMLInputElement;
    const DOB = `${elem.value.padStart(4, '0')}-${month.value.padStart(2, '0')}-${day.value.padStart(2, '0')}`;
    const action: MyCustomerUpdateAction = {
      action: 'setDateOfBirth',
      dateOfBirth: DOB,
    };
    result.push(action);
  } else if (elem.getAttribute('name') === 'post') {
    const ancestor = elem.parentElement?.parentElement as HTMLElement;
    const indicator = findElement(
      ancestor,
      'address-prof__country-indicator',
    ) as HTMLElement;
    const city = findElement(
      ancestor,
      'profile-form__city-input',
    ) as HTMLInputElement;
    const street = findElement(
      ancestor,
      'profile-form__street-input',
    ) as HTMLInputElement;
    const country = findElement(
      ancestor,
      'address-prof__countries-list',
    ) as HTMLElement;
    const countryNames = countrys.names();
    const countryIndex = countryNames.indexOf(country.textContent);
    const capitalСountries = Object.keys(countrys.all)[countryIndex];
    const id = elem.getAttribute('addressid');
    const billingAddress = data.billingAddressIds;
    const shippingAddressIds = data.shippingAddressIds;
    const shippingDefaultCheck = findElement(
      ancestor,
      'shipping-checkbox-container__default-shipping-checkbox',
    ) as HTMLInputElement;
    const shippingCheck = findElement(
      ancestor,
      'shipping-checkbox-container__shipping-checkbox',
    ) as HTMLInputElement;
    const billingDefaultCheck = findElement(
      ancestor,
      'billing-checkbox-container__default-billing-checkbox',
    ) as HTMLInputElement;
    const billingCheck = findElement(
      ancestor,
      'billing-checkbox-container__billing-checkbox',
    ) as HTMLInputElement;
    console.log(billingCheck);
    if (id) {
      if (billingCheck.checked) {
        const action: MyCustomerUpdateAction = {
          action: 'addBillingAddressId',
          addressId: id,
        };
        console.log(2);
        indicator.textContent = 'Billing Address';
        result.push(action);
      }
      if (
        !billingCheck.checked &&
        billingAddress?.find((element) => element === id)
      ) {
        const action: MyCustomerUpdateAction = {
          action: 'removeBillingAddressId',
          addressId: id,
        };
        console.log(3);
        result.push(action);
      }
      if (shippingDefaultCheck.checked) {
        const action: MyCustomerUpdateAction = {
          action: 'setDefaultShippingAddress',
          addressId: id,
        };
        console.log(4);
        indicator.textContent = 'Default Shipping Address';
        result.push(action);
      }
      if (billingDefaultCheck.checked) {
        const action: MyCustomerUpdateAction = {
          action: 'setDefaultBillingAddress',
          addressId: id,
        };
        indicator.textContent = 'Default Billing Address';
        result.push(action);
      }

      if (shippingCheck.checked) {
        const action: MyCustomerUpdateAction = {
          action: 'addShippingAddressId',
          addressId: id,
        };
        indicator.textContent = ' Shipping Address';
        result.push(action);
      }
      if (
        !shippingCheck.checked &&
        shippingAddressIds?.find((element) => element === id)
      ) {
        const action: MyCustomerUpdateAction = {
          action: 'removeShippingAddressId',
          addressId: id,
        };
        result.push(action);
      }

      if (billingDefaultCheck.checked && shippingDefaultCheck.checked) {
        indicator.textContent = ' Default Shipping and Billing Address';
      }

      if (
        !billingDefaultCheck.checked &&
        !shippingDefaultCheck.checked &&
        !billingCheck.checked &&
        !shippingCheck.checked
      ) {
        indicator.textContent = 'Address';
      }
    }
    if (city && street && id) {
      const action: MyCustomerUpdateAction = {
        action: 'changeAddress',
        addressId: id,
        address: {
          key: randomString(),
          city: city.value,
          postalCode: elem.value,
          streetName: street.value,
          country: capitalСountries,
        },
      };
      result.push(action);
    }
  }
  return result;
}
function dateToggleReadonly(e: HTMLInputElement): void {
  if (e.classList.contains('date__year')) {
    const month = e.previousSibling as HTMLInputElement;
    const day = month?.previousSibling as HTMLInputElement;
    if (infoReadvalidStatus.name) {
      month?.removeAttribute('readonly');
      day?.removeAttribute('readonly');
    } else {
      month?.setAttribute('readonly', '');
      day?.setAttribute('readonly', '');
    }
  }
}
function removeCheckBoxDisabled(e: HTMLElement, status: boolean): void {
  const parent = e.parentElement as HTMLElement;
  const defaultShipping = findElement(
    parent,
    'shipping-checkbox-container__default-shipping-checkbox',
  ) as HTMLInputElement;
  const shipping = findElement(
    parent,
    'shipping-checkbox-container__shipping-checkbox',
  ) as HTMLInputElement;
  const defaultBilling = findElement(
    parent,
    'billing-checkbox-container__billing-checkbox',
  ) as HTMLInputElement;
  const billing = findElement(
    parent,
    'billing-checkbox-container__default-billing-checkbox',
  ) as HTMLInputElement;
  if (status) {
    defaultShipping.removeAttribute('disabled');
    shipping.removeAttribute('disabled');
    defaultBilling.removeAttribute('disabled');
    billing.removeAttribute('disabled');
  } else {
    defaultShipping.setAttribute('disabled', '');
    shipping.setAttribute('disabled', '');
    defaultBilling.setAttribute('disabled', '');
    billing.setAttribute('disabled', '');
  }
}
