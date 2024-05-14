import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../../utils/baseComponent';
import { setValidStatusAddress } from '../booleanAddress';
import { joinChecked, joinUnchecked } from './checkBoxesComponents';

export function createDefaultChecks(): HTMLElement[] {
  const defaultLabelParams: ElementParams<'label'> = {
    tag: 'label',
    classNames: ['reg-form__default-label', 'reg__label'],
  };
  const defaultLabel = createElement(defaultLabelParams);

  const defaultShippingLabelParams: ElementParams<'label'> = {
    tag: 'label',
    classNames: ['reg-form__shipping-label', 'default__label'],
    textContent: 'Default Shipping',
  };
  const defaultShippingCheckParams: ElementParams<'input'> = {
    tag: 'input',
    classNames: ['reg-form__shipping-input'],
    attributes: { type: 'checkbox' },
  };

  const defaultShippingLabel = createElement(defaultShippingLabelParams);
  const defaultShippingCheck = createElement(
    defaultShippingCheckParams,
  ) as HTMLInputElement;
  defaultShippingCheck.addEventListener('click', () => {
    if (defaultShippingCheck.checked) {
      setValidStatusAddress('shippingIsDefault', true);
    } else {
      setValidStatusAddress('shippingIsDefault', false);
    }
  });

  addInnerComponent(defaultLabel, defaultShippingLabel);
  addInnerComponent(defaultShippingLabel, defaultShippingCheck);
  const defaultBillingLabelParams: ElementParams<'label'> = {
    tag: 'label',
    classNames: ['reg-form__billing-checkbox', 'default__label'],
    textContent: 'Default Billing',
  };
  const defaultBillingCheckParams: ElementParams<'input'> = {
    tag: 'input',
    classNames: ['reg-form__billing-checkbox'],
    attributes: { type: 'checkbox' },
  };

  const defaultBillingLabel = createElement(defaultBillingLabelParams);
  const defaultBillingCheck = createElement(
    defaultBillingCheckParams,
  ) as HTMLInputElement;

  defaultBillingCheck.addEventListener('click', () => {
    if (defaultBillingCheck.checked) {
      setValidStatusAddress('billingIsDefault', true);
    } else {
      setValidStatusAddress('billingIsDefault', false);
    }
  });

  addInnerComponent(defaultLabel, defaultBillingLabel);
  addInnerComponent(defaultBillingLabel, defaultBillingCheck);
  const defaultJoinAddressLabelParams: ElementParams<'label'> = {
    tag: 'label',
    classNames: ['reg-form__join-label', 'default__label'],
    textContent: 'Default Join',
  };
  const defaultJoinAddressCheckParams: ElementParams<'input'> = {
    tag: 'input',
    classNames: ['reg-form__join-check'],
    attributes: { type: 'checkbox' },
  };
  const defaultJoinAddressLabel = createElement(defaultJoinAddressLabelParams);
  const defaultJoinAddressCheck = createElement(
    defaultJoinAddressCheckParams,
  ) as HTMLInputElement;

  defaultJoinAddressCheck.addEventListener('click', () => {
    if (defaultJoinAddressCheck.checked) {
      joinChecked();
    } else {
      joinUnchecked();
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
