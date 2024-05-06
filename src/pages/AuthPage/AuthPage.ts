import { createAuthForm } from '../../components/AuthPageForm/createAuthPageForm';
import {
  createElement,
  ElementParams,
  addInnerComponent,
} from '../../utils/baseComponent';
import { createHeader } from '../../components/header/header';
import { authService } from '../../api/authService';
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

  const header = createHeader();
  const authFormBgImage = createElement(imageParams);
  const authFormArray = createAuthForm();
  const authForm = authFormArray[0];
  // const emailInput = authFormArray[1];
  const passwordInput = authFormArray[2];
  const passwordInputIcon = authFormArray[3];
  // const submitButton = authFormArray[4];
  // here will be validation after function of validation is ready (Lenya is in progress)
  // let validatedEmail = false;
  // let validatedPassword = false;
  // emailInput.addEventListener('input', (event) => {
  //   validatedEmail = validateInput(emailInput);
  //   if (validatedEmail && validatedPassword) {
  //     submitButton.removeAttribute('disabled');
  //   } else {
  //     submitButton.setAttribute('disabled');
  //   }
  // });
  // passwordInput.addEventListener('input', (passwordInput) => {
  //   validatedPassword = validateInput(event);
  //   if (validatedEmail && validatedPassword) {
  //     submitButton.removeAttribute('disabled');
  //   } else {
  //     submitButton.setAttribute('disabled');
  //   }
  // });
  //

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
    const formDataObject: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      formDataObject[key] = value as string;
    }

    authService(formDataObject);
  });
  authSectionContainer.prepend(header);
  addInnerComponent(authSectionContainer, authFormBgImage);
  addInnerComponent(authSectionContainer, authForm);
  return authSectionContainer;
}
