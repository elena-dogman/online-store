import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../../../utils/general/baseComponent';
import { createInput } from '../../../../../utils/general/createInput';
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
    'defaultShipping',
    [
      [
        'shipping-checkbox-container__default-shiiping',
        'address-checkbox-label',
      ],
      ['shipping-checkbox-container__default-shiiping', 'address-checkbox'],
    ],
    'defaultShipping',
    'checkbox',
  );
  defaultShippingLabel.textContent = 'Use as default shipping address';
  addInnerComponent(defaultShippingLabel, defaultShippingCheckBox);
  const [shippingLabel, shippingCheckBox] = createInput(
    'shipping',
    [
      ['shipping-checkbox-container__shiiping', 'address-checkbox-label'],
      ['shipping-checkbox-container__shiiping', 'address-checkbox'],
    ],
    'shipping',
    'checkbox',
  );
  shippingLabel.textContent = 'Use as shipping address';
  addInnerComponent(shippingLabel, shippingCheckBox);
  const [defaultBillingLabel, defaultBillingCheckBox] = createInput(
    'defaultBilling',
    [
      [
        'shipping-checkbox-container__default-billing',
        'address-checkbox-label',
      ],
      ['shipping-checkbox-container__default-billing', 'address-checkbox'],
    ],
    'defaultBilling',
    'checkbox',
  );
  defaultBillingLabel.textContent = 'Use as default billing address';
  addInnerComponent(defaultBillingLabel, defaultBillingCheckBox);
  const [billingLabel, billingCheckBox] = createInput(
    'billing',
    [
      ['shipping-checkbox-container__billing', 'address-checkbox-label'],
      ['shipping-checkbox-container__billing', 'address-checkbox'],
    ],
    'billing',
    'checkbox',
  );
  billingLabel.textContent = 'Use as default billing address';
  addInnerComponent(billingLabel, billingCheckBox);
  addInnerComponent(shippingCheckBoxContainer, defaultShippingLabel);
  addInnerComponent(shippingCheckBoxContainer, shippingLabel);
  addInnerComponent(billingCheckBoxContainer, defaultBillingLabel);
  addInnerComponent(billingCheckBoxContainer, billingLabel);
  defaultShippingCheckBox.setAttribute('hide', '');
  defaultBillingCheckBox.setAttribute('hide', '');
  shippingCheckBox.setAttribute('hide', '');
  billingCheckBox.setAttribute('hide', '');
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

function toggleCheckBox(e: Event): void {
  const elem = e.target as HTMLInputElement;
  const ancestor = elem.parentElement?.parentElement as HTMLElement;
  const checkBoxes = findElement(
    ancestor,
    'address-checkbox',
    true,
  ) as HTMLInputElement[];
  for (let i = 0; i < checkBoxes.length; i++) {
    if (elem !== checkBoxes[i]) {
      checkBoxes[i].checked = false;
    }
  }
}
