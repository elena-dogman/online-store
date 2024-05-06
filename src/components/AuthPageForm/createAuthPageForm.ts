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
      required: '',
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
      disabled: '',
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

  const authFormEmailContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['email_container'],
  };
  const authFormPasswordContainerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['password_container'],
  };
  const emailIconParams: ElementParams<'img'> = {
    tag: 'img',
    attributes: {
      src: '/assets/authpage/mail.png',
      alt: 'email icon',
    },
    classNames: ['email_icon'],
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
  const emailIcon = createElement(emailIconParams);
  const passwordIcon = createElement(passwordIconParams);
  const [emailLabel, emailInput] = createInput('email', 'email');
  const [passwordLabel, passwordInput] = createInput(
    'password',
    'password',
    'password',
  );
  const emailContainer = createElement(authFormEmailContainerParams);
  const passwordContainer = createElement(authFormPasswordContainerParams);
  const submitButton = createElement(submitButtonParams);
  addInnerComponent(emailContainer, emailLabel);
  addInnerComponent(emailContainer, emailInput);
  addInnerComponent(emailContainer, emailIcon);
  addInnerComponent(passwordContainer, passwordLabel);
  addInnerComponent(passwordContainer, passwordInput);
  addInnerComponent(passwordContainer, passwordIcon);
  addInnerComponent(authForm, authFormHeader);
  addInnerComponent(authForm, emailContainer);
  addInnerComponent(authForm, passwordContainer);
  addInnerComponent(authForm, submitButton);
  addInnerComponent(authForm, authFormFooter);

  return [authForm, emailInput, passwordInput, passwordIcon, submitButton];
}
