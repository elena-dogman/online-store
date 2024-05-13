import { createElement } from '../../../utils/baseComponent';
import { validateInput } from '../../../utils/validations/validation';
import { addCountries } from './countryList';

interface AddressComponents {
  container: HTMLElement;
  labelStreet: HTMLElement;
  inputStreet: HTMLInputElement;
  labelCity: HTMLElement;
  inputCity: HTMLInputElement;
  labelPost: HTMLElement;
  inputPost: HTMLInputElement;
  labelCountry: HTMLElement;
  listCountry: HTMLElement;
  inputCountry: HTMLInputElement;
  countryWrapper: HTMLElement;
}

function createAddressComponents(type: 'billing' | 'shipping'): AddressComponents {
  const container = createElement({
    tag: 'div',
    classNames: [`${type}__container`],
  });

  const labelStreet = createElement({
    tag: 'label',
    classNames: [`${type}__street-label`, 'reg__label'],
    textContent: 'Address',
  });
  const inputStreet = createElement({
    tag: 'input',
    classNames: [`${type}__street-input`, 'reg-input'],
    attributes: { type: 'text' },
  }) as HTMLInputElement;
  labelStreet.appendChild(inputStreet);

  const labelCity = createElement({
    tag: 'label',
    classNames: [`${type}__city-label`, 'reg__label'],
    textContent: 'City',
  });
  const inputCity = createElement({
    tag: 'input',
    classNames: [`${type}__city-input`, 'reg-input'],
    attributes: { type: 'text' },
  }) as HTMLInputElement;
  labelCity.appendChild(inputCity);

  const labelPost = createElement({
    tag: 'label',
    classNames: [`${type}__post-label`, 'reg__label'],
    textContent: 'Post',
  });
  const inputPost = createElement({
    tag: 'input',
    classNames: [`${type}__post-input`, 'reg-input'],
    attributes: { type: 'text', 'data-validation-type': `${type}Post` },
  }) as HTMLInputElement;
  inputPost.addEventListener('input', function (event) {
    validateInput(event);
  });
  labelPost.appendChild(inputPost);
  const labelCountry = createElement({
    tag: 'label',
    classNames: [`${type}__country-label`, 'reg__label'],
    textContent: `${type === 'billing' ? 'Billing' : 'Shipping'} Country`,
  });
  const listCountry = createElement({
    tag: 'div',
    classNames: [`${type}__countries-list`],
    textContent: 'Choose your country',
  });
  const inputCountry = createElement({
    tag: 'input',
    classNames: [`${type}__countries-input`, 'reg-input'],
    attributes: { type: 'text' },
  }) as HTMLInputElement;
  const countryWrapper = createElement({
    tag: 'div',
    classNames: [`${type}__country-wrapper`],
  });
  countryWrapper.append(inputCountry, listCountry);
  labelCountry.appendChild(countryWrapper);

  inputStreet.addEventListener('input', validateInput);
  inputCity.addEventListener('input', validateInput);
  inputPost.addEventListener('input', validateInput);
  listCountry.addEventListener('click', addCountries);

  container.append(labelCountry, countryWrapper, labelPost, labelCity, labelStreet);

  return {
    container,
    labelStreet,
    inputStreet,
    labelCity,
    inputCity,
    labelPost,
    inputPost,
    labelCountry,
    listCountry,
    inputCountry,
    countryWrapper,
  };
}


export const billingComponents = createAddressComponents('billing');
export const shippingComponents = createAddressComponents('shipping');


export const addressesContainer = createElement({
  tag: 'div',
  classNames: ['addresses-container'],
});
addressesContainer.append(billingComponents.container, shippingComponents.container);
