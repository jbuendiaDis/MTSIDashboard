/* eslint-disable react-hooks/exhaustive-deps */
import { InputAdornment, Grid, Stack, Button } from '@mui/material';
import Input from '../../components/Input/Input';
import { Form } from 'formik';
import { AutoCompleteComponent } from '../../components/Input/AutoCompleteComponent';
import { useRootProvider } from '../../components/RootProvider/hooks/useRootProvider';
import { useEffect } from 'react';

interface BillFormProps {
  handleToggleModal: () => void;
  dataEdit: any;
}

const BillForm = ({ handleToggleModal, dataEdit }: BillFormProps) => {
  const { actionsRoutes }: any = useRootProvider();
  const { handleGetTollsWithoutChgarges, routesWithoutExpenses } =
    actionsRoutes;

  useEffect(() => {
    handleGetTollsWithoutChgarges();
  }, []);

  return (
    <Form>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <AutoCompleteComponent
            label="Seleccione una ruta"
            options={routesWithoutExpenses}
            name="routes"
            labelField="nombreOrigen-nombreDestino"
            disabled={dataEdit !== null}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Input
            fullWidth
            label="Pasaje Local Origen"
            placeholder="0.00"
            name="pasajeLocalOrigen"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Input
            fullWidth
            label="Pasaje Local Destino"
            placeholder="0.00"
            name="pasajeLocalDestino"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Input
            fullWidth
            label="Pasaje Origen"
            placeholder="0.00"
            name="pasajeOrigen"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Input
            fullWidth
            label="Pasaje Destino"
            placeholder="0.00"
            name="pasajeDestino"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Input
            fullWidth
            label="Comidas"
            placeholder="0.00"
            name="comidas"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Input
            fullWidth
            label="Hoteles"
            placeholder="0.00"
            name="hoteles"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Input
            fullWidth
            label="Ferry"
            placeholder="0.00"
            name="ferry"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Input
            fullWidth
            label="Vuelo"
            placeholder="0.00"
            name="flight"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Input
            fullWidth
            label="Pago de estadia"
            placeholder="0.00"
            name="stayPayment"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Input
            fullWidth
            label="Seguro de traslado"
            placeholder="0.00"
            name="transferInsurance"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Input
            fullWidth
            label="Taxi"
            placeholder="0.00"
            name="taxi"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Input
            fullWidth
            label="Liberación de puerto"
            placeholder="0.00"
            name="portRelease"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Input
            fullWidth
            label="Talachas"
            placeholder="0.00"
            name="talachas"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Input
            fullWidth
            label="Fito sanitarias"
            placeholder="0.00"
            name="phytoSanitary"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Input
            fullWidth
            label="Urea"
            placeholder="0.00"
            name="urea"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Input
            fullWidth
            label="UDS/USA"
            placeholder="0.00"
            name="udsUsa"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Input
            fullWidth
            label="Extra"
            placeholder="0.00"
            name="extra"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Input
            fullWidth
            label="Diesel extra"
            placeholder="0.00"
            name="diselExtra"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
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
    </Form>
  );
};

export { BillForm };
