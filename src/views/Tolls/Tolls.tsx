/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { Table } from '../../components/Table';
import { Button } from '@mui/material';
import {
  Add,
  DeleteOutlineOutlined,
  ModeEditOutlineOutlined,
} from '@mui/icons-material';
import { useHelpers } from './helpers';
import { Column, LoaderContextType } from '../../models';
import { useModal } from '../../components/Modal';
import { Formik } from 'formik';
import { DataToll } from './types';
import { useRootProvider } from '../../components/RootProvider/hooks/useRootProvider';
import { useLoader } from '../../components/Loader';
import { Helmet } from 'react-helmet-async';
import { HeaderTitleModal } from '../../components/Modal/HeaderTitleModal';
import { FormTolls } from './FormTolls';

const Tolls = () => {
  const { handleShowLoader }: LoaderContextType = useLoader();
  const { handleOpenModal, handleCloseModal } = useModal();
  const { actionsState, actionsCountries, actionsCatalogs }: any =
    useRootProvider();
  const { states, handleGetStates } = actionsState;
  const { countries, handleGetAllCountries } = actionsCountries;
  const { catalogs, handleGetCatalogs, handleGetUnitType, unitTypes } =
    actionsCatalogs;
  const {
    dataEdit,
    initialValues,
    validationSchema,
    handleSubmit,
    handleOpenModalDelete,
    handleGetToll,
    setDataEdit,
    setDataTemp,
  } = useHelpers();

  useEffect(() => {
    handleShowLoader(true);
    handleGetStates();
    handleGetAllCountries();
    handleGetCatalogs();
    setDataEdit(null);
    setDataTemp(null);
  }, []);

  useEffect(() => {
    if (catalogs.length > 0) handleGetUnitType(catalogs[2]?._id);
  }, [catalogs]);

  useEffect(() => {
    if (dataEdit) handleModal();
  }, [dataEdit]);

  const columns: Column[] = [
    { id: 'estadoNombre', label: 'Estado', align: 'left' },
    { id: 'nombre', label: 'Nombre Caseta/Peaje', align: 'left' },
    { id: 'tipoUnidad', label: 'Tipo de Unidad', align: 'left' },
    { id: 'costo', label: 'Costo', align: 'left' },
    { id: 'fechaCreacion', label: 'Fecha de creación', align: 'left' },
    {
      id: 'actions',
      label: 'Acciones',
      align: 'center',
      actions: [
        {
          label: 'Editar',
          icon: <ModeEditOutlineOutlined sx={{ width: 20, height: 20 }} />,
          onClick: (rowData: DataToll) => handleGetToll(rowData.codigo),
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
        <HeaderTitleModal
          handleToggleModal={handleToggleModal}
          title={dataEdit ? 'EDITAR PEAJE' : 'CREAR PEAJE'}
        />
      ),
      body: (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <FormTolls
            handleToggleModal={handleToggleModal}
            unitTypes={unitTypes}
            states={states}
            dataEdit={dataEdit}
          />
        </Formik>
      ),
    });
  };

  return (
    <>
      <Helmet>
        <title>MTSI | Peajes</title>
      </Helmet>
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
        data={countries}
      />
    </>
  );
};

export { Tolls };
