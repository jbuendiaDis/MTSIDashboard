import { Button, Grid, Stack } from '@mui/material';
import Input from '../../components/Input/Input';
import { Transfer } from './types';

interface TransferFormProps {
  toggleCloseModal: () => void;
  dataEdit: Transfer;
}

const TransferForm = ({ toggleCloseModal, dataEdit }: TransferFormProps) => {
  return (
    <>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid xs={12} item>
          <Input fullWidth label="Concepto" name="concepto" />
        </Grid>
        <Grid xs={12} sm={6} item>
          <Input fullWidth label="Sueldo" name="sueldo" />
        </Grid>
        <Grid xs={12} sm={6} item>
          <Input fullWidth label="Tipo de Traslado" name="tipoTraslado" />
        </Grid>
      </Grid>
      <Stack
        direction="row"
        spacing={2}
        sx={{ mt: 3, display: 'flex', justifyContent: 'end' }}
      >
        <Button variant="outlined" color="inherit" onClick={toggleCloseModal}>
          Cancelar
        </Button>
        <Button variant="contained" color="primary" type="submit">
          {dataEdit ? 'Guardar' : 'Crear'}
        </Button>
      </Stack>
    </>
  );
};

export { TransferForm };
