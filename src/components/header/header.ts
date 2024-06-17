import {
  addInnerComponent,
  createElement,
  ElementParams,
} from '../../utils/general/baseComponent';
import { appEvents } from '../../utils/general/eventEmitter';
import {
  checkLoginStatus,
  getActiveCart,
  logoutUser,
} from '../../api/apiService';
import { createSearchComponent } from './search/productSearch';
import router from '../../router/router';
import { RoutePaths } from '../../types/types';

export function createHeader(): HTMLElement {
  const headerParams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['header'],
  };
  const header = createElement(headerParams);

  const logoLink = createElement({
    tag: 'a',
    attributes: { href: RoutePaths.Main },
    classNames: ['header__logo-link'],
  });
  const logo = createElement({
    tag: 'div',
    classNames: ['header__logo'],
    textContent: '・valenki store・',
  });
  addInnerComponent(logoLink, logo);

  const logoSearchContainer = createElement({
    tag: 'div',
    classNames: ['header__logo-search-container'],
  });

  addInnerComponent(logoSearchContainer, logoLink);

  const isCatalogPage = window.location.pathname === '/catalog';

  if (isCatalogPage) {
    const searchComponent = createSearchComponent();
    addInnerComponent(logoSearchContainer, searchComponent);
  }

  const navContainer = createElement({
    tag: 'div',
    classNames: ['header__nav-links'],
  });

  const homeLink = createElement({
    tag: 'a',
    attributes: { href: RoutePaths.Main },
    classNames: ['header__nav-link'],
    textContent: 'Home',
  });
  const catalogLink = createElement({
    tag: 'a',
    attributes: { href: RoutePaths.Catalog },
    classNames: ['header__nav-link'],
    textContent: 'Catalog',
  });
  const aboutLink = createElement({
    tag: 'a',
    attributes: { href: RoutePaths.AboutUs },
    classNames: ['header__nav-link'],
    textContent: 'About us',
  });
  addInnerComponent(navContainer, homeLink);
  addInnerComponent(navContainer, catalogLink);
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
    attributes: { href: RoutePaths.Basket },
    classNames: ['header__icon', 'header__basket-icon'],
  });
  const basketImage = createElement({
    tag: 'img',
    attributes: {
      src: '/assets/header/basket.png',
      alt: 'Basket',
    },
  });
  const basketCounter = createElement({
    tag: 'span',
    classNames: ['header__basket-counter'],
  });
  basketCounter.style.display = 'none';
  const userIcon = createElement({
    tag: 'a',
    classNames: ['header__icon', 'header__user-icon'],
  });
  const userImage = createElement({
    tag: 'img',
    attributes: {
      src: '/assets/header/user-profile.png',
      alt: 'User',
    },
  });
  addInnerComponent(userIcon, userImage);
  userIcon.onclick = (): void => {
    if (checkLoginStatus()) {
      router.navigate(RoutePaths.Profile);
    } else {
      router.navigate(RoutePaths.Login);
    }
  };
  addInnerComponent(iconsContainer, basketIcon);
  addInnerComponent(iconsContainer, userIcon);
  addInnerComponent(basketIcon, basketCounter);
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
    attributes: { href: RoutePaths.Register },
    classNames: ['header__auth-button', 'register-button'],
    textContent: 'Register',
  });
  const authButton = createElement({
    tag: 'a',
    attributes: { href: RoutePaths.Login },
    classNames: ['header__auth-button', 'login-button'],
    textContent: 'Log In',
  });
  addInnerComponent(authContainer, registerButton);
  addInnerComponent(authContainer, authButton);

  addInnerComponent(authNavContainer, authContainer);

  addInnerComponent(rightContainer, iconsContainer);
  addInnerComponent(rightContainer, authNavContainer);

  addInnerComponent(header, logoSearchContainer);
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

  const tabletScreenWidthInPx = 870;
  const moveNavLinks = (): void => {
    const isMobile = window.innerWidth <= tabletScreenWidthInPx;
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
  window.addEventListener('load', moveNavLinks);
  moveNavLinks();

  async function handleLogout(): Promise<void> {
    await logoutUser();
    appEvents.emit('logout', undefined);
  }

  async function updateAuthButton(isLoggedIn: boolean): Promise<void> {
    registerButton.style.display = isLoggedIn ? 'none' : 'block';
    authButton.textContent = isLoggedIn ? 'Log Out' : 'Log In';
    authButton.setAttribute('href', isLoggedIn ? '#' : RoutePaths.Login);
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
  updateBasketCounter();
  return header;
}

export async function updateBasketCounter(): Promise<void> {
  try {
    const activeCart = await getActiveCart();
    let totalQuantity = 0;
    if (activeCart) {
      activeCart.lineItems.forEach((item) => {
        totalQuantity += item.quantity;
      });
    }
    setTimeout(() => {
      const basketCounter = document.querySelector(
        '.header__basket-counter',
      ) as HTMLElement;
      if (basketCounter) {
        if (totalQuantity > 0) {
          basketCounter.style.display = 'flex';
          if (totalQuantity > 99) {
            basketCounter.textContent = '99+';
          } else {
            basketCounter.textContent = totalQuantity.toString();
          }
        } else {
          basketCounter.style.display = 'none';
        }
      }
    }, 500);
  } catch (error) {
    throw new Error();
  }
}
