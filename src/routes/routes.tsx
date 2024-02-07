import { BaseLayout } from '../layouts';
import { Routes } from '../views/Routes';
import { UserClients } from '../views/UserClients/UserClients';
import { Users } from '../views/Users';

export const Example: any = [
  {
    layout: BaseLayout,
    path: '/users',
    element: <Users />,
    name: 'usuarios',
  },
  {
    layout: BaseLayout,
    path: '/user-clients',
    element: <UserClients />,
    name: 'clientes-usuarios',
  },
  {
    layout: BaseLayout,
    path: '/routes',
    element: <Routes />,
    name: 'rutas',
  },
];
