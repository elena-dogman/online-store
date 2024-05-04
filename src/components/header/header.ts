import { addInnerComponent, createElement, ElementParams } from '../../utils/baseComponent';

export function createHeader(): HTMLElement {
  const headerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['header'],
  };
  const header = createElement(headerParams);

  const linkParams: ElementParams<'a'> = {
    tag: 'a',
    attributes: {
      href: '/',
    },
    classNames: ['logo-link'],
  };
  const logoLink = createElement(linkParams);

  const logoParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['logo'],
    textContent: '・valenki store・',
  };
  const logo = createElement(logoParams);

  addInnerComponent(logoLink, logo);

  const navContainer = createElement({
    tag: 'div',
    classNames: ['nav-links'],
  });

  const homeLink = createElement({
    tag: 'a',
    attributes: { href: '/' },
    classNames: ['nav-link'],
    textContent: 'Home',
  });

  const aboutLink = createElement({
    tag: 'a',
    attributes: { href: '#' },
    classNames: ['nav-link'],
    textContent: 'About Us',
  });

  addInnerComponent(navContainer, homeLink);
  addInnerComponent(navContainer, aboutLink);

  const iconsContainer = createElement({
    tag: 'div',
    classNames: ['icons'],
  });

  const basketIcon = createElement({
    tag: 'a',
    attributes: { href: '/basket' },
    classNames: ['icon', 'basket-icon'],
  });

  const basketImage = createElement({
    tag: 'img',
    attributes: {
      src: '/assets/basket.svg',
      alt: 'Basket',
    },
  });

  const userIcon = createElement({
    tag: 'a',
    attributes: { href: '/profile' },
    classNames: ['icon', 'user-icon'],
  });

  const userImage = createElement({
    tag: 'img',
    attributes: {
      src: '/assets/user-profile.svg',
      alt: 'User',
    },
  });

  addInnerComponent(basketIcon, basketImage);
  addInnerComponent(userIcon, userImage);
  addInnerComponent(iconsContainer, basketIcon);
  addInnerComponent(iconsContainer, userIcon);

  const authContainer = createElement({
    tag: 'div',
    classNames: ['auth-buttons'],
  });

  const registerButton = createElement({
    tag: 'a',
    attributes: { href: '/register' },
    classNames: ['auth-button', 'register-button'],
    textContent: 'Register',
  });

  const loginButton = createElement({
    tag: 'a',
    attributes: { href: '/login' },
    classNames: ['auth-button', 'login-button'],
    textContent: 'Log In',
  });

  addInnerComponent(authContainer, registerButton);
  addInnerComponent(authContainer, loginButton);
  addInnerComponent(header, logoLink);
  addInnerComponent(header, navContainer);
  addInnerComponent(header, iconsContainer);
  addInnerComponent(header, authContainer);

  return header;
}
