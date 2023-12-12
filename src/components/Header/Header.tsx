import { AppBar, Box, IconButton, Stack, Toolbar } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { useResponsive } from '../../hooks/useResponsive';
import { Account } from '../Account';
import { HeaderStyles } from './HeaderStyles';

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

      <Box
        component="img"
        src={logoCompany}
        alt="log"
        sx={{ width: 135, height: 135 }}
      />

      {/* <Searchbar /> */}

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" spacing={1}>
        {/* <LanguagePopover /> */}
        {/* <Notifications /> */}
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
