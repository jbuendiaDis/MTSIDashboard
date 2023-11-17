/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useMemo, useState } from 'react';
import { ModalContext, initialState } from './ModalContext';
import { ModalProps } from '../../models';

interface Props {
  children: ReactNode;
}

const ModalProvider = ({ children }: Props) => {
  const [modalState, setModalState] = useState<ModalProps>(initialState);

  const handleUpdateState = (newState: Partial<ModalProps>) => {
    setModalState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  const handleOpenModal = (config: Partial<ModalProps>): void => {
    config.show = true;
    handleUpdateState(config);
  };

  const handleCloseModal = (): void => {
    setModalState({
      ...initialState,
      // configProps: { ...modalState.configProps },
    });
  };

  const contextValue = useMemo(
    () => ({
      modalState,
      handleOpenModal,
      handleCloseModal,
    }),
    [modalState]
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalProvider };
