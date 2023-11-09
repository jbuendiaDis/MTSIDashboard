import { ReactNode } from 'react';
import { Modal } from '../../components/Modal';
import { Loader } from '../../components/Loader';
import { Header } from '../../components/Header';

interface Props {
  children: ReactNode;
}

const BaseLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <Modal />
      <Loader />
      <div style={{ margin: '20px' }}>{children}</div>
    </>
  );
};

export { BaseLayout };
