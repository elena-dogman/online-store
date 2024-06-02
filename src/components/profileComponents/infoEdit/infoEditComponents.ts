import { Customer, MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import { CustomerUpdateBody, updateCustomer } from '../../../api/apiService';
import { findElement, searchElement } from '../../../utils/general/searchElem';
import {
  fillObjectWithUniqueKeys,
  validStatus,
} from '../../../utils/validations/booleanValid';
import { addCountriesList } from '../../registrationForm/address/addressComponents';
import { infoReadvalidStatus, setInfoReadvalidStatus } from './infoBoolean';

export function showClick(e: Event, data: Customer): void {
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
  elem.classList.toggle('btn-edit--active');
  const countries = Array.from(getCountriesList(post));

  if (name && lastName && date && post && city && street && email) {
    toggleReadOnly(
      data,
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
  fillObjectWithUniqueKeys(form, false, validStatus);
  changeText(elem);
}

function changeText(text: HTMLButtonElement): void {
  if (text.innerHTML === 'Edit') {
    text.innerHTML = 'Save';
  } else {
    text.innerHTML = 'Edit';
  }
}

function toggleReadOnly(
  data: Customer,
  countries: HTMLElement[],
  ...args: HTMLInputElement[]
): void {
  if (infoReadvalidStatus.name) {
    args.flat().forEach((e) => {
      e.removeAttribute('readonly');
      dateToggleReadonly(e);
    });
    countries.forEach((e) => {
      e.classList.remove('readonly');
      e.addEventListener('click', addCountriesList, true);
    });
    setInfoReadvalidStatus('name', false);
  } else {
    const body: CustomerUpdateBody = {
      version: data.version,
      actions: [],
    };
    const actions = body.actions;
    args.flat().forEach((e) => {
      dateToggleReadonly(e);
      const act = checkInput(e);
      if (act) {
        actions.push(act);
      }
      e.setAttribute('readonly', '');
    });
    countries.forEach((e) => {
      e.classList.add('readonly');
      e.removeEventListener('click', addCountriesList, true);
    });
    updateCustomer(body);
    setInfoReadvalidStatus('name', true);
  }
}
export function getCountriesList(elements: HTMLInputElement[]): HTMLElement[] {
  return elements
    .map((element) => {
      const parent = element.parentElement;
      if (parent && parent.parentElement) {
        return parent.parentElement;
      } else {
        return null;
      }
    })
    .filter((parent): parent is HTMLElement => parent !== null)
    .flatMap((elem) => {
      const wrapper = searchElement(elem, 'country-wrapper');
      return wrapper ? [wrapper] : [];
    })
    .flatMap((elem) => {
      const wrapper = searchElement(elem, 'countries-list');
      return wrapper ? [wrapper] : [];
    })
    .filter((elem): elem is HTMLElement => elem !== undefined);
}
function checkInput(
  elem: HTMLInputElement,
): MyCustomerUpdateAction | undefined {
  if (elem.getAttribute('name') === 'Name') {
    return {
      action: 'setFirstName',
      firstName: elem.value,
    } as MyCustomerUpdateAction;
  } else if (elem.getAttribute('name') === 'Last Name') {
    return {
      action: 'setLastName',
      lastName: elem.value,
    } as MyCustomerUpdateAction;
  } else if (elem.getAttribute('name') === 'Email') {
    return {
      action: 'changeEmail',
      email: elem.value,
    } as MyCustomerUpdateAction;
  } else if (elem.getAttribute('name') === 'Date') {
    const month = elem.previousSibling as HTMLInputElement;
    const day = month?.previousSibling as HTMLInputElement;
    const result = `${elem.value.padStart(4, '0')}-${month.value.padStart(2, '0')}-${day.value.padStart(2, '0')}`;
    return {
      action: 'setDateOfBirth',
      dateOfBirth: result,
    } as MyCustomerUpdateAction;
  }
  return;
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
