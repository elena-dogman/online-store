import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../utils/baseComponent';
import { billing, shipping } from '../registrationForm';
import { setValidStatusAddress } from './booleanAddress';

export function createDefaultChecks(): HTMLElement[] {
  const defaultLabelParams: ElementParams<'label'> = {
    tag: 'label',
    classNames: ['reg-form__default-label', 'reg__label'],
  };
  const defaultLabel = createElement(defaultLabelParams);

  const defaultShippingLabelParams: ElementParams<'label'> = {
    tag: 'label',
    classNames: ['reg-form__default-label', 'default__label'],
    textContent: 'Default Shippiping',
  };
  const defaultShippingCheckParams: ElementParams<'input'> = {
    tag: 'input',
    classNames: ['reg-form__default-label', 'reg__label'],
    attributes: { type: 'checkbox' },
  };

  const defaultShippingLabel = createElement(defaultShippingLabelParams);
  const defaultShippingCheck = createElement(defaultShippingCheckParams);
  addInnerComponent(defaultLabel, defaultShippingLabel);
  addInnerComponent(defaultShippingLabel, defaultShippingCheck);
  const defaultBillingLabelParams: ElementParams<'label'> = {
    tag: 'label',
    classNames: ['reg-form__default-label', 'default__label'],
    textContent: 'Default Billing',
  };
  const defaultBillingCheckParams: ElementParams<'input'> = {
    tag: 'input',
    classNames: ['reg-form__default-label', 'reg__label'],
    attributes: { type: 'checkbox' },
  };

  const defaultBillingLabel = createElement(defaultBillingLabelParams);
  const defaultBillingCheck = createElement(defaultBillingCheckParams);
  addInnerComponent(defaultLabel, defaultBillingLabel);
  addInnerComponent(defaultBillingLabel, defaultBillingCheck);
  const defaultJoinAddressLabelParams: ElementParams<'label'> = {
    tag: 'label',
    classNames: ['reg-form__default-label', 'default__label'],
    textContent: 'Default Join',
  };
  const defaultJoinAddressCheckParams: ElementParams<'input'> = {
    tag: 'input',
    classNames: ['reg-form__default-label', 'reg__label'],
    attributes: { type: 'checkbox' },
  };
  const defaultJoinAddressLabel = createElement(defaultJoinAddressLabelParams);
  const defaultJoinAddressCheck = createElement(
    defaultJoinAddressCheckParams,
  ) as HTMLInputElement;
  defaultJoinAddressCheck.addEventListener('click', () => {
    if (defaultJoinAddressCheck.checked) {
      setValidStatusAddress('joinAdress', true);
      shipping.classList.add('address__shipping--join');
      billing.classList.add('address__billing--join');
      setTimeout(() => {
        billing.classList.add('address__billing--remove');
      }, 400);
    } else {
      billing.classList.remove('address__billing--remove');
      shipping.classList.remove('address__shipping--join');
      setTimeout(() => {
        billing.classList.remove('address__billing--join');
      }, 100);
    }
  });
  addInnerComponent(defaultLabel, defaultJoinAddressLabel);
  addInnerComponent(defaultJoinAddressLabel, defaultJoinAddressCheck);
  return [
    defaultLabel,
    defaultShippingCheck,
    defaultBillingCheck,
    defaultJoinAddressCheck,
  ];
}
