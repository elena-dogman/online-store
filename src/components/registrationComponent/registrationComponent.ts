import { createElement, addInnerComponent } from '../../utils/baseComponent';
import '../../utils/validations/validation';
import * as formComponent from '../../components/registrationForm/registrationForm';

export function createRegistrationComponent(): HTMLElement {
  const registrationComponent = createElement({
    tag: 'div',
    classNames: ['container__registration'],
  });

  const wrapper = createElement({
    tag: 'div',
    classNames: ['wrapper__registration', 'wrapper'],
  });

  const imageSide = createElement({
    tag: 'div',
    classNames: ['registration__img-side'],
  });

  const imageSideTitle = createElement({
    tag: 'h2',
    classNames: ['img-side__title'],
    textContent: 'valenki store',
  });

  const imageSideDescription = createElement({
    tag: 'div',
    classNames: ['img-side__description'],
    textContent:
      'Valenki store is the best place to find that unique component to highlight your individuality.',
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
    attributes: { disabled: 'true', type: 'submit' },
    textContent: 'Sign in',
  });


  addInnerComponent(wrapper, imageSide);
  addInnerComponent(wrapper, authSide);
  addInnerComponent(imageSide, imageSideTitle);
  addInnerComponent(imageSide, imageSideDescription);
  addInnerComponent(authSide, authSideTitle);
  addInnerComponent(authSide, authSideForm);
  addInnerComponent(authSide, signIn);
  addInnerComponent(signIn, signInText);
  addInnerComponent(signIn, signInButton);
  addInnerComponent(registrationComponent, wrapper);

  return registrationComponent;
}
