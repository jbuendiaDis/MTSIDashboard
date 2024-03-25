import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { Menu } from '@mui/icons-material';
import { useResponsive } from '../../hooks/useResponsive';
import { Account } from '../Account';
import { HeaderStyles } from './HeaderStyles';
import { Notifications } from '../Notifications';

interface HeaderProps {
  onOpenNav: () => void;
}

const Header = ({ onOpenNav }: HeaderProps) => {
  const style = HeaderStyles();
  const lgUp = useResponsive('up', 'lg');
  const logoCompany = '/assets/logo.svg';

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1, color: '#fff' }}>
          <Menu />
        </IconButton>
      )}

      <Stack spacing={2} direction="row" alignItems="center">
        <Box
          component="img"
          src={logoCompany}
          alt="log"
          sx={{ width: { xs: 100, sm: 125 }, height: 'auto' }}
        />
        {lgUp && (
          <Box sx={{ flexDirection: 'column' }}>
            <Typography
              sx={{
                color: '#fff',
                fontSize: '13px',
                letterSpacing: '1px',
                fontWeight: 600,
              }}
            >
              Multi Traslados y Servicios
            </Typography>
            <Typography
              sx={{
                color: '#fff',
                fontSize: '11px',
                letterSpacing: '1px',
                fontWeight: 400,
              }}
            >
              Traslado Automotriz Nacional e Internacional
            </Typography>
          </Box>
        )}
      </Stack>

      {/* <Searchbar /> */}

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" spacing={1}>
        {/* <LanguagePopover /> */}
        <Notifications />
        <Account />
      </Stack>
    </>
  );

  return (
    <AppBar sx={style.appBar}>
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
