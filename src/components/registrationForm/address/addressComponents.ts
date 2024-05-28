import country from 'country-list-js';
import { createElement } from '../../../utils/baseComponent';
import { disableLocation } from '../../../utils/validations/validationsComponents';
export function removeList(list: HTMLElement, input: HTMLInputElement): void {
  list.textContent = 'Choose your country';
  list.classList.remove('--expanded');
  input.classList.remove('countries-input--expanded');
}
export function searchCountry(this: HTMLInputElement): void {
  const countyItems = document.querySelectorAll('.address__countries-item');
  const value = this.value.toLowerCase();
  countyItems.forEach((user) => {
    const userText = user.textContent?.toLowerCase() || '';
    let match = true;
    for (let i = 0; i < value.length; i++) {
      if (userText[i] !== value[i]) {
        match = false;
        break;
      }
    }
    if (!match) {
      (user as HTMLElement).style.display = 'none';
    } else {
      (user as HTMLElement).style.display = 'flex';
    }
  });
}
export function addCountriesList(this: HTMLElement): void {
  const countries = country.names().sort();
  const wrapperText = this.textContent as string;
  const input = this.previousSibling as HTMLInputElement;
  const post = this.parentElement?.nextElementSibling
    ?.firstElementChild as HTMLInputElement;
  this.textContent = '';

  this.classList.add('--expanded');
  input.classList.add('countries-input--expanded');
  input.addEventListener('input', searchCountry);
  const clickHandler = (e: Event): void => {
    outClick(e, this, post, input, clickHandler, wrapperText);
  };
  if (this.classList.contains('--expanded')) {
    document.addEventListener('click', clickHandler);
  } else if (!this.classList.contains('--expanded')) {
    console.log(1);
  }
  countries.forEach((e) => {
    const countriesItem = createElement({
      tag: 'div',
      classNames: ['address__countries-item'],
    });
    countriesItem.textContent = e;
    this.append(countriesItem);
    countriesItem.addEventListener('click', (element) => {
      document.removeEventListener('click', clickHandler);
      this.removeEventListener('click', addCountriesList);
      disableLocation(this);
      post.removeAttribute('disabled');
      input.classList.remove('countries-input--expanded');
      this.classList.remove('--expanded');
      this.textContent = countriesItem.textContent;
      element.stopPropagation();
    });
  });
}
function outClick(
  e: Event,
  wrapper: HTMLElement,
  post: HTMLInputElement,
  input: HTMLInputElement,
  clickHandler: (e: Event) => void,
  text: string,
): void {
  console.log(3);
  console.log(wrapper);
  if (e.target !== wrapper) {
    if (e.target == input) {
      console.log(1);
    } else if (wrapper.classList.contains('--expanded')) {
      wrapper.removeEventListener('click', addCountriesList);
      document.removeEventListener('click', clickHandler);
      wrapper.textContent = text;
      post.removeAttribute('disabled');
      input.classList.remove('countries-input--expanded');
      wrapper.classList.remove('--expanded');
    } else {
      wrapper.removeEventListener('click', addCountriesList);
      document.removeEventListener('click', clickHandler);
    }
  }
}
