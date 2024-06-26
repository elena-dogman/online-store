import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../../../utils/general/baseComponent';
import { createInput } from '../../../../../utils/general/createInput';
import { randomString } from '../../../../../utils/general/randomId';
import { findElement } from '../../../../../utils/general/searchElem';

export function buildRadioCountry(): [
  HTMLElement,
  HTMLInputElement,
  HTMLInputElement,
  HTMLInputElement,
  HTMLInputElement,
] {
  const checkBoxContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['indicator-container__checkbox-container'],
  };
  const checkBoxContainer = createElement(checkBoxContainerParams);
  const billingCheckBoxContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['billing-checkbox-container'],
  };
  const shippingCheckBoxContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['shipping-checkbox-container'],
  };
  const shippingCheckBoxContainer = createElement(
    shippingCheckBoxContainerParams,
  );
  const billingCheckBoxContainer = createElement(
    billingCheckBoxContainerParams,
  );
  addInnerComponent(checkBoxContainer, shippingCheckBoxContainer);
  addInnerComponent(checkBoxContainer, billingCheckBoxContainer);
  const [defaultShippingLabel, defaultShippingCheckBox] = createInput(
    randomString(),
    [
      [
        'shipping-checkbox-container__default-shipping-label',
        'address-checkbox-label',
      ],
      [
        'shipping-checkbox-container__default-shipping-checkbox',
        'address-checkbox',
      ],
    ],
    'defaultShipping',
    'checkbox',
  );
  defaultShippingLabel.textContent = 'Use as default shipping address';
  addInnerComponent(defaultShippingLabel, defaultShippingCheckBox);
  const [shippingLabel, shippingCheckBox] = createInput(
    randomString(),
    [
      ['shipping-checkbox-container__shipping-label', 'address-checkbox-label'],
      ['shipping-checkbox-container__shipping-checkbox', 'address-checkbox'],
    ],
    'shipping',
    'checkbox',
  );
  shippingLabel.textContent = 'Use as shipping address';
  addInnerComponent(shippingLabel, shippingCheckBox);
  const [defaultBillingLabel, defaultBillingCheckBox] = createInput(
    randomString(),
    [
      [
        'shipping-checkbox-container__default-billing-label',
        'address-checkbox-label',
      ],
      [
        'billing-checkbox-container__default-billing-checkbox',
        'address-checkbox',
      ],
    ],
    'defaultBilling',
    'checkbox',
  );
  defaultBillingLabel.textContent = 'Use as default billing address';
  addInnerComponent(defaultBillingLabel, defaultBillingCheckBox);
  const [billingLabel, billingCheckBox] = createInput(
    randomString(),
    [
      ['billing-checkbox-container__billing-label', 'address-checkbox-label'],
      ['billing-checkbox-container__billing-checkbox', 'address-checkbox'],
    ],
    'billing',
    'checkbox',
  );
  billingLabel.textContent = 'Use as billing address';
  addInnerComponent(billingLabel, billingCheckBox);
  addInnerComponent(shippingCheckBoxContainer, defaultShippingLabel);
  addInnerComponent(shippingCheckBoxContainer, shippingLabel);
  addInnerComponent(billingCheckBoxContainer, defaultBillingLabel);
  addInnerComponent(billingCheckBoxContainer, billingLabel);
  defaultShippingLabel.addEventListener('click', preventLabelDefault);
  shippingLabel.addEventListener('click', preventLabelDefault);
  defaultBillingLabel.addEventListener('click', preventLabelDefault);
  billingLabel.addEventListener('click', preventLabelDefault);
  defaultShippingCheckBox.setAttribute('hide', '');
  defaultBillingCheckBox.setAttribute('hide', '');
  shippingCheckBox.setAttribute('hide', '');
  billingCheckBox.setAttribute('hide', '');
  defaultShippingCheckBox.setAttribute('disabled', '');
  defaultBillingCheckBox.setAttribute('disabled', '');
  shippingCheckBox.setAttribute('disabled', '');
  billingCheckBox.setAttribute('disabled', '');
  defaultShippingCheckBox.removeAttribute('required');
  defaultBillingCheckBox.removeAttribute('required');
  shippingCheckBox.removeAttribute('required');
  billingCheckBox.removeAttribute('required');
  defaultShippingCheckBox.addEventListener('click', toggleCheckBox);
  defaultBillingCheckBox.addEventListener('click', toggleCheckBox);
  shippingCheckBox.addEventListener('click', toggleCheckBox);
  billingCheckBox.addEventListener('click', toggleCheckBox);

  return [
    checkBoxContainer,
    defaultShippingCheckBox,
    defaultBillingCheckBox,
    shippingCheckBox,
    billingCheckBox,
  ];
}
function preventLabelDefault(e: Event): void {
  e.preventDefault();
}
export function toggleCheckBox(e: Event): void {
  e.stopPropagation();
  const elem = e.target as HTMLInputElement;
  if (
    elem.classList.contains(
      'shipping-checkbox-container__default-shipping-checkbox',
    ) ||
    elem.classList.contains(
      'billing-checkbox-container__default-billing-checkbox',
    )
  ) {
    const form = elem.form as HTMLFormElement;
    const similarElems = findElement(
      form,
      elem.classList[0],
      true,
    ) as HTMLInputElement[];
    similarElems.forEach((el) => {
      if (el != elem) {
        el.checked = false;
      }
    });
  }
}
