import { ReactNode } from 'react';

export interface DrawerProps {
  open: boolean;
  title: string;
  children: ReactNode | JSX.Element;
  anchor?: 'left' | 'right' | 'top' | 'bottom';
  onClose: () => void;
}
