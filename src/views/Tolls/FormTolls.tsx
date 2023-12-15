/* eslint-disable react-hooks/exhaustive-deps */
import { Form, FormikValues, useFormikContext } from 'formik';
import { Grid, InputAdornment, Button, Stack } from '@mui/material';
import Select from '../../components/Input/Select';
import { AutoCompleteComponent } from '../../components/Input/AutoCompleteComponent';
import Input from '../../components/Input/Input';
import { useEffect } from 'react';
import { useRootProvider } from '../../components/RootProvider/hooks/useRootProvider';
import { DataCatalogs } from '../../models';

interface FormTollsProps {
  handleToggleModal: () => void;
  unitTypes: DataCatalogs[];
  states: any[];
}

const FormTolls = ({
  handleToggleModal,
  unitTypes,
  states,
}: FormTollsProps) => {
  const { values, setValues } = useFormikContext<FormikValues>();
  const { actionsCountries }: any = useRootProvider();
  const { countriesByState, handleGetCountrie } = actionsCountries;

  useEffect(() => {
    if (values.state !== null) {
      handleGetCountrie(values.state);
      setValues({
        ...values,
        nombre: undefined,
      });
    }
  }, [values.state]);

  return (
    <Form>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <Select
            label="Seleccione un tipo de unidad"
            name="unitType"
            options={unitTypes}
            getOptionLabel={(option) => option.descripcion}
            getOptionValue={(option) => option.descripcion}
          />
        </Grid>
        <Grid item xs={12}>
          <AutoCompleteComponent
            label="Seleccione un estado"
            name="state"
            options={states}
            labelField="label"
          />
        </Grid>
        <Grid item xs={12}>
          <AutoCompleteComponent
            label="Seleccione una caseta"
            name="nombre"
            options={countriesByState}
            labelField="nombre"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Input
            fullWidth
            type="number"
            label="Costo"
            placeholder="0.00"
            name="costo"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <Stack
        spacing={2}
        direction="row"
        mt={3}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <Button
          variant="outlined"
          color="inherit"
          type="button"
          onClick={handleToggleModal}
        >
          Cancelar
        </Button>
        <Button variant="contained" type="submit">
          {/* {dataEdit ? 'Guardar' : 'Crear'} */}
          Crear
        </Button>
      </Stack>
    </Form>
  );
};

export { FormTolls };
