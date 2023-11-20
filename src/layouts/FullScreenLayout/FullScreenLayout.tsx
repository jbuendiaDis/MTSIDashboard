import { Box } from '@mui/material';
import { ReactNode } from 'react';
import { Modal } from '../../components/Modal';
import { Loader } from '../../components/Loader';

interface Props {
  children: ReactNode;
}

const FullScreenLayout = ({ children }: Props) => {
  return (
    <Box>
      <Modal />
      <Loader />
      <>{children}</>
    </Box>
  );
};

export { FullScreenLayout };
