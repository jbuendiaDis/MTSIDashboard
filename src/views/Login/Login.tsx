/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Card,
  Stack,
  Typography,
  Link,
  Button,
  Divider,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useApi } from '../../hooks/useApi';
import { useEffect, useState } from 'react';
import { useAuth } from '../../components/Auth';
import { alpha, useTheme } from '@mui/material/styles';
import { bgGradient } from '../../components/Theme/css';
import LoadingButton from '@mui/lab/LoadingButton';
import backgroundImg from '../../assets/overlay_1.svg';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import Input from '../../components/Input/Input';

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
  const theme = useTheme();
  // const style = LoginStyles;
  const auth = useAuth();
  const [data, setdata] = useState<Example[]>([]);
  const [showPassword, setShowPassword] = useState(false);

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

  const handleSubmit = (values: any) => {
    console.log('VALUES', values);
    auth.login(values);
  };

  const renderForm = (
    <>
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
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="inherit"
            >
              Login
            </LoadingButton>
          </Stack>
        </Form>
      </Formik>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: backgroundImg,
        }),
        height: '100vh',
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in to Minimal</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link variant="subtitle2" sx={{ ml: 0.5 }}>
              Get started
            </Link>
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              {/* <Iconify icon="eva:google-fill" color="#DF3E30" /> */}G
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              {/* <Iconify icon="eva:facebook-fill" color="#1877F2" /> */}
              FB
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              {/* <Iconify icon="eva:twitter-fill" color="#1C9CEA" /> */}
              TW
            </Button>
          </Stack>
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
};

export { Login };
