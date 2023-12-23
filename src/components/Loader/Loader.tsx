import { ReactNode } from 'react';
import { Backdrop, Box, Typography } from '@mui/material';
import { useLoader } from './hooks/useLoader';
import Lottie from 'react-lottie-player';
import animationLoader from '../../assets/animation/loader.json';

interface LoaderProps {
  children?: ReactNode;
  topText?: string;
  bottomText?: string;
}

const Loader = ({ children, topText, bottomText }: LoaderProps) => {
  const { loaderState, texts } = useLoader();

  const textRender = (text: any) =>
    text ? (
      <Box m={2}>
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
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: (theme) => theme.zIndex.drawer + 1004,
      }}
    >
      {children ? (
        children
      ) : (
        <>
          {textRender(topText || texts?.topText)}
          <Lottie
            loop
            play
            animationData={animationLoader}
            speed={1.5}
            style={{
              width: 350,
            }}
          />
          {textRender(bottomText || texts?.bottomText)}
        </>
      )}
    </Backdrop>
  );
};

export { Loader };
