import { useTheme } from '@mui/system';
import { Theme } from '@mui/material';
import { bgBlur } from '../Theme/css';
import { useResponsive } from '../../hooks/useResponsive';
import { HEADER } from '../../utils/configLayout';

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
      // width: `calc(100% - ${NAV.WIDTH + 1}px)`,
      width: `calc(100% - ${278.9}px)`,
      height: HEADER.H_DESKTOP,
    }),
    backgroundImage:
      'linear-gradient(148deg, rgba(0,25,130,0.7371323529411764) 100%, rgba(255,255,255,0) 100%);',
  };

  return { appBar };
};
