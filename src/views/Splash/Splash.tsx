import { useEffect, useState } from 'react';
import { Theme } from '@mui/system';
import { Grid, Typography } from '@mui/material';
import { useAuth } from '../../components/Auth';

const Splash = () => {
  const [index, setIndex] = useState<number>(0);
  const { user } = useAuth();
  const fondo = '/assets/mts_fondo.jpg';
  const logoCompany = '/assets/logo.svg';

  useEffect(() => {
    if (index < 5) {
      const timeout = setTimeout(() => setIndex((index) => index + 1), 1000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [index]);

  return (
    <Grid
      component="div"
      container
      sx={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: `${10000} !important`,
        backgroundImage: `linear-gradient(rgba(0, 0, 255, 0.3), rgba(0, 0, 255, 0.3)), url(${fondo})`,
        transition: (theme: any) =>
          theme.transitions.create(['opacity'], {
            duration: `${theme.transitions.duration.shorter}ms`,
          }),
        opacity: index > 3 ? 0 : 1,
        pointerEvents: index > 2 ? 'none' : undefined,
        backgroundBlendMode: 'overlay',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          padding: 1,
          flexDirection: 'column',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: (theme) =>
            theme.transitions.create(['opacity'], {
              duration: 1000,
            }),
          opacity: index > 0 ? 1 : 0,
          zIndex: 10000,
          backgroundPosition: '100%',
          position: 'absolute',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '100vh',
          overflowX: 'hidden',
          overflow: 'hidden',
        }}
      >
        <Grid
          component="img"
          src={logoCompany}
          alt="company-logo"
          sx={{ width: 520, height: 520 }}
        />
        <Typography
          sx={{
            paddingTop: { xs: 0, md: 5 },
            letterSpacing: '1.6px',
            fontSize: { xs: '35px', md: '80px' },
            fontWeight: 700,
            color: (theme: Theme) => theme.palette.common.white,
            textAlign: 'center',
            transition: (theme) =>
              theme.transitions.create(['opacity'], {
                duration: 1000,
              }),
            opacity: index > 1 ? 1 : 0,
          }}
        >{`¡Bienvenido ${user?.name} ${user?.lastname}!`}</Typography>
      </Grid>
    </Grid>
  );
};

export { Splash };
