// import Icon from '../SvgColor/Icon';
import { ReactNode } from 'react';
import {
  GroupAddOutlined,
  Groups2Outlined,
  RouteOutlined,
  LocalShippingOutlined,
  AttachMoneyOutlined,
  TrendingUpOutlined,
  Diversity3Outlined,
} from '@mui/icons-material';

export interface Menu {
  title: string;
  path: string;
  icon: ReactNode | JSX.Element;
}

export const navConfig: Menu[] = [
  {
    title: 'Usuarios',
    path: '/users',
    icon: <GroupAddOutlined />,
  },
  {
    title: 'Clientes usuario',
    path: '/user-clients',
    icon: <Diversity3Outlined />,
  },
  {
    title: 'Clientes',
    path: '/customers',
    icon: <Groups2Outlined />,
  },
  {
    title: 'Peajes',
    path: '/tolls',
    icon: <RouteOutlined />,
  },
  {
    title: 'Traslados',
    path: '/transfers',
    icon: <LocalShippingOutlined />,
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
