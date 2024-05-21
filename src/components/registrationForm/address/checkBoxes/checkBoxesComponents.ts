import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../../utils/baseComponent';
import {
  checkAllInputs,
  setValidStatus,
} from '../../../../utils/validations/booleanValid';
import { billingComponents, shippingComponents } from '../addressFactory';

import { setValidStatusAddress } from '../booleanAddress';

export function joinChecked(): void {
  setValidStatusAddress('joinAdress', true);
  shippingComponents.container.classList.add('shipping__container--join');
  billingComponents.container.classList.add('billing__container--join');
  setValidStatus('city-billing', true);
  setValidStatus('post-billing', true);
  setValidStatus('street-billing', true);
  checkAllInputs();
}

export function joinUnchecked(): void {
  shippingComponents.container.classList.remove('shipping__container--join');
  billingComponents.container.classList.remove('billing__container--join');
  setValidStatus('city-billing', false);
  setValidStatus('post-billing', false);
  setValidStatus('street-billing', false);
  setValidStatusAddress('joinAdress', false);
  checkAllInputs();
}
export function addDefaultChecks(): HTMLElement {
  const checkContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['reg-form__container-checkbox'],
  };
  const defaultBillingLabelParams: ElementParams<'label'> = {
    tag: 'label',
    classNames: ['reg-form__billing-checkbox', 'default__label'],
    textContent: 'Use as default billing address',
  };
  const defaultBillingCheckParams: ElementParams<'input'> = {
    tag: 'input',
    classNames: ['reg-form__billing-checkbox'],
    attributes: { type: 'checkbox' },
  };
  const checkContainer = createElement(checkContainerParams);
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
  const defaultShippingLabelParams: ElementParams<'label'> = {
    tag: 'label',
    classNames: ['reg-form__shipping-checkbox', 'default__label'],
    textContent: 'Use as default shipping address',
  };
  const defaultShippingCheckParams: ElementParams<'input'> = {
    tag: 'input',
    classNames: ['reg-form__shipping-checkbox'],
    attributes: { type: 'checkbox' },
  };
  const defaultShippingLabel = createElement(defaultShippingLabelParams);
  const defaultShippingCheck = createElement(
    defaultShippingCheckParams,
  ) as HTMLInputElement;

  defaultShippingCheck.addEventListener('click', () => {
    if (defaultBillingCheck.checked) {
      setValidStatusAddress('shippingIsDefault', true);
    } else {
      setValidStatusAddress('shippingIsDefault', false);
    }
  });
  addInnerComponent(checkContainer, defaultBillingLabel);
  addInnerComponent(checkContainer, defaultShippingLabel);
  addInnerComponent(defaultBillingLabel, defaultBillingCheck);
  addInnerComponent(defaultShippingLabel, defaultShippingCheck);
  return checkContainer;
}
