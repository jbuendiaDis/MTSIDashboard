// import Icon from '../SvgColor/Icon';
import { GroupAddOutlined, Groups2Outlined } from '@mui/icons-material';
import { ReactNode } from 'react';

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
    title: 'Clientes',
    path: '/customers',
    icon: <Groups2Outlined />,
  },
];

// --------------------------------------------------------

// const navConfig = [
//   {
//     title: 'dashboard',
//     path: '/',
//     // icon: icon('ic_analytics'),
//   },
//   {
//     title: 'users',
//     path: '/users',
//     // icon: icon('ic_user'),
//   },
//   {
//     title: 'clientes',
//     path: '/clientes',
//     // icon: icon('ic_user'),
//   },
//   {
//     title: 'product',
//     path: '/products',
//     // icon: icon('ic_cart'),
//   },
//   {
//     title: 'blog',
//     path: '/blog',
//     // icon: icon('ic_blog'),
//   },
//   {
//     title: 'example',
//     path: '/example-components',
//     // icon: icon('ic_disabled'),
//   },
//   {
//     title: 'Not found',
//     path: '/404',
//     // icon: icon('ic_disabled'),
//   },
// ];

// export default navConfig;
