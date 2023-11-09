import { ReactNode } from 'react';
import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';
import { useLoader } from './hooks/useLoader';

interface LoaderProps {
  children?: ReactNode;
  topText?: string;
  bottomText?: string;
}

const Loader = ({ children, topText, bottomText }: LoaderProps) => {
  const { loaderState, texts } = useLoader();

  const textRender = (text: any) =>
    text ? (
      <Box m={4}>
        <Typography variant="h5">{text}</Typography>
      </Box>
    ) : null;

  return (
    <Backdrop
      open={loaderState}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        opacity: '0.85 !important',
        zIndex: (theme) => theme.zIndex.drawer + 2,
      }}
    >
      {children ? (
        children
      ) : (
        <>
          {textRender(topText || texts?.topText)}
          <CircularProgress />
          {textRender(bottomText || texts?.bottomText)}
        </>
      )}
    </Backdrop>
  );
};

export { Loader };
