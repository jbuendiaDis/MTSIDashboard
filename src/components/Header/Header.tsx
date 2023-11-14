import { AppBar, Box, IconButton, Stack, Toolbar } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
// import { HeaderStyles } from './HeaderStyles';
// import { useAuth } from '../Auth';
import { bgBlur } from '../Theme/css';
import { useResponsive } from '../../hooks/useResponsive';
import { HEADER, NAV } from '../../layouts/configLayout';
import { Account } from '../Account';

interface Props {
  onOpenNav: () => void;
}

const Header = ({ onOpenNav }: Props) => {
  const theme = useTheme();
  const lgUp = useResponsive('up', 'lg');
  // const auth = useAuth();

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Menu />
        </IconButton>
      )}

      {/* <Searchbar /> */}

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" spacing={1}>
        {/* <LanguagePopover /> */}
        {/* <NotificationsPopover /> */}
        <Account />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.WIDTH + 1}px)`,
          height: HEADER.H_DESKTOP,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
};

export { Header };
