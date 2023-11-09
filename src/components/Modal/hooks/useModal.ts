import { useContext } from 'react';
import { ModalContextType } from '../../../models';
import { ModalContext } from '../ModalContext';

export const useModal = (): ModalContextType => useContext(ModalContext);
