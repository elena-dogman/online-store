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

export function addCounties(this: HTMLElement): void {
  const countrys = country.names().sort();
  const input = registrationComponent.adressInputCountry;
  const post: HTMLInputElement | HTMLElement =
    registrationComponent.adressInputPost;
  this.textContent = '';
  this.classList.add('--expanded');
  input.classList.add('countrys-input--expanded');
  input.addEventListener('input', searchCountry);
  countrys.forEach((e) => {
    const countrysItem = baseComponent.createElement({
      tag: 'div',
      classNames: ['address__countries-item'],
    });
    countrysItem.textContent = e;
    this.append(countrysItem);
    countrysItem.addEventListener('click', (element) => {
      element.stopPropagation();
      post.removeAttribute('disabled');
      input.classList.remove('countrys-input--expanded');
      this.classList.remove('--expanded');
      this.textContent = countrysItem.textContent;
      this.addEventListener('click', addCounties);
    });
  });

  this.removeEventListener('click', addCounties);
}
