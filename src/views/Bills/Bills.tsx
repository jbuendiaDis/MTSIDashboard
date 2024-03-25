/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useLoader } from '../../components/Loader';
import { LoaderContextType, ModalContextType } from '../../models';
import { useHelpers } from './helpers';
import { Table } from '../../components/Table';
import { Column } from '../../models';
import {
  Add,
  DeleteOutlineOutlined,
  ModeEditOutlineOutlined,
} from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { useModal } from '../../components/Modal';
import { Formik } from 'formik';
import { TollExpensesData } from './types';
import { BillForm } from './BillForm';
import { HeaderTitleModal } from '../../components/Modal/HeaderTitleModal';

const Bills = () => {
  const { handleOpenModal, handleCloseModal }: ModalContextType = useModal();
  const { handleShowLoader }: LoaderContextType = useLoader();
  const {
    dataEdit,
    initialValues,
    billsDataTable,
    handleGetAllBills,
    handleGetBill,
    handleOpenDeleteModal,
    handleSubmit,
    setDataEdit,
    validationSchema,
  } = useHelpers();

  useEffect(() => {
    handleShowLoader(true);
    handleGetAllBills();
  }, []);

  useEffect(() => {
    if (dataEdit) handleModal();
  }, [dataEdit]);

  const handleToggleModal = (): void => {
    handleCloseModal();
    setDataEdit(null);
  };

  const columns: Column[] = [
    { id: 'nombreOrigen', label: 'Origen', align: 'left' },
    { id: 'nombreDestino', label: 'Destino', align: 'left' },
    { id: 'pasajeLocalOrigen', label: 'Pasaje Local Origen', align: 'left' },
    { id: 'pasajeLocalDestino', label: 'Pasaje Local Destino', align: 'left' },
    { id: 'pasajeOrigen', label: 'Pasaje Origen', align: 'left' },
    { id: 'pasajeDestino', label: 'Pasaje Destino', align: 'left' },
    { id: 'comidas', label: 'Comidas', align: 'left' },
    { id: 'hoteles', label: 'Hoteles', align: 'left' },
    { id: 'ferry', label: 'Ferry', align: 'left' },
    { id: 'taxi', label: 'Taxi', align: 'left' },
    { id: 'vuelo', label: 'Vuelo', align: 'left' },
    { id: 'seguroTraslado', label: 'Seguro de Traslado', align: 'left' },
    { id: 'liberacionPuerto', label: 'Liberacion de Puerto', align: 'left' },
    { id: 'pagoEstadia', label: 'Pago de Estadia', align: 'left' },
    { id: 'udsUsa', label: 'UDS/USA', align: 'left' },
    { id: 'urea', label: 'Urea', align: 'left' },
    { id: 'talachas', label: 'Talachas', align: 'left' },
    { id: 'extra', label: 'Extra', align: 'left' },
    { id: 'diselExtra', label: 'Diesel extra', align: 'left' },
    { id: 'fitosanitarias', label: 'Fito Sanitarias', align: 'left' },
    { id: 'totalPeajes', label: 'Total Peajes', align: 'left' },
    { id: 'kms', label: 'Total Kms', align: 'left' },
    {
      id: 'actions',
      label: 'Acciones',
      align: 'center',
      actions: [
        {
          label: 'Editar',
          icon: <ModeEditOutlineOutlined sx={{ width: 20, height: 20 }} />,
          onClick: (rowData: TollExpensesData['data']) =>
            handleGetBill(rowData._id),
        },
        {
          label: 'Eliminar',
          icon: (
            <DeleteOutlineOutlined
              sx={{ width: 20, height: 20, color: 'red' }}
            />
          ),
          onClick: (rowData: TollExpensesData['data']) =>
            handleOpenDeleteModal(rowData),
        },
      ],
    },
  ];

  const handleModal = () => {
    handleOpenModal({
      fullWidth: true,
      maxWidth: 'md',
      title: (
        <HeaderTitleModal
          handleToggleModal={handleToggleModal}
          title={dataEdit ? 'EDITAR GASTO' : 'CREAR GASTO'}
        />
      ),
      body: (
        <Box sx={{ mt: 2 }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <BillForm
              handleToggleModal={handleToggleModal}
              dataEdit={dataEdit}
            />
          </Formik>
        </Box>
      ),
    });
  };

  return (
    <div>
      <Table
        showCheckboxes={false}
        tableHead
        title="Gastos"
        data={billsDataTable}
        columns={columns}
        customButton
        renderCustomButton={
          <Button
            variant="contained"
            color="inherit"
            sx={{ p: '10px 20px', letterSpacing: '1px' }}
            onClick={() => handleModal()}
            startIcon={<Add />}
          >
            Agregar Gasto
          </Button>
        }
      />
    </div>
  );
};

export { Bills };
