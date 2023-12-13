import { useTheme } from '@mui/system';
import { Theme } from '@mui/material';
import { bgBlur } from '../Theme/css';
import { useResponsive } from '../../hooks/useResponsive';
import { HEADER, NAV } from '../../utils/configLayout';

export const HeaderStyles = () => {
  const theme = useTheme();
  const lgUp = useResponsive('up', 'lg');

  const appBar = {
    boxShadow: 'none',
    height: HEADER.H_MOBILE,
    zIndex: (theme: Theme) => theme.zIndex.appBar + 1,
    ...bgBlur({
      color: theme.palette.background.default,
    }),
    transition: (theme: Theme) =>
      theme.transitions.create(['height'], {
        duration: theme.transitions.duration.shorter,
      }),
    ...(lgUp && {
      width: `calc(100% - ${NAV.WIDTH + 1}px)`,
      height: HEADER.H_DESKTOP,
    }),
    backgroundImage:
      'linear-gradient(to right, rgba(231, 62, 59, 0.80), rgba(255, 122, 104, 0.90))',
  };

  return { appBar };
};
