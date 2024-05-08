import { createAuthForm } from '../../components/AuthPageForm/createAuthPageForm';
import {
  createElement,
  ElementParams,
  addInnerComponent,
} from '../../utils/baseComponent';
import { ClientResponse } from '@commercetools/platform-sdk';
import { createHeader } from '../../components/header/header';
import { validateInput } from '../../utils/validations/validation';
import { loginUser } from '../../api/apiService';
export function createAuthPage(): HTMLElement {
  const authSectionContainerParams: ElementParams<'section'> = {
    tag: 'section',
    classNames: ['auth_section'],
  };
  const authSectionContainer = createElement(authSectionContainerParams);
  const imageParams: ElementParams<'img'> = {
    tag: 'img',
    classNames: ['auth_section-background_image'],
    attributes: {
      src: '/assets/authpage/witcher_felt_boots_auth_page_2.jpg',
      alt: 'Beautiful Felt Boots',
    },
  };
  const errorLoginParams: ElementParams<'span'> = {
    tag: 'span',
    classNames: ['auth_error'],
  };
  const errorLogin = createElement(errorLoginParams);
  const header = createHeader();
  const authFormBgImage = createElement(imageParams);
  const authFormArray = createAuthForm();
  const authForm = authFormArray[0];
  const emailInput = authFormArray[1];
  const passwordInput = authFormArray[2];
  const passwordInputIcon = authFormArray[3];
  const submitButton = authFormArray[4];

  let validatedEmail = false;
  let validatedPassword = false;
  emailInput.addEventListener('input', () => {
    validatedEmail = validateInput.call(emailInput as HTMLInputElement);
    if (validatedEmail && validatedPassword) {
      submitButton.removeAttribute('disabled');
    } else {
      submitButton.setAttribute('disabled', 'true');
    }
  });
  passwordInput.addEventListener('input', () => {
    validatedPassword = validateInput.call(passwordInput as HTMLInputElement);
    if (validatedEmail && validatedPassword) {
      submitButton.removeAttribute('disabled');
    } else {
      submitButton.setAttribute('disabled', 'true');
    }
  });

  passwordInputIcon.addEventListener('click', (event) => {
    event.preventDefault();
    if (passwordInput.getAttribute('type') === 'password') {
      passwordInput.setAttribute('type', 'text');
      passwordInputIcon.setAttribute('src', '/assets/authpage/show.png');
      passwordInputIcon.setAttribute('title', 'Click to hide your password');
    } else {
      passwordInput.setAttribute('type', 'password');
      passwordInputIcon.setAttribute('src', '/assets/authpage/hide.png');
      passwordInputIcon.setAttribute(
        'title',
        'Click to make your password visible',
      );
    }
  });
  authForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(authForm as HTMLFormElement);
    const formDataObject: { email: string; password: string } = {
      email: '',
      password: '',
    };
    for (const [key, value] of formData.entries()) {
      if (key in formDataObject) {
        formDataObject[key as keyof typeof formDataObject] = value as string;
      }
    }

    const response = (await loginUser(formDataObject)) as ClientResponse;

    if (response.statusCode === 400) {
      errorLogin.textContent = 'Wrong email and/or password!';

      authForm.insertBefore(errorLogin, submitButton);
    } else {
      if (errorLogin && errorLogin.parentNode === authForm) {
        authForm.removeChild(errorLogin);
      }
    }
  });
  authSectionContainer.prepend(header);
  addInnerComponent(authSectionContainer, authFormBgImage);
  addInnerComponent(authSectionContainer, authForm);
  return authSectionContainer;
}
