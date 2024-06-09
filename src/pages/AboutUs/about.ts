import {
  createElement,
  addInnerComponent,
  ElementParams,
} from '../../utils/general/baseComponent';
import { aboutComponent } from '../../components/AboutUs/aboutComponent';
import { createHeader } from '../../components/header/header';

export function createAboutUsPage(): HTMLElement {
  const aboutPageParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['about_us'],
  };
  const aboutPageContainer = createElement(aboutPageParams);
  const header = createHeader();
  const aboutPageComponent = aboutComponent();

  aboutPageContainer.prepend(header);
  addInnerComponent(aboutPageContainer, aboutPageComponent);
  console.log(aboutPageContainer);
  return aboutPageContainer;
}
