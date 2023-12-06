import { InputAdornment, Grid, Stack, Button } from '@mui/material';
import Input from '../../components/Input/Input';

interface BillFormProps {
  handleToggleModal: () => void;
}

const BillForm = ({ handleToggleModal }: BillFormProps) => {
  return (
    <>
      <Grid container spacing={2}>
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
          Crear
        </Button>
      </Stack>
    </>
  );
};

export { BillForm };
