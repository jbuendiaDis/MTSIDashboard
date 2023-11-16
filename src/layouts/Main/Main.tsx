import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { MainStyles } from './MainStyles';
import { Container } from '@mui/system';

interface MainProps {
  children: ReactNode;
}

const Main = ({ children, ...other }: MainProps) => {
  const style = MainStyles();

  return (
    <Box component="main" sx={style.container} {...other}>
      <Container maxWidth="xl" sx={{ mt: 5 }}>
        {children}
      </Container>
    </Box>
  );
};

export { Main };
