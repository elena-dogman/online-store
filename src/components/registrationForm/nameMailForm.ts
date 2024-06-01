import { validateInput } from '../../utils/validations/validation';
import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../utils/usefullFunctions/baseComponent';

interface CommonFormComponents {
  container: HTMLDivElement;
  inputName: HTMLInputElement;
  inputLastName: HTMLInputElement;
  inputMail: HTMLInputElement;
  inputPassword: HTMLInputElement;
  passwordIcon: HTMLImageElement;
}
import * as errors from '../../utils/validations/validationsErrors';
export function createCommonFormContainer(): CommonFormComponents {
  const containerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['reg-form__common-inf-container'],
  };
  const container = createElement(containerParams) as HTMLDivElement;
  const namesContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['common-inputs-container__names-container'],
  };
  const labelNameParams: ElementParams<'label'> = {
    tag: 'label',
    classNames: ['names-сontainer__name-label', 'reg__label'],
    textContent: 'Name',
  };
  const inputNameParams: ElementParams<'input'> = {
    tag: 'input',
    classNames: ['names-сontainer-input', 'reg-input', 'common--input'],
    attributes: { type: 'text', 'data-validation-type': 'name' },
  };
  const labelLastNameParams: ElementParams<'label'> = {
    tag: 'label',
    classNames: ['names-сontainer-name-label', 'reg__label'],
    textContent: 'Last Name',
  };
  const inputLastNameParams: ElementParams<'input'> = {
    tag: 'input',
    classNames: [
      'names-сontainer__last-name-input',
      'reg-input',
      'common--input',
    ],
    attributes: {
      type: 'text',
      'data-validation-type': 'lastName',
    },
  };
  const namesContainer = createElement(namesContainerParams);
  const nameLabel = createElement(labelNameParams);
  const inputName = createElement(inputNameParams) as HTMLInputElement;
  const errorName = errors.createErrorElement();

  const lastNameLabel = createElement(labelLastNameParams);
  const inputLastName = createElement(inputLastNameParams) as HTMLInputElement;
  const errorLastName = errors.createErrorElement();
  addInnerComponent(container, namesContainer);

  addInnerComponent(namesContainer, nameLabel);
  addInnerComponent(nameLabel, inputName);
  addInnerComponent(nameLabel, errorName);

  addInnerComponent(namesContainer, lastNameLabel);
  addInnerComponent(lastNameLabel, inputLastName);
  addInnerComponent(lastNameLabel, errorLastName);

  inputName.addEventListener('input', validateInput);
  inputLastName.addEventListener('input', validateInput);

  const mailPassContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['common-inputs-container__mail-pass-container'],
  };
  const mailPassContainer = createElement(mailPassContainerParams);
  const labelMailParams: ElementParams<'label'> = {
    tag: 'label',
    classNames: ['mail-pass-container__mail-label', 'reg__label'],
    textContent: 'Email',
  };
  const inputMailParams: ElementParams<'input'> = {
    tag: 'input',
    classNames: [
      'mail-pass-container__mail-input',
      'reg-input',
      'common--input',
    ],
    attributes: {
      type: 'email',
      'data-validation-type': 'email',
    },
  };
  const labelMail = createElement(labelMailParams);
  const inputMail = createElement(inputMailParams) as HTMLInputElement;
  const errorEmail = errors.createErrorElement();
  addInnerComponent(container, mailPassContainer);
  addInnerComponent(mailPassContainer, labelMail);
  addInnerComponent(labelMail, inputMail);
  addInnerComponent(labelMail, errorEmail);
  const LabelPasswordParams: ElementParams<'label'> = {
    tag: 'label',
    classNames: ['mail-pass-container__password-label', 'reg__label'],
    textContent: 'Password',
  };
  const InputPasswordParams: ElementParams<'input'> = {
    tag: 'input',
    classNames: [
      'mail-pass-container__password-input',
      'reg-input',
      'common--input',
    ],
    attributes: {
      type: 'password',
      'data-validation-type': 'password',
    },
  };
  const passwordIconParams: ElementParams<'img'> = {
    tag: 'img',
    attributes: {
      src: '/assets/authpage/hide.png',
      alt: 'make your password visible/hide',
      title: 'Click to make your password visible',
    },
    classNames: ['password_icon'],
  };

  const labelPassword = createElement(LabelPasswordParams);
  const inputPassword = createElement(InputPasswordParams) as HTMLInputElement;
  const passwordIcon = createElement(passwordIconParams) as HTMLImageElement;

  inputMail.addEventListener('input', validateInput);
  inputPassword.addEventListener('input', validateInput);
  const errorPassword = errors.createErrorElement();
  addInnerComponent(mailPassContainer, labelPassword);
  addInnerComponent(labelPassword, inputPassword);
  addInnerComponent(labelPassword, passwordIcon);
  addInnerComponent(labelPassword, errorPassword);
  inputPassword.addEventListener('keydown', function (event) {
    if (event.key === ' ') {
      event.preventDefault();
    }
  });
  passwordIcon.addEventListener('click', (event) => {
    event.preventDefault();
    if (inputPassword.getAttribute('type') === 'password') {
      inputPassword.setAttribute('type', 'text');
      passwordIcon.setAttribute('src', '/assets/authpage/show.png');
      passwordIcon.setAttribute('title', 'Click to hide your password');
    } else {
      inputPassword.setAttribute('type', 'password');
      passwordIcon.setAttribute('src', '/assets/authpage/hide.png');
      passwordIcon.setAttribute('title', 'Click to make your password visible');
    }
  });
  return {
    container,
    inputName,
    inputLastName,
    inputMail,
    inputPassword,
    passwordIcon,
  };
}
export const commonFormCompontens = createCommonFormContainer();
