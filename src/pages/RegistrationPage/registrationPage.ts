import { createHeader } from '../../components/header/header';
import { createRegistrationComponent } from '../../components/registrationComponent/registrationComponent';
import * as formComponent from '../../components/registrationForm/registrationForm';
import { createElement } from '../../utils/baseComponent';

export function buildRegistrationPage(): HTMLElement {
  const registrationPage = createElement({
    tag: 'div',
    classNames: ['registration__page'],
  });
  const regImg = createElement({
    tag: 'img',
    classNames: ['registration-img'],
    attributes: {
      alt: 'registration__img',
      src: '/assets/registration/registration-img.jpg',
    },
  });
  const header = createHeader();
  const registrationComponent = createRegistrationComponent();

  formComponent.createForm();

  registrationPage.append(header);
  registrationPage.append(regImg);
  registrationPage.append(registrationComponent);
  return registrationPage;
}
