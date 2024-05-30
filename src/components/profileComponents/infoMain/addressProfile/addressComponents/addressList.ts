import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../../../utils/baseComponent';
import { createInput } from '../../../../../utils/createInput';
import countries from 'country-list-js';
import { validateInput } from '../../../../../utils/validations/validation';
import { createErrorElement } from '../../../../../utils/validations/validationsErrors';
export function buildCountriesList(): HTMLElement {
  const countriesListParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['profile__countries-list', 'countries-list'],
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
    'city',
    [
      ['profile-form__city-label', 'prof-label', 'label-city'],
      ['profile-form__city-input', 'prof-input', 'input-city'],
    ],
    'city',
  );
  const profileCityError = createErrorElement();
  addInnerComponent(cityLabel, cityInput);
  addInnerComponent(cityLabel, profileCityError);
  cityInput.setAttribute('readonly', '');
  cityInput.addEventListener('input', validateInput);
  const [postLabel, postInput] = createInput(
    'post',
    [
      ['profile-form__post-label', 'prof-label', 'label-post'],
      ['profile-form__post-input', 'prof-input', 'input-post'],
    ],
    'post',
  );
  const profilePostError = createErrorElement();
  addInnerComponent(postLabel, postInput);
  addInnerComponent(postLabel, profilePostError);
  postInput.setAttribute('readonly', '');
  postInput.addEventListener('input', validateInput);
  const [streetLabel, streetInput] = createInput(
    'street',
    [
      ['profile-form__street-label', 'prof-label', 'label-street'],
      ['profile-form__street-input', 'prof-input', 'input-street'],
    ],
    'street',
  );
  streetInput.setAttribute('readonly', '');
  streetInput.addEventListener('input', validateInput);
  const profileStreetError = createErrorElement();
  addInnerComponent(streetLabel, streetInput);
  addInnerComponent(streetLabel, profileStreetError);

  return [streetLabel, cityLabel, postLabel, streetInput, cityInput, postInput];
}
