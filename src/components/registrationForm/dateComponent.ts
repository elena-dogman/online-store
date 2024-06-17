import {
  ElementParams,
  createElement,
} from '../../utils/general/baseComponent';
import * as errors from '..//..//utils/validations/validationsErrors';
import * as validationFunc from '../../utils/validations/validationsComponents';
import { validateInput } from '../../utils/validations/validation';
const containerForDate = createElement({
  tag: 'label',
  classNames: ['reg-form__date-container'],
});
export const errorDateReg = errors.createErrorElement();
errorDateReg.classList.add('error-date');
export const dayDate = createElement({
  tag: 'input',
  classNames: ['date__day', 'reg-input', 'date-input'],
  attributes: {
    type: 'text',
    maxLength: '2',
    'data-validation-type': 'day',
    hide: '',
  },
});
export const monthDate = createElement({
  tag: 'input',
  classNames: ['date__month', 'reg-input', 'date-input'],
  attributes: {
    type: 'text',
    maxLength: '2',
    'data-validation-type': 'month',
    hide: '',
  },
});
export const yearDate = createElement({
  tag: 'input',
  classNames: ['date__year', 'reg-input', 'date-input'],
  attributes: {
    type: 'text',
    maxLength: '4',
    'data-validation-type': 'year',
  },
});
export function addDate(): HTMLElement {
  const regFormLabelDateParams: ElementParams<'label'> = {
    tag: 'label',
    classNames: ['reg-form__date-label', 'reg__label'],
    textContent: 'Date of birth',
  };

  const regFormLabelDate = createElement(regFormLabelDateParams);
  regFormLabelDate.append(errorDateReg);
  regFormLabelDate.append(containerForDate);
  containerForDate.append(dayDate);
  containerForDate.append(monthDate);
  containerForDate.append(yearDate);
  dayDate.addEventListener('input', validateInput);
  dayDate.addEventListener('input', validationFunc.checkNumber);
  monthDate.addEventListener('input', validateInput);
  monthDate.addEventListener('input', validationFunc.checkNumber);
  yearDate.addEventListener('input', validateInput);
  yearDate.addEventListener('input', validationFunc.checkNumber);
  return regFormLabelDate;
}
