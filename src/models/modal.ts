import { ReactNode } from 'react';

export interface ModalProps {
  fullWidth?: boolean;
  title: string | JSX.Element;
  show: boolean;
  body: ReactNode;
  actionButtons: ReactNode;
  maxWidth?: any;
}

export interface ModalContextType {
  modalState: ModalProps;
  handleOpenModal: (config: Partial<ModalProps>) => void;
  handleCloseModal: () => void;
}
