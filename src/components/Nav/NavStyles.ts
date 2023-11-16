import { Theme, alpha } from '@mui/material';
import { NAV } from '../../layouts/configLayout';

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
    color: 'text.secondary',
    textTransform: 'capitalize',
    fontWeight: 'fontWeightMedium',
    ...(active && {
      color: 'primary.main',
      fontWeight: 'fontWeightSemiBold',
      bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.08),
      '&:hover': {
        bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.16),
      },
    }),
  };

  return {
    containerNav,
    containerItems,
    listItemButton,
  };
};
