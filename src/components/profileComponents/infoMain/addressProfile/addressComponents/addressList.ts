import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../../../utils/baseComponent';
import { createInput } from '../../../../../utils/createInput';
import countries from 'country-list-js';
export function buildCountriesList(): HTMLElement {
  const countriesListParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['profile__countries-list'],
  };
  const countriesList = createElement(countriesListParams);
  const allCountries = countries.names();
  allCountries.forEach((e) => {
    const countryItemParams: ElementParams<'div'> = {
      tag: 'div',
      classNames: ['profile__countries-item'],
      textContent: e,
    };
    const countryItem = createElement(countryItemParams);
    countriesList.append(countryItem);
  });
  return countriesList;
}

export function buildProfileAddressLoyalt(): [
  HTMLLabelElement,
  HTMLLabelElement,
  HTMLLabelElement,
  HTMLInputElement,
  HTMLInputElement,
  HTMLInputElement,
] {
  const [cityLabel, cityInput] = createInput(
    'City',
    [
      ['profile-form__city-label', 'prof-label'],
      ['profile-form__city-input', 'prof-input'],
    ],
    'city',
  );
  addInnerComponent(cityLabel, cityInput);
  cityInput.setAttribute('readonly', '');
  const [postLabel, postInput] = createInput(
    'Postal Code',
    [
      ['profile-form__post-label', 'prof-label'],
      ['profile-form__post-input', 'prof-input'],
    ],
    'post',
  );
  addInnerComponent(postLabel, postInput);
  postInput.setAttribute('readonly', '');

  const [streetLabel, streetInput] = createInput(
    'Street',
    [
      ['profile-form__street-label', 'prof-label'],
      ['profile-form__street-input', 'prof-input'],
    ],
    'street',
  );
  streetInput.setAttribute('readonly', '');
  addInnerComponent(streetLabel, streetInput);
  return [streetLabel, cityLabel, postLabel, streetInput, cityInput, postInput];
}
