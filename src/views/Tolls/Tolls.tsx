/* eslint-disable react-hooks/exhaustive-deps */
import { Table } from '../../components/Table';
import {
  Box,
  Button,
  IconButton,
  Typography,
  InputAdornment,
  Grid,
} from '@mui/material';
import {
  Add,
  Close,
  DeleteOutlineOutlined,
  ModeEditOutlineOutlined,
} from '@mui/icons-material';
import { useHelpers } from './helpers';
import { Column, LoaderContextType } from '../../models';
import { useModal } from '../../components/Modal';
import { Form, Formik } from 'formik';
import Input from '../../components/Input/Input';
import { Stack } from '@mui/system';
import { DataToll } from './types';
import { AutoCompleteComponent } from '../../components/Input/AutoCompleteComponent';
import { useRootProvider } from '../../components/RootProvider/hooks/useRootProvider';
import { useEffect } from 'react';
import { useLoader } from '../../components/Loader';

const Tolls = () => {
  const { handleShowLoader }: LoaderContextType = useLoader();
  const { handleOpenModal, handleCloseModal } = useModal();
  const { actionsState }: any = useRootProvider();
  const { states, handleGetStates } = actionsState;
  const {
    dataEdit,
    tollsData,
    initialValues,
    validationSchema,
    handleSubmit,
    handleOpenModalDelete,
    handleGetToll,
    setDataEdit,
  } = useHelpers();

  useEffect(() => {
    handleShowLoader(true);
    handleGetStates();
  }, []);

  useEffect(() => {
    if (dataEdit) handleModal();
  }, [dataEdit]);

  const columns: Column[] = [
    { id: 'nombre', label: 'Nombre', align: 'left' },
    { id: 'fechaCreacion', label: 'Fecha de creación', align: 'left' },
    { id: 'costo', label: 'Costo', align: 'left' },
    {
      id: 'actions',
      label: 'Acciones',
      align: 'center',
      actions: [
        {
          label: 'Editar',
          icon: <ModeEditOutlineOutlined sx={{ width: 20, height: 20 }} />,
          onClick: (rowData: DataToll) => handleGetToll(rowData.codigo, states),
        },
        {
          label: 'Eliminar',
          icon: (
            <DeleteOutlineOutlined
              sx={{ width: 20, height: 20, color: 'red' }}
            />
          ),
          onClick: (rowData: DataToll) => handleOpenModalDelete(rowData),
        },
      ],
    },
  ];

  const handleToggleModal = (): void => {
    handleCloseModal();
    setDataEdit(null);
  };

  const handleModal = () => {
    handleOpenModal({
      fullWidth: true,
      maxWidth: 'xs',
      title: (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <IconButton onClick={handleToggleModal}>
              <Close />
            </IconButton>
          </Box>
          <Typography
            sx={{
              textAlign: 'center',
              fontWeight: 700,
              letterSpacing: '1.2px',
              fontSize: '20px',
            }}
          >
            {dataEdit ? 'EDITAR PEAJE' : 'CREAR PEAJE'}
          </Typography>
        </Box>
      ),
      body: (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <AutoCompleteComponent
                  label="Seleccione un estado"
                  name="state"
                  options={states}
                  labelField="label"
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  fullWidth
                  type="text"
                  label="Nombre Caseta"
                  name="nombre"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  fullWidth
                  type="number"
                  label="Costo"
                  placeholder="0.00"
                  name="costo"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input fullWidth type="number" label="Código" name="codigo" />
              </Grid>
            </Grid>
            <Stack
              spacing={2}
              direction="row"
              mt={3}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Button
                variant="outlined"
                color="inherit"
                type="button"
                onClick={handleToggleModal}
              >
                Cancelar
              </Button>
              <Button variant="contained" type="submit">
                {dataEdit ? 'Guardar' : 'Crear'}
              </Button>
            </Stack>
          </Form>
        </Formik>
      ),
    });
  };

  return (
    <div>
      <Table
        tableHead
        customButton
        showCheckboxes={false}
        title="Peajes"
        renderCustomButton={
          <Button
            variant="contained"
            color="inherit"
            sx={{ p: '10px 20px', letterSpacing: '1px' }}
            onClick={() => {
              handleModal();
              setDataEdit(null);
            }}
            startIcon={<Add />}
          >
            Agregar Peaje
          </Button>
        }
        columns={columns}
        data={tollsData}
      />
    </div>
  );
};

export { Tolls };
