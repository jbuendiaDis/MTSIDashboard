/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useLoader } from '../../components/Loader';
import { LoaderContextType, ModalContextType } from '../../models';
import { useHelpers } from './helpers';
import { Table } from '../../components/Table';
import { Column } from '../../models';
import {
  Add,
  Close,
  DeleteOutlineOutlined,
  ModeEditOutlineOutlined,
  VisibilityOutlined,
} from '@mui/icons-material';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { useModal } from '../../components/Modal';
import { Formik, Form } from 'formik';
import Input from '../../components/Input/Input';
import { TollExpensesData } from './types';
import { DetailBills } from './DetailBills';
import { BillForm } from './BillForm';

const Bills = () => {
  const { handleOpenModal, handleCloseModal }: ModalContextType = useModal();
  const { handleShowLoader }: LoaderContextType = useLoader();
  const {
    initialValues,
    billsDataTable,
    handleGetAllBills,
    handleGetBill,
    handleOpenDeleteModal,
    handleSubmit,
    validationSchema,
  } = useHelpers();

  useEffect(() => {
    handleShowLoader(true);
    handleGetAllBills();
  }, []);

  const handleToggleModal = (): void => {
    handleCloseModal();
    // setDataEdit(null);
  };

  const columns: Column[] = [
    { id: 'origen', label: 'Origen', align: 'left' },
    { id: 'destino', label: 'Destino', align: 'left' },
    { id: 'pasajeOrigen', label: 'Pasaje Origen', align: 'left' },
    { id: 'pasajeDestino', label: 'Pasaje Destino', align: 'left' },
    { id: 'comidas', label: 'Comidas', align: 'left' },
    { id: 'hoteles', label: 'Hoteles', align: 'left' },
    { id: 'totalPeajes', label: 'Total Peajes', align: 'left' },
    { id: 'totalKilometers', label: 'Total Kms', align: 'left' },
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
          label: 'Detalle',
          icon: <VisibilityOutlined sx={{ width: 20, height: 20 }} />,
          onClick: (rowData: TollExpensesData['data']) =>
            hanldeDetailBills(rowData),
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

  const hanldeDetailBills = (data: TollExpensesData['data']) => {
    console.log('data', data);
    handleOpenModal({
      fullWidth: true,
      maxWidth: 'md',
      title: (
        <Box component="div">
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <IconButton onClick={() => handleCloseModal()}>
              <Close />
            </IconButton>
          </Box>
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              fontWeight: 700,
              letterSpacing: '1.2px',
              fontSize: '20px',
              textTransform: 'uppercase',
            }}
          >
            Detalle de Gastos
          </Typography>
        </Box>
      ),
      body: <DetailBills detailBillsData={data} />,
    });
  };

  const handleModal = () => {
    handleOpenModal({
      fullWidth: true,
      maxWidth: 'sm',
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
            {'CREAR GASTO'}
          </Typography>
        </Box>
      ),
      body: (
        <Box sx={{ mt: 2 }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <BillForm handleToggleModal={handleToggleModal} />
            </Form>
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
