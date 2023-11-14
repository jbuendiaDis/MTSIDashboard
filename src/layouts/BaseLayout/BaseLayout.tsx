import { ReactNode, useState } from 'react';
import { Box } from '@mui/material';
import { Modal } from '../../components/Modal';
import { Loader } from '../../components/Loader';
import { Header } from '../../components/Header';
import { Nav } from '../../components/Nav/Nav';
import { Main } from '../Main';

interface Props {
  children: ReactNode;
}

const BaseLayout = ({ children }: Props) => {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <Header onOpenNav={() => setOpenNav(!openNav)} />
      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Modal />
        <Loader />
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(!openNav)} />
        <Main>{children}</Main>
      </Box>
    </>
  );
};

export { BaseLayout };
