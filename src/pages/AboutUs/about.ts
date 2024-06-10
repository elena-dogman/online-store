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
  document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    function scrollToElement(targetId: string): void {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    document.querySelectorAll('.no-hash').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = (event.currentTarget as HTMLElement).getAttribute(
          'data-target',
        );
        if (targetId) {
          scrollToElement(targetId);
        }
      });
    });
  });
  return aboutPageContainer;
}
