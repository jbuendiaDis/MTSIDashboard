import { Button, Grid, InputAdornment } from '@mui/material';
import Input from '../../components/Input/Input';
import { Stack } from '@mui/system';
import { ResponseReturns } from './types';
import Select from '../../components/Input/Select';
import { useRootProvider } from '../../components/RootProvider/hooks/useRootProvider';
import { useEffect } from 'react';

interface ReturnsFormProps {
  toggleModal: () => void;
  dataEdit: ResponseReturns['payload'] | null;
}

const ReturnsForm = ({ toggleModal, dataEdit }: ReturnsFormProps) => {
  const { actionsCatalogs }: any = useRootProvider();
  const {
    handleVehicleCondition,
    handleBodyStyle,
    vehicleCondition,
    bodyStyle,
  } = actionsCatalogs;

  useEffect(() => {
    handleVehicleCondition('6601103b9c182d78456b6589');
    handleBodyStyle('660110829c182d78456b6594');
  }, []);

  return (
    <Grid container flexDirection="column" spacing={2} sx={{ mt: 2 }}>
      <Grid item>
        <Select
          label="Condicion de Vehiculo"
          name="vehicleCondition"
          options={vehicleCondition}
          getOptionLabel={(option) => option.descripcion}
          getOptionValue={(option) => option._id}
        />
      </Grid>
      <Grid item>
        <Select
          label="Carrocería"
          name="bodyStyle"
          options={bodyStyle}
          getOptionLabel={(option) => option.descripcion}
          getOptionValue={(option) => option._id}
        />
      </Grid>
      <Grid item>
        <Input fullWidth label="Marca" name="marca" />
      </Grid>
      <Grid item>
        <Input fullWidth label="Modelo" name="modelo" />
      </Grid>
      <Grid item>
        <Input
          fullWidth
          label="Rendimiento"
          type="number"
          placeholder="0.0"
          name="rendimiento"
          InputProps={{
            endAdornment: <InputAdornment position="end">Lts</InputAdornment>,
          }}
        />
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
          {dataEdit ? 'Guardar' : 'Crear'}
        </Button>
      </Stack>
    </Grid>
  );
};

export { ReturnsForm };
