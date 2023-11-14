/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Stack, Drawer, Avatar, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
// import { usePathname } from 'src/routes/hooks';
// import { RouterLink } from 'src/routes/components';
// import { Logo } from '../Logo';
import navConfig from './navConfig';
import MemoizedScrollbar from '../ScrollBar/ScrollBar';
import { useResponsive } from '../../hooks/useResponsive';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { NAV } from '../../layouts/configLayout';
import { RouterLink } from '../../routes/RouterLink';

interface Props {
  openNav: boolean;
  onCloseNav: () => void;
}

const Nav = ({ openNav, onCloseNav }: Props) => {
  const location = useLocation();
  const upLg = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [location.pathname]);

  const account = {
    displayName: 'Jaydon Frankie',
    email: 'demo@minimals.cc',
    photoURL: '/assets/images/avatars/avatar_25.jpg',
  };

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Avatar src={account.photoURL} alt="photoURL" />

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{account.displayName}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {/* {account.role} */}
          role
        </Typography>
      </Box>
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item: any) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );

  const renderContent = (
    <MemoizedScrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {/* <Logo sx={{ mt: 3, ml: 4 }} /> */}

      {renderAccount}
      {renderMenu}
      <Box sx={{ flexGrow: 1 }} />
    </MemoizedScrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
};

function NavItem({ item }: any) {
  const location = useLocation();
  const active = item.path === location.pathname;

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      {/* <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box> */}

      <Box component="span">{item.title} </Box>
    </ListItemButton>
  );
}

export { Nav };
