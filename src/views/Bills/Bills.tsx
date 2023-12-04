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
  ModeEditOutlineOutlined,
  SnoozeTwoTone,
  VisibilityOutlined,
} from '@mui/icons-material';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { useModal } from '../../components/Modal';
import { Formik, Form } from 'formik';
import Input from '../../components/Input/Input';
import { PayloadTollExpenses } from './types';

const Bills = () => {
  const { handleOpenModal, handleCloseModal }: ModalContextType = useModal();
  const { handleShowLoader }: LoaderContextType = useLoader();
  const {
    initialValues,
    billsDataTable,
    handleGetAllBills,
    handleGetBill,
    handleSubmit,
  } = useHelpers();

  useEffect(() => {
    handleShowLoader(true);
    handleGetAllBills();
  }, []);

  const columns: Column[] = [
    { id: 'origen', label: 'Origen', align: 'left' },
    { id: 'destino', label: 'Destino', align: 'left' },
    { id: 'comidas', label: 'Comidas', align: 'left' },
    { id: 'hoteles', label: 'Hoteles', align: 'left' },
    { id: 'pasajeOrigen', label: 'Pasaje Origen', align: 'left' },
    { id: 'pasajeDestino', label: 'Pasaje Destino', align: 'left' },
    { id: 'totalKilometers', label: 'Total Kms', align: 'left' },
    { id: 'totalPeajes', label: 'Total Peajes', align: 'left' },
    {
      id: 'actions',
      label: 'Acciones',
      align: 'center',
      actions: [
        // {
        //   label: 'Editar',
        //   icon: <ModeEditOutlineOutlined sx={{ width: 20, height: 20 }} />,
        //   onClick: (rowData: PayloadTollExpenses) => handleGetBill(rowData),
        // },
        {
          label: 'Detalle',
          icon: <VisibilityOutlined sx={{ width: 20, height: 20 }} />,
          onClick: (rowData: PayloadTollExpenses) => hanldeDetailBills(rowData),
        },
        // {
        //   label: 'Eliminar',
        //   icon: (
        //     <DeleteOutlineOutlined
        //       sx={{ width: 20, height: 20, color: 'red' }}
        //     />
        //   ),
        //   onClick: (rowData: DataUsers) => handleOpenModalDelete(rowData),
        // },
      ],
    },
  ];

  const hanldeDetailBills = (data: PayloadTollExpenses) => {
    handleOpenModal({
      fullWidth: true,
      maxWidth: 'sm',
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
            Detalle
          </Typography>
        </Box>
      ),
      body: <Box component="div">hola</Box>,
    });
  };

  const handleModal = () => {
    handleOpenModal({
      // fullWidth: true,
      // maxWidth: 'sm',
      title: 'Modal',
      body: (
        <Box sx={{ mt: 2 }}>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <Input label="example" name="canem" />
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
