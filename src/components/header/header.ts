import {
  addInnerComponent,
  createElement,
  ElementParams,
} from '../../utils/baseComponent';
import { appEvents } from '../../utils/eventEmitter';
import { checkLoginStatus, logoutUser } from '../../api/apiService';

export function createHeader(): HTMLElement {
  const headerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['header'],
  };
  const header = createElement(headerParams);

  const logoLink = createElement({
    tag: 'a',
    attributes: { href: '/' },
    classNames: ['header__logo-link'],
  });
  const logo = createElement({
    tag: 'div',
    classNames: ['header__logo'],
    textContent: '・valenki store・',
  });
  addInnerComponent(logoLink, logo);

  const navContainer = createElement({
    tag: 'div',
    classNames: ['header__nav-links'],
  });
  const homeLink = createElement({
    tag: 'a',
    attributes: { href: '/' },
    classNames: ['header__nav-link'],
    textContent: 'Home',
  });
  const aboutLink = createElement({
    tag: 'a',
    attributes: { href: '/catalog' },
    classNames: ['header__nav-link'],
    textContent: 'Catalog',
  });
  addInnerComponent(navContainer, homeLink);
  addInnerComponent(navContainer, aboutLink);

  const rightContainer = createElement({
    tag: 'div',
    classNames: ['header__right-container'],
  });

  const iconsContainer = createElement({
    tag: 'div',
    classNames: ['header__icons'],
  });
  const basketIcon = createElement({
    tag: 'a',
    attributes: { href: '/basket' },
    classNames: ['header__icon', 'header__basket-icon'],
  });
  const basketImage = createElement({
    tag: 'img',
    attributes: {
      src: '/assets/header/basket.png',
      alt: 'Basket',
    },
  });
  const userIcon = createElement({
    tag: 'a',
    attributes: { href: '/profile' },
    classNames: ['header__icon', 'header__user-icon'],
  });
  const userImage = createElement({
    tag: 'img',
    attributes: {
      src: '/assets/header/user-profile.png',
      alt: 'User',
    },
  });
  addInnerComponent(basketIcon, basketImage);
  addInnerComponent(userIcon, userImage);
  addInnerComponent(iconsContainer, basketIcon);
  addInnerComponent(iconsContainer, userIcon);

  const authNavContainer = createElement({
    tag: 'div',
    classNames: ['header__auth-nav-container'],
  });

  const authContainer = createElement({
    tag: 'div',
    classNames: ['header__auth-buttons'],
  });
  const registerButton = createElement({
    tag: 'a',
    attributes: { href: '/register' },
    classNames: ['header__auth-button', 'register-button'],
    textContent: 'Register',
  });
  const authButton = createElement({
    tag: 'a',
    attributes: { href: '/login' },
    classNames: ['header__auth-button', 'login-button'],
    textContent: 'Log In',
  });
  addInnerComponent(authContainer, registerButton);
  addInnerComponent(authContainer, authButton);

  addInnerComponent(authNavContainer, authContainer);

  addInnerComponent(rightContainer, iconsContainer);
  addInnerComponent(rightContainer, authNavContainer);

  addInnerComponent(header, logoLink);
  addInnerComponent(header, navContainer);
  addInnerComponent(header, rightContainer);

  const burgerMenu = createElement({
    tag: 'div',
    classNames: ['header__burger'],
  });
  const burgerLine1 = createElement({ tag: 'div', classNames: ['line1'] });
  const burgerLine2 = createElement({ tag: 'div', classNames: ['line2'] });
  const burgerLine3 = createElement({ tag: 'div', classNames: ['line3'] });
  addInnerComponent(burgerMenu, burgerLine1);
  addInnerComponent(burgerMenu, burgerLine2);
  addInnerComponent(burgerMenu, burgerLine3);
  addInnerComponent(header, burgerMenu);

  burgerMenu.onclick = (): void => {
    authNavContainer.classList.toggle('open');
    burgerMenu.classList.toggle('change');
  };

  const closeBurgerMenu = (event: MouseEvent): void => {
    if (
      !header.contains(event.target as Node) &&
      authNavContainer.classList.contains('open')
    ) {
      authNavContainer.classList.remove('open');
      burgerMenu.classList.remove('change');
    }
  };

  document.addEventListener('click', closeBurgerMenu);

  const moveNavLinks = (): void => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      addInnerComponent(authNavContainer, navContainer);
    } else {
      if (authNavContainer.classList.contains('open')) {
        authNavContainer.classList.remove('open');
        burgerMenu.classList.remove('change');
      }
      header.insertBefore(navContainer, rightContainer);
    }
  };

  window.addEventListener('resize', moveNavLinks);
  document.addEventListener('DOMContentLoaded', moveNavLinks);

  async function handleLogout(): Promise<void> {
    await logoutUser();
    appEvents.emit('logout', undefined);
  }

  async function updateAuthButton(isLoggedIn: boolean): Promise<void> {
    console.log(isLoggedIn);
    registerButton.style.display = isLoggedIn ? 'none' : 'block';
    authButton.textContent = isLoggedIn ? 'Log Out' : 'Log In';
    authButton.setAttribute('href', isLoggedIn ? '#' : '/login');
    authButton.onclick = isLoggedIn
      ? async (): Promise<void> => {
          await handleLogout();
          appEvents.emit('logout', undefined);
        }
      : null;
  }

  document.addEventListener('DOMContentLoaded', initializeAuthButtons);
  function initializeAuthButtons(): void {
    const isLoggedIn = checkLoginStatus();
    updateAuthButton(isLoggedIn);
  }
  initializeAuthButtons();

  appEvents.on('login', () => updateAuthButton(true));
  appEvents.on('logout', () => updateAuthButton(false));

  return header;
}
