import { createHeader } from '../../components/header/header';
import { createRegistrationComponent } from '../../components/registrationComponent/registrationComponent';
import * as formComponent from '../../components/registrationForm/registrationForm';
import { createElement } from '../../utils/baseComponent';

export function buildRegistrationPage(): HTMLElement {
  const registrationPage = createElement({
    tag: 'div',
    classNames: ['registration__page'],
  });

  const header = createHeader();
  const registrationComponent = createRegistrationComponent();

  formComponent.createForm();

  registrationPage.append(header);
  registrationPage.append(registrationComponent);

  return registrationPage;
}
