import { useEffect } from 'react';
import { Box, Stack, Drawer, Avatar, Typography } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import { Menu, getMenuForUserRole } from './navConfig';
import MemoizedScrollbar from '../ScrollBar/ScrollBar';
import { useResponsive } from '../../hooks/useResponsive';
import { useLocation } from 'react-router-dom';
import { RouterLink } from '../../routes/RouterLink';
import { useAuth } from '../Auth';
import { NavStyles } from './NavStyles';
import { NAV } from '../../utils/configLayout';

interface NavProps {
  openNav: boolean;
  onCloseNav: () => void;
}

const Nav = ({ openNav, onCloseNav }: NavProps) => {
  const style = NavStyles();
  const { user } = useAuth();
  const location = useLocation();
  const upLg = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [location.pathname]);

  const renderAccount = (
    <Box sx={style.containerNav}>
      <Avatar src={'JC'} alt={user?.name.charAt(0).toUpperCase()} />
      <Box sx={{ ml: 2 }}>
        <Typography
          variant="subtitle2"
          sx={{ color: '#fff' }}
        >{`${user?.name} ${user?.lastname}`}</Typography>
        <Typography variant="body2" sx={{ color: '#fff' }}>
          {user?.role === 'operacion' ? 'Operacion' : user?.position}
        </Typography>
      </Box>
    </Box>
  );

  let menuForUserRole: any[] | null = null;
  if (user) {
    menuForUserRole = getMenuForUserRole(user);
  }

  const renderContent = (
    <MemoizedScrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
          background:
            'linear-gradient(148deg, rgba(0,25,130,0.7371323529411764) 63%, rgba(200,0,0,0.6082808123249299) 100%); ',
        },
      }}
    >
      {/* <Logo sx={{ mt: 3, ml: 4 }} /> */}
      {renderAccount}
      <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
        {menuForUserRole?.map((item: any) => (
          <NavItem key={item.title} {...item} />
        ))}
      </Stack>
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
        <Box sx={style.containerItems}>{renderContent}</Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
              background:
                'linear-gradient(180deg, #253883 30%, rgba(36, 56, 131, 0.5) 100%)',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
};

function NavItem(item: Menu) {
  const location = useLocation();
  const active = item.path === location.pathname;
  const style = NavStyles(active);

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={style.listItemButton}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>

      <Box component="span">{item.title}</Box>
    </ListItemButton>
  );
}

export { Nav };
