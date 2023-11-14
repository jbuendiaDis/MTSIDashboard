import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { HEADER, NAV } from '../configLayout';
import { useResponsive } from '../../hooks/useResponsive';

const SPACING = 8;

interface MainProps {
  children: ReactNode;
}

const Main = ({ children, ...other }: MainProps) => {
  const lgUp = useResponsive('up', 'lg');

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        py: `${HEADER.H_MOBILE + SPACING}px`,
        ...(lgUp && {
          px: 2,
          py: `${HEADER.H_DESKTOP + SPACING}px`,
          width: `calc(100% - ${NAV.WIDTH}px)`,
        }),
      }}
      {...other}
    >
      {children}
    </Box>
  );
};

export { Main };
