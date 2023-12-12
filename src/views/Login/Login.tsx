/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Card,
  Stack,
  Typography,
  IconButton,
  InputAdornment,
  Button,
} from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useAuth } from '../../components/Auth';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import Input from '../../components/Input/Input';
import { LoginStyles } from './LoginStyles';
import { FormValues } from '../../models';

const Login = () => {
  const style = LoginStyles();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const logoCompany = '/assets/logo.svg';

  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Ingrese un email válido')
      .required('Este campo es obligatorio'),
    password: Yup.string().required('Este campo es obligatorio'),
  });

  const handleSubmit = (values: FormValues) => {
    auth.login(values);
  };

  return (
    <Box sx={style.container}>
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Box
          component="img"
          src={logoCompany}
          alt="compony-logo"
          sx={{ mb: 3 }}
        />
        <Card sx={style.rootCard}>
          <Typography variant="h4" sx={style.titleForm}>
            ¡Bienvenido!
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Stack spacing={3}>
                <Input fullWidth name="email" label="Email" />
                <Input
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
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
                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="inherit"
                  sx={style.button}
                >
                  Iniciar sesión
                </Button>
              </Stack>
            </Form>
          </Formik>
        </Card>
      </Stack>
    </Box>
  );
};

export { Login };
