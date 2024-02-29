import { useEffect, useState } from 'react';
import { useLoader } from '../../components/Loader';
import { LoaderContextType } from '../../models';
import { useApi } from '../../hooks/useApi';
import { DataUsers, Payload } from './types';
import { Table } from '../../components/Table';
import {
  Add,
  ModeEditOutlineOutlined,
  DeleteOutlineOutlined,
} from '@mui/icons-material';
import {
  Button,
  Grid,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { Column } from '../../models';
import { Drawer } from '../../components/Drawer';
import { Response } from '../../models/responseApi';
import { useHelpers } from './helpers';
import { useModalConfirmation } from '../../hooks/useModalConfirmation';
import { UserStyles } from './UserStyles';
import { PopInformation } from '../../components/PopInformation';
import UploadFile from '../../components/Input/UploadFile/UploadFile';

const Users = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const style = UserStyles;
  const { handleShowLoader }: LoaderContextType = useLoader();
  const { modalDelete, modalSuccess } = useModalConfirmation();
  const {
    formik,
    usersTable,
    idUserEdit,
    handleGetUsers,
    handleUpdateUser,
    setIdUserEdit,
  } = useHelpers({
    setOpenDrawer,
  });

  const _deleteUser = useApi({
    endpoint: '/users',
    method: 'delete',
  });

  useEffect(() => {
    handleShowLoader(true);
    handleGetUsers();
  }, []);

  const handleOpenModalDelete = (data: DataUsers) => {
    const message: string = '¿Seguro que desea eliminar:';
    const dataValue = `${data?.name} ${data?.lastname}`;
    modalDelete({
      message,
      dataValue,
      callbackConfirm: () => handleDelete(data._id),
    });
  };

  const handleDelete = async (id: string): Promise<boolean> => {
    try {
      const { response }: Payload = await _deleteUser({
        urlParam: id,
      });
      const code: Response['code'] = response.code;
      const message: Response['message'] = response.message;

      if (code === 200) {
        modalSuccess({ message });
        handleGetUsers();
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(!openDrawer);
    setShowConfirmPassword(false);
    setShowPassword(false);
  };

  const columns: Column[] = [
    { id: 'name', label: 'Nombre', align: 'left' },
    { id: 'lastname', label: 'Apellido', align: 'left' },
    { id: 'age', label: 'Edad', align: 'left' },
    { id: 'email', label: 'Email', align: 'left' },
    { id: 'position', label: 'Puesto', align: 'left' },
    { id: 'confirmSignature', label: 'Firma', align: 'left' },
    {
      id: 'actions',
      label: 'Acciones',
      align: 'center',
      actions: [
        {
          label: 'Editar',
          icon: <ModeEditOutlineOutlined sx={{ width: 20, height: 20 }} />,
          onClick: (rowData: DataUsers) => handleUpdateUser(rowData),
        },
        {
          label: 'Eliminar',
          icon: (
            <DeleteOutlineOutlined
              sx={{ width: 20, height: 20, color: 'red' }}
            />
          ),
          onClick: (rowData: DataUsers) => handleOpenModalDelete(rowData),
        },
      ],
    },
  ];

  return (
    <>
      <Table
        showCheckboxes={false}
        tableHead={true}
        title="Usuarios"
        columns={columns}
        data={usersTable}
        customButton
        renderCustomButton={
          <Button
            variant="contained"
            color="inherit"
            sx={{ p: '10px 20px', letterSpacing: '1px' }}
            onClick={() => {
              formik.resetForm();
              setOpenDrawer(true);
              setIdUserEdit('');
            }}
            startIcon={<Add />}
          >
            Agregar Usuario
          </Button>
        }
      />

      <Drawer
        open={openDrawer}
        anchor="right"
        onClose={() => handleCloseDrawer()}
        title={idUserEdit !== '' ? 'Editar Usuario' : 'Crear Usuario'}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={1.5} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Typography sx={style.textDescription}>
                Información General del Contacto:
              </Typography>
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                fullWidth
                label="Nombre"
                type="text"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                fullWidth
                label="Apellido"
                type="text"
                id="lastname"
                name="lastname"
                value={formik.values.lastname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.lastname && Boolean(formik.errors.lastname)
                }
                helperText={formik.touched.lastname && formik.errors.lastname}
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                fullWidth
                label="Edad"
                type="text"
                id="age"
                name="age"
                value={formik.values.age}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid xs={12} sm={6} item>
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
                disabled={idUserEdit ? true : false}
              />
            </Grid>
            <Grid xs={12} item>
              <TextField
                fullWidth
                label="Puesto"
                id="position"
                name="position"
                type="text"
                value={formik.values.position}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.position && Boolean(formik.errors.position)
                }
                helperText={formik.touched.position && formik.errors.position}
              />
            </Grid>

            {idUserEdit === '' ? (
              <>
                <Grid item xs={12} sx={{ mt: 1 }}>
                  <Typography sx={style.textDescription}>
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
            <Grid item xs={12} sx={{ mt: 1 }}>
              <Typography sx={style.textDescription}>
                Carga de Imagen:
              </Typography>
              <Typography component="span" sx={{ fontSize: 14 }}>
                Solo se permiten imagenes con formato .png, .jpg o .jpeg
              </Typography>
            </Grid>
            <Grid item>
              <UploadFile
                onChange={(values: any) =>
                  formik.setFieldValue('signature', values)
                }
                values={formik.values.signature}
                multiple={false}
                label="Cargar Imagen"
                name="signature"
                error={
                  formik.touched.signature && Boolean(formik.errors.signature)
                }
                helperText={formik.touched.signature && formik.errors.signature}
              />
            </Grid>
          </Grid>
          <Stack direction="row" spacing={2} sx={style.contentButtons}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => handleCloseDrawer()}
            >
              Cancelar
            </Button>
            <Button variant="contained" type="submit">
              {idUserEdit !== '' ? 'Guardar' : 'Crear Usuario'}
            </Button>
          </Stack>
        </form>
      </Drawer>
    </>
  );
};

export { Users };
