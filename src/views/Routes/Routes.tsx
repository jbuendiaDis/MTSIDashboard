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
  VisibilityOutlined,
} from '@mui/icons-material';
import { useHelpers } from './helpers';
import { Column, LoaderContextType } from '../../models';
import { DataTolls, TableDots } from './types';
import { HeaderTitleModal } from '../../components/Modal/HeaderTitleModal';
import { useRootProvider } from '../../components/RootProvider/hooks/useRootProvider';
import { useEffect, useState } from 'react';
import { useLoader } from '../../components/Loader';
import { useModal } from '../../components/Modal';
import { DetailDots } from './DetailDots';

const Routes = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { handleOpenModal, handleCloseModal } = useModal();
  const { handleShowLoader }: LoaderContextType = useLoader();
  const { actionsState, actionsCountries, actionsCatalogs }: any =
    useRootProvider();
  const { states, handleGetStates } = actionsState;
  const { countries, handleGetCountrie, countriesByState } = actionsCountries;
  const { catalogs, handleGetCatalogs, handleGetUnitType, unitTypes } =
    actionsCatalogs;
  const {
    tollsData,
    formik,
    pagoCasetas,
    nombreCaseta,
    costo,
    dataDotsTable,
    dataEdit,
    dataDestinoLocation,
    allDataTolls,
    setPagoCasetas,
    setNombreCaseta,
    setCosto,
    handleOpenModalDelete,
    handleGetToll,
    handleAddDot,
    handleRemoveDot,
    setDataDotsTable,
    handleGetCountrieDestino,
  } = useHelpers();

  useEffect(() => {
    handleShowLoader(true);
    handleGetStates();
    handleGetCatalogs();
  }, []);

  useEffect(() => {
    if (catalogs.length > 0) handleGetUnitType(catalogs[2]?._id);
  }, [catalogs]);

  useEffect(() => {
    if (dataEdit) {
      setOpen(true);
    }
  }, [dataEdit]);

  useEffect(() => {
    if (formik.values.stateOrigen !== null) {
      handleGetCountrie(formik.values.stateOrigen);
      formik.setValues({
        ...formik.values,
        localidadOrigen: null,
      });
    }
  }, [formik.values.stateOrigen]);

  useEffect(() => {
    if (formik.values.stateDestino !== null) {
      handleGetCountrieDestino(formik.values.stateDestino);
      formik.setValues({
        ...formik.values,
        localidadDestino: null,
      });
    }
  }, [formik.values.stateDestino]);

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
          label: 'Detalle',
          icon: <VisibilityOutlined sx={{ width: 20, height: 20 }} />,
          onClick: (rowData: DataTolls) => hanldeDetailBills(rowData),
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

  const hanldeDetailBills = (data: DataTolls) => {
    handleOpenModal({
      fullWidth: true,
      maxWidth: 'md',
      title: (
        <HeaderTitleModal
          title="DETALLE"
          handleToggleModal={() => handleCloseModal()}
        />
      ),
      body: <DetailDots detailDotsData={data} />,
    });
  };

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

  console.log('states', states);

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
            title="CREAR RUTA"
          />
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <Autocomplete
                  id="stateOrigen"
                  options={states}
                  getOptionLabel={(option: any) => option.label}
                  value={formik.values.stateOrigen}
                  onChange={(_event, selected) => {
                    formik.setFieldValue('stateOrigen', selected);
                  }}
                  onBlur={formik.handleBlur}
                  renderInput={(params) => (
                    <TextField
                      name="stateOrigen"
                      {...params}
                      label="Estado origen"
                      error={
                        formik.touched.stateOrigen &&
                        Boolean(formik.errors.stateOrigen)
                      }
                      helperText={
                        formik.touched.stateOrigen && formik.errors.stateOrigen
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <Autocomplete
                  id="localidadOrigen"
                  options={countriesByState}
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
                      label="Localidad origen"
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
                  id="stateDestino"
                  options={states}
                  getOptionLabel={(option: any) => option.label}
                  value={formik.values.stateDestino}
                  onChange={(_event, selected) => {
                    formik.setFieldValue('stateDestino', selected);
                  }}
                  onBlur={formik.handleBlur}
                  renderInput={(params) => (
                    <TextField
                      name="stateDestino"
                      {...params}
                      label="Estado destino"
                      error={
                        formik.touched.stateDestino &&
                        Boolean(formik.errors.stateDestino)
                      }
                      helperText={
                        formik.touched.stateDestino &&
                        formik.errors.stateDestino
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <Autocomplete
                  id="localidadDestino"
                  options={dataDestinoLocation}
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
                      label="Localidad destino"
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
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">kms</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <TextField
                  fullWidth
                  label="Tipo Unidad"
                  select
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
                >
                  {unitTypes.map((item: any) => (
                    <MenuItem key={item.descripcion} value={item.descripcion}>
                      {item.descripcion}
                    </MenuItem>
                  ))}
                </TextField>
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
                  Agregue Rutas:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={2}>
                <TextField
                  fullWidth
                  select
                  label="Pago de Caseta"
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
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Autocomplete
                  options={states}
                  getOptionLabel={(option: any) => option.label || ''}
                  // isOptionEqualToValue={(option, value) =>
                  //   option._id === value?._id
                  // }
                  onChange={(_event, value) => setNombreCaseta(value)}
                  renderInput={(params) => (
                    <TextField {...params} label="Seleccione un estado" />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Autocomplete
                  options={allDataTolls}
                  getOptionLabel={(option) => option.nombre || ''}
                  // isOptionEqualToValue={(option, value) =>
                  //   option._id === value?._id
                  // }
                  onChange={(_event, value) => setNombreCaseta(value)}
                  renderInput={(params) => (
                    <TextField {...params} label="Seleccione una Caseta" />
                  )}
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
                      pagoCasetas !== '' && nombreCaseta !== '' ? false : true
                    }
                  >
                    Agregar Punto
                  </Button>
                </Grid>
              </Grid>
            </Grid>

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
