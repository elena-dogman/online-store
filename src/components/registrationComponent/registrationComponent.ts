import {
  createElement,
  addInnerComponent,
} from '../../utils/general/baseComponent';
import '../../utils/validations/validation';
import * as formComponent from '../../components/registrationForm/registrationForm';
import router from '../../router/router';
import { RoutePaths } from '../../types/types';

export function createRegistrationComponent(): HTMLElement {
  const wrapper = createElement({
    tag: 'div',
    classNames: ['wrapper__registration', 'wrapper'],
  });

  const authSide = createElement({
    tag: 'div',
    classNames: ['registration__auth-side'],
  });

  const authSideTitle = createElement({
    tag: 'h2',
    classNames: ['auth-side__title'],
    textContent: 'Create an account',
  });

  const authSideForm = formComponent.authSideForm;

  const signIn = createElement({
    tag: 'div',
    classNames: ['auth-side__sign-in'],
  });

  const signInText = createElement({
    tag: 'div',
    classNames: ['sign-in__text'],
    textContent: 'Already have an account?',
  });

  const signInButton = createElement({
    tag: 'button',
    classNames: ['sign-in__button', 'button'],
    attributes: { type: 'submit' },
    textContent: 'Sign in',
  });

  signInButton.addEventListener('click', () => {
    router.navigate(RoutePaths.Login);
  });

  addInnerComponent(wrapper, authSide);
  addInnerComponent(authSide, authSideTitle);
  addInnerComponent(authSide, authSideForm);
  addInnerComponent(authSide, signIn);
  addInnerComponent(signIn, signInText);
  addInnerComponent(signIn, signInButton);

  return wrapper;
}
