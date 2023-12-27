import backgroundImg from '../../assets/overlay_1.svg';
import { alpha, useTheme } from '@mui/material/styles';
import { bgGradient } from '../../components/Theme/css';

export const LoginStyles = () => {
  const theme = useTheme();

  const container = {
    ...bgGradient({
      color: alpha(theme.palette.background.default, 0.5),
      imgUrl: backgroundImg,
    }),
    height: '100vh',
  };

  const rootCard = {
    p: 5,
    width: 1,
    maxWidth: 420,
  };

  const titleForm = {
    textAlign: 'center',
    mb: 4,
    letterSpacing: '1.2px',
  };
  const button = {
    backgroundColor: '#E73E3B',
    color: '#FFFFFF',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    letterSpacing: '1px',
    transition: 'background-color 0.3s, color 0.3s',
    '&:hover': {
      backgroundColor: '#FF7A68',
    },
  };

  return {
    container,
    rootCard,
    titleForm,
    button,
  };
};
