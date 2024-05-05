import * as baseComponent from '../../utils/baseComponent';
import '../../utils/validation';
import * as formComponent from '../../components/registrationForm/registrationForm';
const app = document.getElementById('app');
//! create loyalt
export const wrapper = baseComponent.createElement({
  tag: 'div',
  classNames: ['wrapper__registration', 'wrapper'],
});
// Image side
export const imageSide = baseComponent.createElement({
  tag: 'div',
  classNames: ['registration__img-side'],
});
export const imageSideTitle = baseComponent.createElement({
  tag: 'h2',
  classNames: ['img-side__title'],
  textContent: 'Valenky',
});
const imageSideDescription = baseComponent.createElement({
  tag: 'div',
  classNames: ['img-side__description'],
  textContent:
    'Valenky.com is the best place to find remote talent. We’ve been super impress by the quality of applicants.',
});
export const imageSideCreator = baseComponent.createElement({
  tag: 'h2',
  classNames: ['img-side__creator'],
  textContent: 'Retarded Coders 🐸',
});
// Auth Side
export const authSide = baseComponent.createElement({
  tag: 'div',
  classNames: ['registration__auth-side'],
});
export const authSideTitle = baseComponent.createElement({
  tag: 'h2',
  classNames: ['auth-side__title'],
  textContent: 'Create an acount',
});
export const signIn = baseComponent.createElement({
  tag: 'div',
  classNames: ['auth-side__sign-in'],
});
export const signInText = baseComponent.createElement({
  tag: 'div',
  classNames: ['sign-in__text'],
  textContent: 'Already have an account?',
});

export const signInButton = baseComponent.createElement({
  tag: 'button',
  classNames: ['sign-in__button', 'button'],
  attributes: { disabled: 'true', type: 'submit' },
  textContent: 'Sign in',
});
export function buildRegistrationPage(): void {
  formComponent.createForm();
  app?.append(wrapper);
  wrapper.append(imageSide);
  wrapper.append(authSide);
  imageSide.append(imageSideTitle);
  imageSide.append(imageSideDescription);
  imageSide.append(imageSideCreator);
  authSide.append(authSideTitle);
  authSide.append(formComponent.authSideForm);
  authSide.append(signIn);
  signIn.append(signInText);
  signIn.append(signInButton);
}
