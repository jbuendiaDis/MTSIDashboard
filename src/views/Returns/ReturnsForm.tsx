import { Button, Grid } from '@mui/material';
import Input from '../../components/Input/Input';
import { Stack } from '@mui/system';
import { ResponseReturns } from './types';

interface ReturnsFormProps {
  toggleModal: () => void;
  dataEdit: ResponseReturns['payload'] | null;
}

const ReturnsForm = ({ toggleModal, dataEdit }: ReturnsFormProps) => {
  return (
    <Grid container flexDirection="column" spacing={2} sx={{ mt: 2 }}>
      <Grid item>
        <Input fullWidth label="Marca" name="marca" />
      </Grid>
      <Grid item>
        <Input fullWidth label="Modelo" name="modelo" />
      </Grid>
      <Grid item>
        <Input fullWidth label="Rendimiento" name="rendimiento" />
      </Grid>
      <Stack
        direction="row"
        spacing={2}
        display="flex"
        justifyContent="center"
        sx={{ mt: 3 }}
      >
        <Button variant="outlined" color="inherit" onClick={toggleModal}>
          Cancelar
        </Button>
        <Button variant="contained" color="primary" type="submit">
          {dataEdit ? 'Editar' : 'Crear'}
        </Button>
      </Stack>
    </Grid>
  );
};

export { ReturnsForm };
