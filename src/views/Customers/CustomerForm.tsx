import { Button, Grid, Stack, Theme, Typography } from '@mui/material';
import Input from '../../components/Input/Input';
import { PaylaodCustomers } from './types';

interface Props {
  handleToggleDrawer: () => void;
  dataEdit: PaylaodCustomers['data'] | null;
}

const CustomerForm = ({ handleToggleDrawer, dataEdit }: Props) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={12} item>
          <Typography
            sx={{
              fontSize: '16px',
              color: (theme: Theme) => theme.palette.grey[500],
            }}
          >
            Dirección del Cliente:
          </Typography>
        </Grid>
        <Grid xs={12} sm={4} md={4} item>
          <Input fullWidth label="Calle" name="calle" />
        </Grid>
        <Grid xs={12} sm={4} md={4} item>
          <Input fullWidth label="Número Exterior" name="numeroExterior" />
        </Grid>
        <Grid xs={12} sm={4} md={4} item>
          <Input fullWidth label="Número Interior" name="numeroInterior" />
        </Grid>
        <Grid xs={12} sm={4} md={4} item>
          <Input fullWidth label="Colonia" name="colonia" />
        </Grid>
        <Grid xs={12} sm={4} md={4} item>
          <Input fullWidth type="number" label="Teléfono" name="telefono" />
        </Grid>
        <Grid xs={12} item>
          <Typography
            sx={{
              fontSize: '16px',
              mt: 2,
              color: (theme: Theme) => theme.palette.grey[500],
            }}
          >
            Otros Datos:
          </Typography>
        </Grid>
        <Grid xs={12} sm={4} md={4} item>
          <Input fullWidth label="Código Cliente" name="codigoCliente" />
        </Grid>
        <Grid xs={12} sm={4} md={4} item>
          <Input fullWidth label="RFC" name="rfc" />
        </Grid>
        <Grid xs={12} sm={4} md={4} item>
          <Input fullWidth label="Regimen Fiscal" name="regimenFiscal" />
        </Grid>
        <Grid xs={12} sm={4} md={4} item>
          <Input fullWidth label="Razón Social" name="razonSocial" />
        </Grid>
        <Grid xs={12} sm={4} md={4} item>
          <Input fullWidth label="Método de Pago" name="metodoPago" />
        </Grid>
        <Grid xs={12} sm={4} md={4} item>
          <Input fullWidth label="Forma de Pago" name="formaPago" />
        </Grid>
        <Grid xs={12} sm={4} md={4} item>
          <Input fullWidth label="CFDI" name="usoCFDI" />
        </Grid>
      </Grid>
      <Stack
        direction="row"
        spacing={2}
        sx={{ mt: 4, display: 'flex', justifyContent: 'end' }}
      >
        <Button variant="outlined" color="inherit" onClick={handleToggleDrawer}>
          Cancelar
        </Button>
        <Button variant="contained" type="submit">
          {dataEdit ? 'Guardar' : 'Crear'}
        </Button>
      </Stack>
    </>
  );
};

export { CustomerForm };
