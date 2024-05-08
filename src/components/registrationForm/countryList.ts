import country from 'country-list-js';
import * as baseComponent from '../../utils/baseComponent';
import * as registrationComponent from './registrationForm';
function searchCountry(this: HTMLInputElement): void {
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

export function addCountries(this: HTMLElement): void {
  const countrys = country.names().sort();
  const input = registrationComponent.adressInputCountry;
  const post: HTMLInputElement | HTMLElement =
    registrationComponent.addressInputPost;
  this.textContent = '';
  this.classList.add('--expanded');
  input.classList.add('countries-input--expanded');
  input.addEventListener('input', searchCountry);
  countrys.forEach((e) => {
    const countriesItem = baseComponent.createElement({
      tag: 'div',
      classNames: ['address__countries-item'],
    });
    countriesItem.textContent = e;
    this.append(countriesItem);
    countriesItem.addEventListener('click', (element) => {
      element.stopPropagation();
      post.removeAttribute('disabled');
      input.classList.remove('countries-input--expanded');
      this.classList.remove('--expanded');
      this.textContent = countriesItem.textContent;
      this.addEventListener('click', addCountries);
    });
  });

  this.removeEventListener('click', addCountries);
}
