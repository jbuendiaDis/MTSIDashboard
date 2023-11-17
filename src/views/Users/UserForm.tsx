import { Grid, InputAdornment, IconButton, Stack, Button } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import Input from '../../components/Input/Input';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';

interface Props {
  setOpenDrawer: () => void;
}

const UserForm = ({ setOpenDrawer }: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  return (
    <>
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} item>
          <Input fullWidth label="Nombre" name="name" />
        </Grid>
        <Grid xs={12} sm={6} item>
          <Input fullWidth label="Apellidos" name="lastname" />
        </Grid>
        <Grid xs={12} sm={6} item>
          <Input fullWidth label="Edad" name="age" />
        </Grid>
        <Grid xs={12} sm={6} item>
          <Input fullWidth label="Email" name="email" />
        </Grid>
        <Grid xs={12} sm={12} item>
          <Input
            fullWidth
            label="Contraseña"
            name="password"
            type={showPassword ? 'texto' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid xs={12} sm={12} item>
          <Input
            fullWidth
            label="Confirme Contraseña"
            name="confirmPassword"
            type={showConfirmPassword ? 'texto' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid xs={12} sm={6} item>
          <Input fullWidth label="Puesto" name="position" />
        </Grid>
        <Grid xs={12} sm={6} item>
          <Input fullWidth label="Firma" name="signature" />
        </Grid>
      </Grid>
      <Stack
        direction="row"
        spacing={2}
        sx={{ mt: 10, width: 1, display: 'flex', justifyContent: 'end' }}
      >
        <Button variant="outlined" color="inherit" onClick={setOpenDrawer}>
          Cancelar
        </Button>
        <LoadingButton variant="contained" type="submit">
          Guardar
        </LoadingButton>
      </Stack>
    </>
  );
};

export { UserForm };
