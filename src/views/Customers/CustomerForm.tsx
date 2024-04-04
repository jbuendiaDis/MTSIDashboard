import { Button, Grid, Stack, Theme, Typography } from '@mui/material';
import Input from '../../components/Input/Input';
import { PaylaodCustomers } from './types';
import { AutoCompleteComponent } from '../../components/Input/AutoCompleteComponent';
import { DataStates } from '../../models';
interface Props {
  handleToggleModal: () => void;
  dataEdit: PaylaodCustomers['data'] | null;
  states: DataStates['data'];
  dataCfdi: any[];
  dataRegimenFiscal: any[];
}

const CustomerForm = ({
  handleToggleModal,
  dataEdit,
  states,
  dataCfdi,
  dataRegimenFiscal,
}: Props) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={12} item>
          <Typography
            sx={{
              letterSpacing: '1px',
              fontSize: '15px',
              color: (theme: Theme) => theme.palette.grey[500],
            }}
          >
            Dirección del Cliente:
          </Typography>
        </Grid>
        <Grid xs={12} sm={4} md={4} item>
          <AutoCompleteComponent
            fullWidth
            label="Estado"
            options={states}
            labelField="label"
            name="state"
          />
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
              letterSpacing: '1px',
              fontSize: '15px',
              mt: 2,
              color: (theme: Theme) => theme.palette.grey[500],
            }}
          >
            Datos Fiscales:
          </Typography>
        </Grid>
        <Grid xs={12} sm={4} md={6} item>
          <AutoCompleteComponent
            label="Seleccione un regimen fiscal"
            name="regimenFiscal"
            options={dataRegimenFiscal}
            labelField="descripcion"
          />
        </Grid>
        <Grid xs={12} sm={4} md={6} item>
          <AutoCompleteComponent
            label="Seleccione uso de CFDI"
            name="usoCFDI"
            options={dataCfdi}
            labelField="descripcion"
          />
        </Grid>
        <Grid xs={12} sm={4} md={4} item>
          <Input fullWidth label="Razón Social" name="razonSocial" />
        </Grid>
        <Grid xs={12} sm={4} md={4} item>
          <Input fullWidth label="RFC" name="rfc" />
        </Grid>
        <Grid xs={12} sm={4} md={4} item>
          <Input
            fullWidth
            label="Número Cliente"
            name="codigoCliente"
            disabled={dataEdit !== null}
          />
        </Grid>
        <Grid xs={12} sm={4} md={4} item>
          <Input fullWidth label="Método de Pago" name="metodoPago" />
        </Grid>
        <Grid xs={12} sm={4} md={4} item>
          <Input fullWidth label="Forma de Pago" name="formaPago" />
        </Grid>
      </Grid>
      <Stack
        direction="row"
        spacing={2}
        sx={{ mt: 4, display: 'flex', justifyContent: 'end' }}
      >
        <Button variant="outlined" color="inherit" onClick={handleToggleModal}>
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
