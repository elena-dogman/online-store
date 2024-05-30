import { Customer } from '@commercetools/platform-sdk';
import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../utils/baseComponent';
import { createInput } from '../../../utils/createInput';
import { validateInput } from '../../../utils/validations/validation';
import { createErrorElement } from '../../../utils/validations/validationsErrors';
import { checkNumber } from '../../../utils/validations/validationsComponents';

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
  const dateLabelContainerParam: ElementParams<'label'> = {
    tag: 'label',
    classNames: ['profile-form__date-label', 'prof-label'],
    textContent: 'Date of Birth',
  };
  const dateLabelContainer = createElement(dateLabelContainerParam);
  const dateContainerParam: ElementParams<'label'> = {
    tag: 'label',
    classNames: ['profile-form__date-container', 'prof-label'],
  };
  const dateContainer = createElement(dateContainerParam);
  const dayParam: ElementParams<'input'> = {
    tag: 'input',
    classNames: ['date__day', 'prof-input', 'date-input'],
    attributes: {
      type: 'text',
      maxLength: '2',
      'data-validation-type': 'day',
      hide: '',
    },
  };
  const monthParam: ElementParams<'input'> = {
    tag: 'input',
    classNames: ['date__month', 'prof-input', 'date-input'],
    attributes: {
      type: 'text',
      maxLength: '2',
      'data-validation-type': 'month',
      hide: '',
    },
  };
  const yearParam: ElementParams<'input'> = {
    tag: 'input',
    classNames: ['date__year', 'prof-input', 'date-input'],
    attributes: {
      type: 'text',
      maxLength: '4',
      'data-validation-type': 'year',
    },
  };

  const day = createElement(dayParam);
  const month = createElement(monthParam);
  const year = createElement(yearParam);

  day.addEventListener('input', checkNumber);
  month.addEventListener('input', checkNumber);
  year.addEventListener('input', checkNumber);
  day.addEventListener('input', checkNumber);
  month.addEventListener('input', checkNumber);
  year.addEventListener('input', checkNumber);
  if (userData) {
    const name = userData.firstName ? userData.firstName : '';
    const lastName = userData.lastName ? userData.lastName : '';
    // const date = userData.dateOfBirth ? userData.dateOfBirth : '';
    infoInputName.value = name;
    infoInputLastName.value = lastName;
    // infoInputDate.value = date;
  }
  const infoLastDateError = createErrorElement();
  addInnerComponent(infoPersonalInfContainer, dateLabelContainer);
  addInnerComponent(dateLabelContainer, infoLastDateError);
  addInnerComponent(dateLabelContainer, dateContainer);
  addInnerComponent(dateContainer, day);
  addInnerComponent(dateContainer, month);
  addInnerComponent(dateContainer, year);
  return infoPersonalInfContainer;
}
