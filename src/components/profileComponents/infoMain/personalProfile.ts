import { getUserData } from '../../../api/apiService';
import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../utils/baseComponent';
import { createInput } from '../../../utils/createInput';
import { createErrorElement } from '../../../utils/validations/validationsErrors';

export function buildPersonalProfile(): HTMLElement {
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
  const [infoLabelDate, infoInputDate] = createInput(
    'Date',
    [
      ['profile-form__last-date-label', 'prof-label'],
      ['profile-form__last-date-input', 'prof-input'],
    ],
    'name',
  );
  getUserData()
    .then((userData) => {
      if (userData) {
        const name = userData.body.firstName ? userData.body.firstName : '';
        const lastName = userData.body.lastName ? userData.body.lastName : '';
        const date = userData.body.dateOfBirth ? userData.body.dateOfBirth : '';
        infoInputName.value = name;
        infoInputLastName.value = lastName;
        infoInputDate.value = date;
      }
    })
    .catch((erorr) => {
      console.log(erorr);
    });
  const infoLastDateError = createErrorElement();
  addInnerComponent(infoPersonalInfContainer, infoLabelDate);
  addInnerComponent(infoLabelDate, infoInputDate);
  addInnerComponent(infoLabelDate, infoLastDateError);
  infoInputDate.setAttribute('readonly', '');
  return infoPersonalInfContainer;
}
