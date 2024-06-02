import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../../../utils/general/baseComponent';
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
  const cityLabelParams: ElementParams<'label'> = {
    tag: 'label',
    classNames: ['profile-form__city-label', 'prof-label', 'label-city'],
    attributes: { name: 'city', 'data-validation-type': 'city' },
    textContent: 'City',
  };
  const cityInputParams: ElementParams<'input'> = {
    tag: 'input',
    classNames: ['profile-form__city-input', 'prof-input', 'input-city'],
    attributes: {
      name: 'city',
      'data-validation-type': 'city',
      readonly: '',
      placeholder: 'Enter your City',
    },
  };
  const cityLabel = createElement(cityLabelParams) as HTMLLabelElement;
  const cityInput = createElement(cityInputParams) as HTMLInputElement;
  const profileCityError = createErrorElement();
  addInnerComponent(cityLabel, cityInput);
  addInnerComponent(cityLabel, profileCityError);
  cityInput.addEventListener('input', validateInput);

  const postLabelParams: ElementParams<'label'> = {
    tag: 'label',
    classNames: ['profile-form__post-label', 'prof-label', 'label-post'],
    attributes: { name: 'post', 'data-validation-type': 'post' },
    textContent: 'Post',
  };
  const postInputParams: ElementParams<'input'> = {
    tag: 'input',
    classNames: ['profile-form__post-input', 'prof-input', 'input-post'],
    attributes: {
      name: 'post',
      'data-validation-type': 'post',
      readonly: '',
      placeholder: 'Enter your Post Code',
    },
  };
  const postLabel = createElement(postLabelParams) as HTMLLabelElement;
  const postInput = createElement(postInputParams) as HTMLInputElement;
  postInput.addEventListener('input', validateInput);
  const profilePostError = createErrorElement();
  addInnerComponent(postLabel, postInput);
  addInnerComponent(postLabel, profilePostError);
  const streetLabelParams: ElementParams<'label'> = {
    tag: 'label',
    classNames: ['profile-form__street-label', 'prof-label', 'label-street'],
    attributes: { name: 'street', 'data-validation-type': 'street' },
    textContent: 'Street',
  };
  const streetInputParams: ElementParams<'input'> = {
    tag: 'input',
    classNames: ['profile-form__street-input', 'prof-input', 'input-street'],
    attributes: {
      name: 'street',
      'data-validation-type': 'street',
      readonly: '',
      placeholder: 'Enter your Street',
    },
  };
  const streetLabel = createElement(streetLabelParams) as HTMLLabelElement;
  const streetInput = createElement(streetInputParams) as HTMLInputElement;
  streetInput.addEventListener('input', validateInput);
  const profileStreetError = createErrorElement();
  addInnerComponent(streetLabel, streetInput);
  addInnerComponent(streetLabel, profileStreetError);

  return [streetLabel, cityLabel, postLabel, streetInput, cityInput, postInput];
}
