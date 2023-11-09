import { Box } from '@mui/material';
import { ReactNode } from 'react';
import { LanguageSelector } from '../../components/Language';

interface Props {
  children: ReactNode;
}

const FullScreenLayout = ({ children }: Props) => {
  return (
    <Box>
      <LanguageSelector />
      {children}
    </Box>
  );
};

export { FullScreenLayout };
