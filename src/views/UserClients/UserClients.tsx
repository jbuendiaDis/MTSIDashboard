import {
  Typography,
  Grid,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Autocomplete,
  MenuItem,
} from '@mui/material';
import { useHelpers } from './helpers';
import { Card } from '../../components/Card/Card';
import { Add, Visibility, VisibilityOff } from '@mui/icons-material';
import { Drawer } from '../../components/Drawer';
import { useState } from 'react';
import { Stack } from '@mui/system';
import { PopInformation } from '../../components/PopInformation';
import { UserClientsStyles } from './USerClientsStyles';
import { Options } from './types';

const UserClients = () => {
  const style = UserClientsStyles;
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const {
    formik,
    dataEdit,
    userClientsData,
    customersData,
    hanldeGetUserClients,
    setDataEdit,
  } = useHelpers({
    setOpenDrawer,
  });

  const options: Options[] = [
    {
      label: 'Masculino',
      value: 'Masculino',
    },
    {
      label: 'Femenino',
      value: 'Femenino',
    },
  ];

  return (
    <Grid sx={{ pr: 4, pl: 4 }}>
      <Grid
        container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 4,
        }}
      >
        <Grid item>
          <Typography variant="h4" sx={{ letterSpacing: '1px' }}>
            Clientes
          </Typography>
        </Grid>
        <Grid item>
          <Button
            color="inherit"
            variant="contained"
            sx={{ p: '10px 20px', letterSpacing: '1px' }}
            startIcon={<Add />}
            onClick={() => setOpenDrawer(true)}
          >
            Agregar Cliente
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {userClientsData?.map((item, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            xl={4}
            key={`${item.nombre}-${index} `}
          >
            <Card
              data={item}
              hanldeGetUserClients={hanldeGetUserClients}
              setOpenDrawer={setOpenDrawer}
              setDataEdit={setDataEdit}
            />
          </Grid>
        ))}
      </Grid>

      <Drawer
        open={openDrawer}
        anchor="right"
        onClose={() => {
          setOpenDrawer(!openDrawer);
          formik.resetForm();
          setShowConfirmPassword(false);
          setShowPassword(false);
          setDataEdit(null);
        }}
        title={dataEdit ? 'Editar Cliente' : 'Crear Cliente'}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={1.5}>
            <Grid item xs={12}>
              <Typography sx={style.infoText}>
                Informacion de contacto:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                label="Nombre"
                type="text"
                id="nombre"
                name="nombre"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                helperText={formik.touched.nombre && formik.errors.nombre}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                label="Genero"
                select
                id="genero"
                name="genero"
                value={formik.values.genero}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.genero && Boolean(formik.errors.genero)}
                helperText={formik.touched.genero && formik.errors.genero}
              >
                {options.map((item) => (
                  <MenuItem key={item.label} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                label="Puesto"
                type="text"
                id="puesto"
                name="puesto"
                value={formik.values.puesto}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.puesto && Boolean(formik.errors.puesto)}
                helperText={formik.touched.puesto && formik.errors.puesto}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="text"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 1 }}>
              <Typography sx={style.infoText}>Medios de contacto:</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                label="Télefono de oficina"
                type="text"
                id="telOficina"
                name="telOficina"
                value={formik.values.telOficina}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const regex = /^\d*$/;
                  if (regex.test(inputValue)) {
                    formik.handleChange(e);
                  } else if (inputValue === '') {
                    formik.handleChange(e);
                  }
                }}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.telOficina && Boolean(formik.errors.telOficina)
                }
                helperText={
                  formik.touched.telOficina && formik.errors.telOficina
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                label="Ext"
                type="text"
                id="extension"
                name="extension"
                value={formik.values.extension}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const regex = /^\d*$/;
                  if (regex.test(inputValue)) {
                    formik.handleChange(e);
                  } else if (inputValue === '') {
                    formik.handleChange(e);
                  }
                }}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.extension && Boolean(formik.errors.extension)
                }
                helperText={formik.touched.extension && formik.errors.extension}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                label="Télefono Móvil"
                type="text"
                id="telMovil"
                name="telMovil"
                value={formik.values.telMovil}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const regex = /^\d*$/;
                  if (regex.test(inputValue)) {
                    formik.handleChange(e);
                  } else if (inputValue === '') {
                    formik.handleChange(e);
                  }
                }}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.telMovil && Boolean(formik.errors.telMovil)
                }
                helperText={formik.touched.telMovil && formik.errors.telMovil}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                label="WhatsApp"
                type="text"
                id="whatsapp"
                name="whatsapp"
                value={formik.values.whatsapp}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const regex = /^\d*$/;
                  if (regex.test(inputValue)) {
                    formik.handleChange(e);
                  } else if (inputValue === '') {
                    formik.handleChange(e);
                  }
                }}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.whatsapp && Boolean(formik.errors.whatsapp)
                }
                helperText={formik.touched.whatsapp && formik.errors.whatsapp}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Dirección"
                type="text"
                id="direccion"
                name="direccion"
                value={formik.values.direccion}
                onChange={formik.handleChange}
              />
            </Grid>
            {dataEdit === null ? (
              <>
                <Grid item xs={12} sx={{ mt: 1 }}>
                  <Typography sx={style.infoText}>
                    Ingrese una contraseña:
                  </Typography>
                  <PopInformation text="Información" />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    fullWidth
                    label="Contraseña"
                    id="password"
                    name="password"
                    type={showPassword ? 'texto' : 'password'}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
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
                <Grid xs={12} sm={6} item>
                  <TextField
                    fullWidth
                    label="Confirme Contraseña"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'texto' : 'password'}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.confirmPassword &&
                      Boolean(formik.errors.confirmPassword)
                    }
                    helperText={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </>
            ) : null}
            <Grid item xs={12} sx={{ m: '20px 0px' }}>
              <Autocomplete
                id="nombreCliente"
                options={customersData}
                getOptionLabel={(option: any) => option.razonSocial}
                value={formik.values.nombreCliente}
                onChange={(_event, selected) => {
                  formik.setFieldValue('nombreCliente', selected);
                }}
                onBlur={formik.handleBlur}
                renderInput={(params) => (
                  <TextField
                    name="nombreCliente"
                    {...params}
                    label="Seleccione un cliente"
                    error={
                      formik.touched.nombreCliente &&
                      Boolean(formik.errors.nombreCliente)
                    }
                    helperText={
                      formik.touched.nombreCliente &&
                      formik.errors.nombreCliente
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notas"
                type="text"
                id="notas"
                name="notas"
                value={formik.values.notas}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
          <Stack
            direction="row"
            spacing={2}
            sx={{ mt: 4, width: 1, display: 'flex', justifyContent: 'end' }}
          >
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => {
                setOpenDrawer(!openDrawer);
                formik.resetForm();
                setShowConfirmPassword(false);
                setShowPassword(false);
                setDataEdit(null);
              }}
            >
              Cancelar
            </Button>
            <Button variant="contained" type="submit">
              {dataEdit !== null ? 'Guardar' : 'Crear'}
            </Button>
          </Stack>
        </form>
      </Drawer>
    </Grid>
  );
};

export { UserClients };
