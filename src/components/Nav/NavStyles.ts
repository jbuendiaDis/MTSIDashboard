import { Theme, alpha } from '@mui/material';
import { NAV } from '../../utils/configLayout';

export const NavStyles = (active?: boolean) => {
  const containerNav = {
    my: 3,
    mx: 2.5,
    py: 2,
    px: 2.5,
    display: 'flex',
    borderRadius: 1.5,
    alignItems: 'center',
    bgcolor: (theme: Theme) => alpha(theme.palette.grey[500], 0.12),
  };

  const containerItems = {
    height: 1,
    position: 'fixed',
    width: NAV.WIDTH,
    borderRight: (theme: Theme) => `dashed 1px ${theme.palette.divider}`,
  };

  const listItemButton = {
    minHeight: 44,
    borderRadius: 0.75,
    typography: 'body2',
    color: (theme: Theme) => theme.palette.common.white,
    textTransform: 'capitalize',
    fontWeight: 'fontWeightMedium',
    ...(active && {
      color: (theme: Theme) => theme.palette.error.main,
      fontWeight: 'fontWeightSemiBold',
      bgcolor: (theme: Theme) => alpha(theme.palette.error.main, 0.3),
      '&:hover': {
        bgcolor: (theme: Theme) => alpha(theme.palette.error.main, 0.38),
      },
    }),
  };

  return {
    containerNav,
    containerItems,
    listItemButton,
  };
};
