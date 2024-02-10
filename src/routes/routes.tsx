import { BaseLayout, FullScreenLayout } from '../layouts';
import { Roles, Route, SimpleRoute } from '../models';
import { Error404 } from '../views/Error404';
import { Home } from '../views/Home';
import { Login } from '../views/Login';
import { Users } from '../views/Users';
import { createRouteGroup } from './helpers';

export const appRoutes = {
  adminRoutes: createRouteGroup({
    home: {
      path: '/',
      layout: BaseLayout,
      component: Home,
      exact: true,
      titleMessage: 'Home',
      private: false,
    },
    users: {
      path: '/users',
      layout: BaseLayout,
      component: Users,
      exact: true,
      titleMessage: 'Users',
      private: false,
    },
  }),
};

export const publicRoutes = {
  auth: createRouteGroup({
    login: {
      path: '/login',
      layout: FullScreenLayout,
      component: Login,
      exact: true,
      titleMessage: 'routes.login',
      private: false,
    },
  }),
};

export const routesByRole: Record<Roles, Route[]> = {
  [Roles.ADMIN]: [...Object.values(appRoutes.adminRoutes)],
  [Roles.PUBLIC]: [...Object.values(publicRoutes.auth)],
};

export const errorPageRoute: SimpleRoute = {
  layout: FullScreenLayout,
  component: Error404,
  titleMessage: 'error404',
};
