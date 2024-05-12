import { addCountries } from './countryList';
import * as billingComponents from './billing';
import * as shippingComponents from './shipping';
import country from 'country-list-js';
import { disableLocation } from '../../../utils/validations/validationsComponents';
import { Input, createElement } from '../../../utils/baseComponent';
export function removeList(list: HTMLElement, input: HTMLInputElement): void {
  list.textContent = 'Choose your country';
  list.classList.remove('--expanded');
  list.removeEventListener('click', addCountries);
  list.addEventListener('click', addCountries);
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
export function addBillingCountries(countriesWrap: HTMLElement): void {
  disableLocation('billing');
  const countries = country.names().sort();
  const input: Input = billingComponents.billingInputCountry;
  const post: Input = billingComponents.billingInputPost;
  countriesWrap.textContent = '';
  countriesWrap.classList.add('--expanded');
  input.classList.add('countries-input--expanded');
  input.addEventListener('input', searchCountry);
  countries.forEach((e) => {
    const countriesItem = createElement({
      tag: 'div',
      classNames: ['address__countries-item'],
    });
    countriesItem.textContent = e;
    countriesWrap.append(countriesItem);
    countriesItem.addEventListener('click', (element) => {
      element.stopPropagation();
      post.removeAttribute('disabled');
      input.classList.remove('countries-input--expanded');
      countriesWrap.classList.remove('--expanded');
      countriesWrap.textContent = countriesItem.textContent;
      countriesWrap.addEventListener('click', addCountries);
    });
  });
  countriesWrap.removeEventListener('click', addCountries);
}
export function addShippingCountries(countriesWrap: HTMLElement): void {
  disableLocation('shipping');
  const countries = country.names().sort();
  const input = shippingComponents.shippingInputCountry;
  const post: Input = shippingComponents.shippingInputPost;
  countriesWrap.textContent = '';
  countriesWrap.classList.add('--expanded');
  input.classList.add('countries-input--expanded');
  input.addEventListener('input', searchCountry);
  countries.forEach((e) => {
    const countriesItem = createElement({
      tag: 'div',
      classNames: ['address__countries-item'],
    });
    countriesItem.textContent = e;
    countriesWrap.append(countriesItem);
    countriesItem.addEventListener('click', (element) => {
      element.stopPropagation();
      post.removeAttribute('disabled');
      input.classList.remove('countries-input--expanded');
      countriesWrap.classList.remove('--expanded');
      countriesWrap.textContent = countriesItem.textContent;
      countriesWrap.addEventListener('click', addCountries);
    });
  });
  countriesWrap.removeEventListener('click', addCountries);
}
