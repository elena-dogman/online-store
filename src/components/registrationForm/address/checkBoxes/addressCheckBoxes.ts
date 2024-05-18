import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../../utils/baseComponent';
import { joinChecked, joinUnchecked } from './checkBoxesComponents';

export function createDefaultCheck(): HTMLElement[] {
  const defaultLabelParams: ElementParams<'label'> = {
    tag: 'label',
    classNames: ['reg-form__default-label', 'reg__label'],
  };
  const defaultLabel = createElement(defaultLabelParams);
  const defaultJoinAddressLabelParams: ElementParams<'label'> = {
    tag: 'label',
    classNames: ['reg-form__join-label', 'default__label'],
    textContent: 'Default join (billing address is the same as shipping address)',
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
  return [defaultLabel, defaultJoinAddressCheck];
}
