import { RoutePaths } from '../../types/types';
import {
  createElement,
  ElementParams,
  addInnerComponent,
} from '../../utils/general/baseComponent';
import { createInput } from '../../utils/general/createInput';
import {
  fillObjectWithUniqueKeys,
  validStatus,
} from '../../utils/validations/booleanValid';
import { commonFormCompontens } from '../registrationForm/nameMailForm';
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
  const authForm = createElement(formContainerParams) as HTMLFormElement;
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
      href: RoutePaths.Register,
    },
    textContent: 'Register',
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
  const emailErrorSpanParams: ElementParams<'span'> = {
    tag: 'span',
    classNames: ['error'],
  };
  const emailIconParams: ElementParams<'img'> = {
    tag: 'img',
    attributes: {
      src: '/assets/authpage/mail.png',
      alt: 'email icon',
    },
    classNames: ['email_icon'],
  };

  const passwordErrorSpanParams: ElementParams<'span'> = {
    tag: 'span',
    classNames: ['error'],
  };
  const emailIcon = createElement(emailIconParams);
  const passwordIcon = commonFormCompontens.passwordIcon;
  const emailErrorSpan = createElement(emailErrorSpanParams);
  const passwordErrorSpan = createElement(passwordErrorSpanParams);
  const [emailLabel, emailInput] = createInput(
    'email',
    [['form-label'], ['form-input']],
    'email',
    'email',
  );
  const [passwordLabel, passwordInput] = createInput(
    'password',
    [['form-label'], ['form-input']],
    'password',
    'password',
  );
  const emailContainer = createElement(authFormEmailContainerParams);
  const passwordContainer = createElement(authFormPasswordContainerParams);
  const submitButton = createElement(submitButtonParams);
  addInnerComponent(emailContainer, emailLabel);
  addInnerComponent(emailContainer, emailInput);
  addInnerComponent(emailContainer, emailErrorSpan);
  addInnerComponent(emailContainer, emailIcon);
  addInnerComponent(passwordContainer, passwordLabel);
  addInnerComponent(passwordContainer, passwordInput);
  addInnerComponent(passwordContainer, passwordErrorSpan);
  addInnerComponent(passwordContainer, passwordIcon);
  addInnerComponent(authForm, authFormHeader);
  addInnerComponent(authForm, emailContainer);
  addInnerComponent(authForm, passwordContainer);
  addInnerComponent(authForm, submitButton);
  addInnerComponent(authForm, authFormFooter);
  fillObjectWithUniqueKeys(authForm, false, validStatus);
  return [authForm, emailInput, passwordInput, passwordIcon, submitButton];
}
