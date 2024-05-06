import country from 'country-list-js';
import * as baseComponent from '../../utils/baseComponent';
import * as registrationComponent from './registrationForm';

export function addCounties(this: HTMLElement): void {
  const countrys = country.names();
  const countrysList = registrationComponent.adressListCountry;
  const post: HTMLInputElement | HTMLElement =
    registrationComponent.adressInputPost;
  this.textContent = '';
  this.classList.add('--expanded');
  countrys.forEach((e) => {
    const countrysItem = baseComponent.createElement({
      tag: 'div',
      classNames: ['adress__countrys-item'],
    });
    countrysItem.textContent = e;
    this.append(countrysItem);
    countrysItem.addEventListener('click', (element) => {
      element.stopPropagation();
      post.removeAttribute('disabled');
      this.classList.remove('--expanded');
      this.textContent = countrysItem.textContent;
      this.addEventListener('click', addCounties);
    });
  });

  countrysList.removeEventListener('click', addCounties);
}