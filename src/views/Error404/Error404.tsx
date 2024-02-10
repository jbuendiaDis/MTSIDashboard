import { useHistory } from 'react-router-dom';
import { Container, Box, Typography, Button } from '@mui/material';
import { useAuth } from '../../components/Auth';

const Error404 = () => {
  const history = useHistory();
  const { user } = useAuth();

  if (user?.rol !== 'admin') history.push('/login');

  return (
    <Container maxWidth="xl">
      <Box component="div" sx={{ padding: 2 }}>
        <Typography variant="h1">404</Typography>
        <Typography variant="h5">
          {/* {t('pageNotFound.title')} */}
          TITULO
        </Typography>
        <Typography style={{ margin: '12px 8px' }}>
          {/* {t('pageNotFound.notExistPage')} */}
          NO ESXISTE PAGINA
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.goBack()}
        >
          IR HACI ATRAS
        </Button>
      </Box>
    </Container>
  );
};

export { Error404 };
