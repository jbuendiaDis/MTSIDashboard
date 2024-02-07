import { ReactNode, useState } from 'react';
import { Box } from '@mui/material';
import { Modal } from '../../components/Modal';
import { Loader } from '../../components/Loader';
import { Header } from '../../components/Header';
import { Nav } from '../../components/Nav/Nav';
import { Main } from '../Main';
import { Splash } from '../../views/Splash';
import { useAuth } from '../../components/Auth';

interface Props {
  children?: ReactNode;
}

const BaseLayout = ({ children }: Props) => {
  const [openNav, setOpenNav] = useState<boolean>(false);
  const { user } = useAuth();

  return (
    <>
      {user?.isLogger && <Splash />}
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
