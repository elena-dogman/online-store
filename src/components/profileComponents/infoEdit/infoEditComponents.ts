import {
  fillObjectWithUniqueKeys,
  infoReadvalidStatus,
  profileBoolValidation,
  setInfoReadvalidStatus,
} from './infoBoolean';

export function showClick(e: Event): void {
  e.preventDefault();
  const elem = e.target as HTMLButtonElement;
  const form = elem.form as HTMLFormElement;
  fillObjectWithUniqueKeys(form);
  console.log(profileBoolValidation);
  const name = form.elements.namedItem('Name') as HTMLInputElement;
  const lastName = form.elements.namedItem('Last Name') as HTMLInputElement;
  const date = form.elements.namedItem('Date') as HTMLInputElement;
  const country = Array.from(
    form.elements.namedItem('Country') as RadioNodeList,
  ) as HTMLInputElement[];
  const post = Array.from(
    form.elements.namedItem('Postal Code') as RadioNodeList,
  ) as HTMLInputElement[];
  const city = Array.from(
    form.elements.namedItem('City') as RadioNodeList,
  ) as HTMLInputElement[];
  const street = Array.from(
    form.elements.namedItem('Street') as RadioNodeList,
  ) as HTMLInputElement[];
  elem.classList.toggle('btn-edit--active');
  if (name && lastName && date && country && post && city && street) {
    toogleReadOnly(
      name,
      lastName,
      date,
      ...country,
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
