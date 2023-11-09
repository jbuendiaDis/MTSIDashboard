import { AppBar, Button, Grid, Toolbar } from '@mui/material';
import { HeaderStyles } from './HeaderStyles';
import { useAuth } from '../Auth';

const Header = () => {
  const style = HeaderStyles;
  const auth = useAuth();

  return (
    <Grid sx={style.root}>
      <AppBar position="fixed" sx={{ justifyContent: 'space-between' }}>
        <Toolbar>
          <Grid
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            Header
            <Button
              variant="contained"
              color="secondary"
              onClick={() => auth.logout()}
            >
              Log out
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
  );
};

export { Header };
