import { Context, createContext } from 'react';
import { ModalContextType, ModalProps } from '../../models';

export const initialState: ModalProps = {
  fullWidth: false,
  title: '',
  show: false,
  body: null,
  actionButtons: null,
  maxWidth: null,
  iconClose: false,
};

export const ModalContext: Context<ModalContextType> | any =
  createContext(null);
