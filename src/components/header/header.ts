import { addInnerComponent, createElement, ElementParams, setAttribute } from '../../utils/baseComponent';
import { appEvents } from '../../utils/eventEmitter';

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
    attributes: { href: '#' },
    classNames: ['header__nav-link'],
    textContent: 'About Us',
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

  addInnerComponent(rightContainer, iconsContainer);
  addInnerComponent(rightContainer, authContainer);

  addInnerComponent(header, logoLink);
  addInnerComponent(header, navContainer);
  addInnerComponent(header, rightContainer);

  function handleLogout() : void {
    appEvents.emit('logout', undefined);
  }

  function updateAuthButton(isLoggedIn: boolean) : void {
    if (authButton instanceof HTMLAnchorElement) {
      authButton.textContent = isLoggedIn ? 'Log Out' : 'Log In';
      setAttribute(authButton, 'href', isLoggedIn ? '#' : '/login');
      if (isLoggedIn) {
        authButton.onclick = handleLogout;
      } else {
        authButton.removeAttribute('onclick');
      }
    }
  }
  appEvents.on('login', () => updateAuthButton(true));
  appEvents.on('logout', () => updateAuthButton(false));
  return header;
}