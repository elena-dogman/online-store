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
      const path = window.location.pathname;
      const handler = this.routes[path] || notFoundPage;
      const view = handler();
      document.body.innerHTML = '';
      document.body.appendChild(view);
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
  '/': mainPage,
  '/login': loginPage,
  '/register': registrationPage,
};

const router = createRouter(routes);

export default router;
