/* eslint-disable react-hooks/exhaustive-deps */
import { Box, TextField, Button, IconButton } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useApi } from '../../hooks/useApi';
import { useEffect, useState } from 'react';
import { LoginStyles } from './LoginStyles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../../components/Auth';
import { useTranslation } from '../../hooks/useTranslations';

interface Example {
  address: any;
  company: any;
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
}

const Login = () => {
  const style = LoginStyles;
  const auth = useAuth();
  const { t } = useTranslation();
  const [data, setdata] = useState<Example[]>([]);
  const [show, setShow] = useState<boolean>(false);

  const _get = useApi({
    endpoint: '/users',
    method: 'get',
  });

  useEffect(() => {
    handleExample();
  }, []);

  const handleExample = async () => {
    const response: Example[] = await _get();

    setdata(response);
  };

  console.log('DATA_API', data);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Ingrese un email válido')
      .required('Este campo es obligatorio'),
    password: Yup.string().required('Este campo es obligatorio'),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log('Values', values);
      auth.login(values);
    },
  });

  return (
    <Box sx={style.container}>
      <Box sx={style.contentForm}>
        <Box component="form" sx={style.form} onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            placeholder="mail@dominio.com"
            type="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            label="Password"
            type={show ? 'text' : 'password'}
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShow(!show)}>
                  {!show ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
          <Button fullWidth type="submit" variant="contained">
            {t('getInto')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export { Login };
