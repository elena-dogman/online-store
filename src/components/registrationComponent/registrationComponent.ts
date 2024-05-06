import * as baseComponent from '../../utils/baseComponent';
import '../../utils/validations/validation';
import * as formComponent from '../../components/registrationForm/registrationForm';

export function createRegistrationComponent() : HTMLElement {
  const registrationComponent = baseComponent.createElement({
    tag: 'div',
    classNames: ['container__registration'],
  });

  const wrapper = baseComponent.createElement({
    tag: 'div',
    classNames: ['wrapper__registration', 'wrapper'],
  });

  const imageSide = baseComponent.createElement({
    tag: 'div',
    classNames: ['registration__img-side'],
  });

  const imageSideTitle = baseComponent.createElement({
    tag: 'h2',
    classNames: ['img-side__title'],
    textContent: 'valenky store',
  });

  const imageSideDescription = baseComponent.createElement({
    tag: 'div',
    classNames: ['img-side__description'],
    textContent:
      'Valenki store is the best place to find that unique component to highlight your individuality.',
  });

  const authSide = baseComponent.createElement({
    tag: 'div',
    classNames: ['registration__auth-side'],
  });

  const authSideTitle = baseComponent.createElement({
    tag: 'h2',
    classNames: ['auth-side__title'],
    textContent: 'Create an account',
  });

  const signIn = baseComponent.createElement({
    tag: 'div',
    classNames: ['auth-side__sign-in'],
  });

  const signInText = baseComponent.createElement({
    tag: 'div',
    classNames: ['sign-in__text'],
    textContent: 'Already have an account?',
  });

  const signInButton = baseComponent.createElement({
    tag: 'button',
    classNames: ['sign-in__button', 'button'],
    attributes: { disabled: 'true', type: 'submit' },
    textContent: 'Sign in',
  });

  wrapper.append(imageSide);
  wrapper.append(authSide);
  imageSide.append(imageSideTitle);
  imageSide.append(imageSideDescription);
  authSide.append(authSideTitle);
  authSide.append(formComponent.authSideForm);
  authSide.append(signIn);
  signIn.append(signInText);
  signIn.append(signInButton);
  registrationComponent.append(wrapper);

  return registrationComponent;
}
