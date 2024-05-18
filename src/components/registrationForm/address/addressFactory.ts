import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../utils/baseComponent';
import { validateInput } from '../../../utils/validations/validation';
import { createErrorElement } from '../../../utils/validations/validationsErrors';
import { setValidStatusAddress, validStatusAddress } from './booleanAddress';
import { addCountries } from './countryList';
export interface Components {
  [key: string]: AddressComponents;
}

export interface AddressComponents {
  container: HTMLElement;
  labelStreet: HTMLElement;
  inputStreet: HTMLInputElement;
  errorStreet: HTMLSpanElement;
  labelCity: HTMLElement;
  inputCity: HTMLInputElement;
  errorCity: HTMLSpanElement;
  labelPost: HTMLElement;
  inputPost: HTMLInputElement;
  errorPost: HTMLSpanElement;
  labelCountry: HTMLElement;
  listCountry: HTMLElement;
  inputCountry: HTMLInputElement;
  countryWrapper: HTMLElement;
}

function createAddressComponents(
  type: 'billing' | 'shipping',
): AddressComponents {
  const container = createElement({
    tag: 'div',
    classNames: [`${type}__container`],
  });

  const labelStreet = createElement({
    tag: 'label',
    classNames: [
      `${type}__street-label`,
      'reg__label',
      'street-label',
      'label-street',
    ],
    textContent: 'Address',
  });
  const inputStreet = createElement({
    tag: 'input',
    classNames: [`${type}__street-input`, 'reg-input', 'input-street'],
    attributes: {
      type: 'text',
      'data-validation-type': 'street',
      'validation-element': `${type}`,
      disabled: '',
    },
  }) as HTMLInputElement;
  const errorStreet = createErrorElement();
  labelStreet.append(inputStreet);
  labelStreet.append(errorStreet);

  const labelCity = createElement({
    tag: 'label',
    classNames: [
      `${type}__city-label`,
      'reg__label',
      'city-label',
      'label-city',
    ],
    textContent: 'City',
  });
  const inputCity = createElement({
    tag: 'input',
    classNames: [`${type}__city-input`, 'reg-input', 'input-city'],
    attributes: {
      type: 'text',
      'data-validation-type': 'city',
      'validation-element': `${type}`,
      disabled: '',
    },
  }) as HTMLInputElement;
  const errorCity = createErrorElement();
  labelCity.appendChild(inputCity);
  labelCity.appendChild(errorCity);
  const labelPost = createElement({
    tag: 'label',
    classNames: [`${type}__post-label`, 'reg__label', 'label-post'],
    textContent: 'Post',
  });
  const inputPost = createElement({
    tag: 'input',
    classNames: [`${type}__post-input`, 'reg-input', 'input-post'],
    attributes: {
      type: 'text',
      'data-validation-type': 'post',
      'validation-element': `${type}`,
      disabled: '',
    },
  }) as HTMLInputElement;
  inputPost.addEventListener('input', function (event) {
    validateInput(event);
  });
  const errorPost = createErrorElement();
  labelPost.append(inputPost);
  labelPost.append(errorPost);
  const labelCountry = createElement({
    tag: 'label',
    classNames: [`${type}__country-label`, 'reg__label'],
    textContent: `${type === 'billing' ? 'Billing' : 'Shipping'} address`,
  });
  const listCountry = createElement({
    tag: 'div',
    classNames: [`${type}__countries-list`],
    textContent: 'Choose your country',
  });
  const inputCountry = createElement({
    tag: 'input',
    classNames: [`${type}__countries-input`, 'reg-input'],
    attributes: { type: 'text', placeholder: 'Enter your country ' },
  }) as HTMLInputElement;
  const countryWrapper = createElement({
    tag: 'div',
    classNames: [`${type}__country-wrapper`],
  });
  countryWrapper.append(inputCountry, listCountry);
  labelCountry.append(countryWrapper);

  const defaultBillingLabelParams: ElementParams<'label'> = {
    tag: 'label',
    classNames: [`reg-form__${type}-checkbox`, 'default__label'],
    textContent: ` Use ${type} as default address`,
  };
  const defaultBillingCheckParams: ElementParams<'input'> = {
    tag: 'input',
    classNames: [`reg-form__${type}-checkbox`],
    attributes: { type: 'checkbox' },
  };

  const defaultLabel = createElement(defaultBillingLabelParams);
  const defaultCheck = createElement(
    defaultBillingCheckParams,
  ) as HTMLInputElement;

  defaultCheck.addEventListener('click', () => {
    if (defaultCheck.checked) {
      setValidStatusAddress(`${type}IsDefault`, true);
      console.log(validStatusAddress);
    } else {
      setValidStatusAddress(`${type}IsDefault`, false);
    }
  });

  addInnerComponent(defaultLabel, defaultCheck);

  inputStreet.addEventListener('input', validateInput);
  inputCity.addEventListener('input', validateInput);
  inputPost.addEventListener('input', validateInput);
  listCountry.addEventListener('click', addCountries);
  container.append(
    labelCountry,
    countryWrapper,
    labelPost,
    labelCity,
    labelStreet,
    defaultLabel,
  );

  return {
    container,
    labelStreet,
    inputStreet,
    errorStreet,
    labelCity,
    inputCity,
    errorCity,
    labelPost,
    inputPost,
    errorPost,
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
addressesContainer.append(
  shippingComponents.container,
  billingComponents.container,
);
