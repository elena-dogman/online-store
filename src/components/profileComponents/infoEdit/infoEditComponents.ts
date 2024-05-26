import { searchElement } from '../../../utils/searchElem';
import {
  fillObjectWithUniqueKeys,
  validStatus,
  // validStatus,
} from '../../../utils/validations/booleanValid';
import { addCountriesList } from '../../registrationForm/address/addressComponents';
import { infoReadvalidStatus, setInfoReadvalidStatus } from './infoBoolean';

export function showClick(e: Event): void {
  e.preventDefault();
  const elem = e.target as HTMLButtonElement;
  const form = elem.form as HTMLFormElement;
  fillObjectWithUniqueKeys(form, true, validStatus);
  const name = form.elements.namedItem('Name') as HTMLInputElement;
  const lastName = form.elements.namedItem('Last Name') as HTMLInputElement;
  const date = form.elements.namedItem('Date') as HTMLInputElement;
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

  if (name && lastName && date && post && city && street) {
    toogleReadOnly(
      countries,
      name,
      lastName,
      date,
      ...post,
      ...city,
      ...street,
    );
  }
  changeText(elem);
}

function changeText(text: HTMLButtonElement): void {
  if (text.innerHTML === 'Edit') {
    text.innerHTML = 'Save';
  } else {
    text.innerHTML = 'Edit';
  }
}

function toogleReadOnly(
  countries: HTMLElement[],
  ...args: HTMLInputElement[]
): void {
  if (infoReadvalidStatus.name) {
    args.flat().forEach((e) => {
      e.removeAttribute('readonly');
    });
    countries.forEach((e) => {
      e.classList.remove('readonly');
      e.addEventListener('click', addCountriesList, true);
    });
    setInfoReadvalidStatus('name', false);
  } else {
    args.flat().forEach((e) => {
      e.setAttribute('readonly', '');
    });
    countries.forEach((e) => {
      e.classList.add('readonly');
      e.removeEventListener('click', addCountriesList, true);
    });
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