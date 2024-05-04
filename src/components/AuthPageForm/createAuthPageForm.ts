import {
  createElement,
  ElementParams,
  addInnerComponent,
} from '../../utils/baseComponent';

function createInput(
  id: string,

  validationType: string,
  type: string = 'text',
): [HTMLLabelElement, HTMLInputElement] {
  const inputParams: ElementParams<'input'> = {
    tag: 'input',
    attributes: {
      id: id,
      type: type,
      name: id,
      'data-validation-type': validationType,
    },
    classNames: ['form-input'],
  };
  const labelParams: ElementParams<'label'> = {
    tag: 'label',
    textContent: id,
    attributes: {
      for: id,
    },
    classNames: ['form-label'],
  };
  const input = createElement(inputParams) as HTMLInputElement;
  const label = createElement(labelParams) as HTMLLabelElement;

  return [label, input];
}
export function createAuthForm(): HTMLElement[] {
  const formContainerParams: ElementParams<'form'> = {
    tag: 'form',
    classNames: ['auth_form'],
  };
  const submitButtonParams: ElementParams<'button'> = {
    tag: 'button',
    textContent: 'Sign In',
    attributes: {
      type: 'submit',
    },
    classNames: ['submit_button'],
  };
  const authForm = createElement(formContainerParams);

  const authFormHeaderParams: ElementParams<'h2'> = {
    tag: 'h2',
    textContent: 'Sign in & choose your best felt boots!',
    classNames: ['auth_form_header'],
  };
  const authFormFooterParams: ElementParams<'h3'> = {
    tag: 'h3',
    textContent: "Don't have an account yet? ",
    classNames: ['auth_form_footer'],
  };
  const authFormFooterSpanParams: ElementParams<'a'> = {
    tag: 'a',
    attributes: {
      href: '/registration',
    },
    textContent: 'Registration',
    classNames: ['auth_form_footer_link-to-registration'],
  };

  const authFormHeader = createElement(authFormHeaderParams);
  const authFormFooter = createElement(authFormFooterParams);
  const authFormFooterHref = createElement(authFormFooterSpanParams);
  addInnerComponent(authFormFooter, authFormFooterHref);

  const authFormUsernameContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['username_container'],
  };
  const authFormPasswordContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['password_container'],
  };
  const usernameIconParams: ElementParams<'img'> = {
    tag: 'img',
    attributes: {
      src: '/assets/authpage/user.png',
      alt: 'Username icon',
    },
    classNames: ['username_icon'],
  };
  const passwordIconParams: ElementParams<'img'> = {
    tag: 'img',
    attributes: {
      src: '/assets/authpage/hide.png',
      alt: 'Switch to make your password visible',
    },
    classNames: ['password_icon'],
  };
  const usernameIcon = createElement(usernameIconParams);
  const passwordIcon = createElement(passwordIconParams);
  const [usernameLabel, usernameInput] = createInput('username', 'name');
  const [passwordLabel, passwordInput] = createInput('password', 'password');
  const usernameContainer = createElement(authFormUsernameContainerParams);
  const passwordContainer = createElement(authFormPasswordContainerParams);
  const submitButton = createElement(submitButtonParams);
  addInnerComponent(usernameContainer, usernameLabel);
  addInnerComponent(usernameContainer, usernameInput);
  addInnerComponent(usernameContainer, usernameIcon);
  addInnerComponent(passwordContainer, passwordLabel);
  addInnerComponent(passwordContainer, passwordInput);
  addInnerComponent(passwordContainer, passwordIcon);
  addInnerComponent(authForm, authFormHeader);
  addInnerComponent(authForm, usernameContainer);
  addInnerComponent(authForm, passwordContainer);
  addInnerComponent(authForm, submitButton);
  addInnerComponent(authForm, authFormFooter);

  return [authForm, usernameInput, passwordInput];
}
