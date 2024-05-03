import { notFoundPage } from '../pages/NotFoundPage';

type RouteHandler = () => HTMLElement;
type Routes = Record<string, RouteHandler>;

interface Router {
  routes: Routes;
  handleLocationChange: () => void;
  navigate: (path: string) => void;
}

function createRouter(routes: Routes): Router {
  const router: Router = {
    routes,
    handleLocationChange() {
      const appElement = document.getElementById('app');
      const path = window.location.pathname;
      const handler = this.routes[path] || notFoundPage;
      const view = handler();
      if (appElement) {
        appElement.innerHTML = '';
        appElement.appendChild(view);
      } else {
        console.error("The element with ID 'app' was not found in the DOM.");
      }
    },
    navigate(path: string) {
      window.history.pushState({}, '', path);
      this.handleLocationChange();
    },
  };

  window.addEventListener('popstate', () => {
    router.handleLocationChange();
  });

  return router;
}

const routes = {
  // '/': mainPage,
  // '/login': loginPage,
  // '/register': registrationPage,
  '/404': notFoundPage,
};

const router = createRouter(routes);

export default router;
