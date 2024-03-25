import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { MainStyles } from './MainStyles';

interface MainProps {
  children: ReactNode;
}

const Main = ({ children, ...other }: MainProps) => {
  const style = MainStyles();

  return (
    <Box component="main" sx={style.container} {...other}>
      <Box sx={{ mt: 5 }}>{children}</Box>
    </Box>
  );
};

export { Main };
