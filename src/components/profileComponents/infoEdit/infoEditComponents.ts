import {
  fillObjectWithUniqueKeys,
  validStatus,
  // validStatus,
} from '../../../utils/validations/booleanValid';
import { infoReadvalidStatus, setInfoReadvalidStatus } from './infoBoolean';

export function showClick(e: Event): void {
  e.preventDefault();
  const elem = e.target as HTMLButtonElement;
  const form = elem.form as HTMLFormElement;
  fillObjectWithUniqueKeys(form, true, validStatus);
  console.log(validStatus);
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
  if (name && lastName && date && post && city && street) {
    toogleReadOnly(name, lastName, date, ...post, ...city, ...street);
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

function toogleReadOnly(...args: HTMLInputElement[]): void {
  if (infoReadvalidStatus.name) {
    args.flat().forEach((e) => {
      e.removeAttribute('readonly');
    });
    setInfoReadvalidStatus('name', false);
  } else {
    args.flat().forEach((e) => {
      e.setAttribute('readonly', '');
    });
    setInfoReadvalidStatus('name', true);
  }
}
