/* eslint-disable react-hooks/exhaustive-deps */
import { Table } from '../../components/Table';
import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  InputAdornment,
  MenuItem,
  Stack,
  Typography,
  Theme,
} from '@mui/material';
import {
  Add,
  DeleteOutlineOutlined,
  ModeEditOutlineOutlined,
} from '@mui/icons-material';
import { useHelpers } from './helpers';
import { Column, LoaderContextType } from '../../models';
import { DataTolls, TableDots } from './types';
import { HeaderTitleModal } from '../../components/Modal/HeaderTitleModal';
import { useRootProvider } from '../../components/RootProvider/hooks/useRootProvider';
import { useEffect, useState } from 'react';
import { useLoader } from '../../components/Loader';

const Routes = () => {
  // const [stateSelected, setStateSelected] = useState(null);
  const [open, setOpen] = useState<boolean>(false);
  const { handleShowLoader }: LoaderContextType = useLoader();
  const { actionsState, actionsCountries }: any = useRootProvider();
  const { states, handleGetStates } = actionsState;
  const { countries, handleGetCountrie } = actionsCountries;
  const {
    tollsData,
    formik,
    pagoCasetas,
    nombreCaseta,
    costo,
    dataDotsTable,
    setPagoCasetas,
    setNombreCaseta,
    setCosto,
    handleOpenModalDelete,
    handleGetToll,
    handleAddDot,
    handleRemoveDot,
    setDataDotsTable,
  } = useHelpers();

  useEffect(() => {
    handleShowLoader(true);
    handleGetStates();
    // handleGetAllCountries();
  }, []);

  useEffect(() => {
    if (formik.values.state !== null) {
      handleGetCountrie(formik.values.state);
      formik.setValues({
        ...formik.values,
        localidadOrigen: null,
        localidadDestino: null,
      });
    }
  }, [formik.values.state]);

  // const handleToggleModal = (): void => {
  //   handleCloseModal();
  //   // setDataEdit(null);
  // };

  const columns: Column[] = [
    { id: 'localidadOrigen', label: 'Localidad Origen', align: 'left' },
    { id: 'localidadDestino', label: 'Localidad Destino', align: 'left' },
    { id: 'totalKilometers', label: 'Kilometros', align: 'left' },
    { id: 'costTotalPeajes', label: 'Total Peajes', align: 'left' },
    { id: 'tipoUnidad', label: 'Tipo Unidad', align: 'left' },
    {
      id: 'actions',
      label: 'Acciones',
      align: 'center',
      actions: [
        {
          label: 'Editar',
          icon: <ModeEditOutlineOutlined sx={{ width: 20, height: 20 }} />,
          onClick: (rowData: DataTolls) => handleGetToll(rowData._id),
        },
        {
          label: 'Eliminar',
          icon: (
            <DeleteOutlineOutlined
              sx={{ width: 20, height: 20, color: 'red' }}
            />
          ),
          onClick: (rowData: DataTolls) => handleOpenModalDelete(rowData),
        },
      ],
    },
  ];

  const columnsDots: Column[] = [
    { id: '_id', label: 'Id', align: 'left' },
    { id: 'casetas', label: 'Pago Caseta', align: 'left' },
    { id: 'nombreCaseta', label: 'Nombre Caseta', align: 'left' },
    { id: 'costo', label: 'Costo', align: 'left' },
    {
      id: 'actions',
      label: 'Acciones',
      align: 'center',
      actions: [
        {
          label: 'Eliminar',
          icon: (
            <DeleteOutlineOutlined
              sx={{ width: 20, height: 20, color: 'red' }}
            />
          ),
          onClick: (rowData: TableDots) => handleRemoveDot(rowData._id),
        },
      ],
    },
  ];

  const options: any = [
    {
      label: 'VIAPASS',
      value: 'VIAPASS',
    },
    {
      label: 'EFEC',
      value: 'EFEC',
    },
  ];

  return (
    <div>
      <Table
        tableHead
        customButton
        showCheckboxes={false}
        title="Rutas"
        renderCustomButton={
          <Button
            variant="contained"
            color="inherit"
            sx={{ p: '10px 20px', letterSpacing: '1px' }}
            onClick={() => {
              setOpen(!open);
              formik.resetForm();
              setPagoCasetas('');
              setNombreCaseta('');
              setCosto(0);
              // setErrorDots('');
              setDataDotsTable([]);
            }}
            startIcon={<Add />}
          >
            Agregar Ruta
          </Button>
        }
        columns={columns}
        data={tollsData}
      />

      <Dialog
        open={open}
        fullWidth
        onClose={() => {}}
        maxWidth="xl"
        sx={{
          p: 2,
          zIndex: (theme) => `${theme.zIndex.drawer + 2} !important`,
        }}
      >
        <DialogTitle>
          <HeaderTitleModal
            handleToggleModal={() => {
              setOpen(false);
              setPagoCasetas('');
              setNombreCaseta('');
              setCosto(0);
            }}
            title="CREAR"
          />
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <Autocomplete
                  id="state"
                  options={states}
                  getOptionLabel={(option: any) => option.label}
                  value={formik.values.state}
                  onChange={(_event, selected) => {
                    formik.setFieldValue('state', selected);
                  }}
                  onBlur={formik.handleBlur}
                  renderInput={(params) => (
                    <TextField
                      name="state"
                      {...params}
                      label="Seleccione un estado"
                      error={
                        formik.touched.state && Boolean(formik.errors.state)
                      }
                      helperText={formik.touched.state && formik.errors.state}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <Autocomplete
                  id="localidadOrigen"
                  options={countries}
                  getOptionLabel={(option: any) => option.nombre}
                  value={formik.values.localidadOrigen}
                  onChange={(_event, selected) => {
                    formik.setFieldValue('localidadOrigen', selected);
                  }}
                  onBlur={formik.handleBlur}
                  renderInput={(params) => (
                    <TextField
                      name="localidadOrigen"
                      {...params}
                      label="Seleccione un origen"
                      error={
                        formik.touched.localidadOrigen &&
                        Boolean(formik.errors.localidadOrigen)
                      }
                      helperText={
                        formik.touched.localidadOrigen &&
                        formik.errors.localidadOrigen
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <Autocomplete
                  id="localidadDestino"
                  options={countries}
                  getOptionLabel={(option: any) => option.nombre}
                  value={formik.values.localidadDestino}
                  onChange={(_event, selected) => {
                    formik.setFieldValue('localidadDestino', selected);
                  }}
                  onBlur={formik.handleBlur}
                  renderInput={(params) => (
                    <TextField
                      name="localidadDestino"
                      {...params}
                      label="Seleccione un destino"
                      error={
                        formik.touched.localidadDestino &&
                        Boolean(formik.errors.localidadDestino)
                      }
                      helperText={
                        formik.touched.localidadDestino &&
                        formik.errors.localidadDestino
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <TextField
                  fullWidth
                  label="Kilometraje"
                  type="number"
                  id="kms"
                  name="kms"
                  value={formik.values.kms}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.kms && Boolean(formik.errors.kms)}
                  helperText={formik.touched.kms && formik.errors.kms}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <TextField
                  fullWidth
                  label="Tipo Unidad"
                  type="string"
                  id="tipoUnidad"
                  name="tipoUnidad"
                  value={formik.values.tipoUnidad}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.tipoUnidad &&
                    Boolean(formik.errors.tipoUnidad)
                  }
                  helperText={
                    formik.touched.tipoUnidad && formik.errors.tipoUnidad
                  }
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <Typography
                  sx={{
                    letterSpacing: '1px',
                    fontSize: '16px',
                    color: (theme: Theme) => theme.palette.grey[500],
                  }}
                >
                  Agregue Puntos:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <TextField
                  fullWidth
                  select
                  label="Pago de Casetas"
                  value={pagoCasetas}
                  onChange={(e: any) => setPagoCasetas(e.target.value)}
                  // error={errorDots !== '' ? true : false}
                >
                  {options.map((item: any) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <TextField
                  fullWidth
                  label="Nombre de Caseta"
                  value={nombreCaseta}
                  onChange={(e: any) => setNombreCaseta(e.target.value)}
                  // error={errorDots !== '' ? true : false}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={2}>
                <TextField
                  fullWidth
                  label="Costo de Caseta"
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  value={costo}
                  onChange={(e: any) => setCosto(e.target.value)}
                  // error={errorDots !== '' ? true : false}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={2}
                sx={{
                  display: 'flex',
                  justifyContent: 'end',
                }}
              >
                <Grid component="div">
                  <Button
                    variant="contained"
                    color="inherit"
                    sx={{ p: 1, letterSpacing: '1px' }}
                    type="button"
                    onClick={handleAddDot}
                    disabled={
                      pagoCasetas !== '' && nombreCaseta !== '' && costo !== 0
                        ? false
                        : true
                    }
                  >
                    Agregar Punto
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            {/* <Typography
              component="span"
              sx={{ color: '#FF5630', fontSize: '13px', mt: 2, mb: 2 }}
            >
              {errorDots}
            </Typography> */}

            <Grid component="div" sx={{ mt: 2 }}>
              <Table
                showCheckboxes={false}
                columns={columnsDots}
                data={dataDotsTable}
              />
            </Grid>
            <Stack spacing={2} direction="row" justifyContent="end" mt={2}>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => {
                  setOpen(false);
                  setPagoCasetas('');
                  setNombreCaseta('');
                  setCosto(0);
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                type="submit"
                // onClick={() => {
                //   if (dataDotsTable.length === 0)
                //     setErrorDots('Debe Ingresar por lo menos un Punto.');
                // }}
              >
                Crear
              </Button>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export { Routes };
