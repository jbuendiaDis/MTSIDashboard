import { ReactNode } from 'react';
import {
  GroupAddOutlined,
  Groups2Outlined,
  RouteOutlined,
  LocalShippingOutlined,
  AttachMoneyOutlined,
  TrendingUpOutlined,
  Diversity3Outlined,
  WarehouseOutlined,
  RequestQuoteOutlined,
  HistoryOutlined,
} from '@mui/icons-material';

export interface Menu {
  title: string;
  path: string;
  icon: ReactNode | JSX.Element;
}

export const getMenuForUserRole = (user: any) => {
  if (user.role === 'admin') return navConfigAdmin;
  else return navConfigOperation;
};

const navConfigAdmin: Menu[] = [
  {
    title: 'Usuarios',
    path: '/users',
    icon: <GroupAddOutlined />,
  },
  {
    title: 'Contacto cliente',
    path: '/user-clients',
    icon: <Diversity3Outlined />,
  },
  {
    title: 'Clientes',
    path: '/customers',
    icon: <Groups2Outlined />,
  },
  {
    title: 'Rutas',
    path: '/routes',
    icon: <RouteOutlined />,
  },
  {
    title: 'Traslados',
    path: '/transfers',
    icon: <LocalShippingOutlined />,
  },
  {
    title: 'Peajes',
    path: '/tolls',
    icon: <WarehouseOutlined />,
  },
  {
    title: 'Gastos',
    path: '/bills',
    icon: <AttachMoneyOutlined />,
  },
  {
    title: 'Rendimientos',
    path: '/returns',
    icon: <TrendingUpOutlined />,
  },
  {
    title: 'Cotizaciones',
    path: '/quotes',
    icon: <RequestQuoteOutlined />,
  },
  {
    title: 'Historial Cotizaciones',
    path: '/quote-history',
    icon: <HistoryOutlined />,
  },
];

const navConfigOperation: Menu[] = [
  {
    title: 'Rutas',
    path: '/routes',
    icon: <RouteOutlined />,
  },
  {
    title: 'Traslados',
    path: '/transfers',
    icon: <LocalShippingOutlined />,
  },
  {
    title: 'Peajes',
    path: '/tolls',
    icon: <WarehouseOutlined />,
  },
  {
    title: 'Gastos',
    path: '/bills',
    icon: <AttachMoneyOutlined />,
  },
  {
    title: 'Rendimientos',
    path: '/returns',
    icon: <TrendingUpOutlined />,
  },
];
