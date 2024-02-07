/* eslint-disable react-hooks/exhaustive-deps */
import { InputAdornment, Grid, Stack, Button } from '@mui/material';
import Input from '../../components/Input/Input';
import { Form, FormikValues, useFormikContext } from 'formik';
import { AutoCompleteComponent } from '../../components/Input/AutoCompleteComponent';
import { useRootProvider } from '../../components/RootProvider/hooks/useRootProvider';
import { useEffect } from 'react';

interface BillFormProps {
  handleToggleModal: () => void;
  states: any[];
  dataEdit: any;
}

const BillForm = ({ handleToggleModal, states, dataEdit }: BillFormProps) => {
  const { values, setValues } = useFormikContext<FormikValues>();
  const { actionsCountries }: any = useRootProvider();
  const {
    localidades,
    localidadesSecond,
    handleResetLocalidades,
    handleResetLocalidadesSecond,
    handleGetLocalidades,
    handleGetLocalidadesSecond,
  } = actionsCountries;

  useEffect(() => {
    if (values.originState !== null) {
      handleResetLocalidades();
      handleGetLocalidades(values.originState?.codigo);
      setValues({
        ...values,
        originLocality: null,
      });
    }
  }, [values.originState]);

  useEffect(() => {
    if (values.destinationState !== null) {
      handleResetLocalidadesSecond();
      handleGetLocalidadesSecond(values.destinationState?.codigo);
      setValues({
        ...values,
        destinationLocality: null,
      });
    }
  }, [values.destinationState]);

  return (
    <Form>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <AutoCompleteComponent
            label="Seleccione un estado origen"
            name="originState"
            options={states}
            labelField="label"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AutoCompleteComponent
            label="Localidad origen"
            name="originLocality"
            options={localidades}
            labelField="label"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AutoCompleteComponent
            label="Seleccione un estado destino"
            name="destinationState"
            options={states}
            labelField="label"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AutoCompleteComponent
            label="Localidad destino"
            name="destinationLocality"
            options={localidadesSecond}
            labelField="label"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
          <Input
            fullWidth
            label="Ferri"
            placeholder="0.00"
            name="ferri"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
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
