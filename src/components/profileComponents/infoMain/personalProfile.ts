import { Customer } from '@commercetools/platform-sdk';
import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../utils/baseComponent';
import { createInput } from '../../../utils/createInput';
import { validateInput } from '../../../utils/validations/validation';
import { createErrorElement } from '../../../utils/validations/validationsErrors';

export function buildPersonalProfile(userData: Customer): HTMLElement {
  const infoPersonalInfContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['profile-form__personal-prof-container'],
  };
  const infoPersonalInfContainer = createElement(
    infoPersonalInfContainerParams,
  );

  const [infoLabelName, infoInputName] = createInput(
    'Name',
    [
      ['profile-form__name-label', 'prof-label'],
      ['profile-form__name-input', 'prof-input'],
    ],
    'name',
  );
  const infoNameError = createErrorElement();
  addInnerComponent(infoPersonalInfContainer, infoLabelName);
  addInnerComponent(infoLabelName, infoInputName);
  addInnerComponent(infoLabelName, infoNameError);
  infoInputName.setAttribute('readonly', '');
  infoInputName.addEventListener('input', validateInput);
  const [infoLabelLastName, infoInputLastName] = createInput(
    'Last Name',
    [
      ['profile-form__last-name-label', 'prof-label'],
      ['profile-form__last-name-input', 'prof-input'],
    ],
    'name',
  );

  const infoLastNameError = createErrorElement();
  addInnerComponent(infoPersonalInfContainer, infoLabelLastName);
  addInnerComponent(infoLabelLastName, infoInputLastName);
  addInnerComponent(infoLabelLastName, infoLastNameError);

  infoInputLastName.setAttribute('readonly', '');
  infoInputLastName.addEventListener('input', validateInput);
  const [infoLabelDate, infoInputDate] = createInput(
    'Date',
    [
      ['profile-form__last-date-label', 'prof-label'],
      ['profile-form__last-date-input', 'prof-input'],
    ],
    'name',
  );

  if (userData) {
    const name = userData.firstName ? userData.firstName : '';
    const lastName = userData.lastName ? userData.lastName : '';
    const date = userData.dateOfBirth ? userData.dateOfBirth : '';
    infoInputName.value = name;
    infoInputLastName.value = lastName;
    infoInputDate.value = date;
  }
  const infoLastDateError = createErrorElement();
  addInnerComponent(infoPersonalInfContainer, infoLabelDate);
  addInnerComponent(infoLabelDate, infoInputDate);
  addInnerComponent(infoLabelDate, infoLastDateError);
  infoInputDate.setAttribute('readonly', '');
  return infoPersonalInfContainer;
}
