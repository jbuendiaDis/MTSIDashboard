/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { Button, Typography, IconButton, Box } from '@mui/material';
import {
  Add,
  ModeEditOutlineOutlined,
  DeleteOutlineOutlined,
  Close,
} from '@mui/icons-material';
import { useLoader } from '../../components/Loader';
import { LoaderContextType, ModalContextType } from '../../models';
import { Table } from '../../components/Table';
import { useHelpers } from './helpers';
import { Column } from '../../models';
import { useModal } from '../../components/Modal';
import { Form, Formik } from 'formik';
import { Transfer } from './types';
import { TransferForm } from './TransferForm';

const Transfers = () => {
  const { handleOpenModal, handleCloseModal }: ModalContextType = useModal();
  const { handleShowLoader }: LoaderContextType = useLoader();
  const {
    dataEdit,
    initialValues,
    transfersData,
    validationSchema,
    setDataEdit,
    handleOpenModalDelete,
    handleGetTransfers,
    handleGetTrasnfer,
    handleSubmit,
  } = useHelpers();

  useEffect(() => {
    handleShowLoader(true);
    handleGetTransfers();
  }, []);

  useEffect(() => {
    if (dataEdit !== null) handleModal();
  }, [dataEdit]);

  const columns: Column[] = [
    { id: 'concepto', label: 'Concepto', align: 'left' },
    { id: 'sueldo', label: 'Sueldo', align: 'left' },
    { id: 'tipoTraslado', label: 'Tipo de Traslado', align: 'left' },
    {
      id: 'actions',
      label: 'Acciones',
      align: 'center',
      actions: [
        {
          label: 'Editar',
          icon: <ModeEditOutlineOutlined sx={{ width: 20, height: 20 }} />,
          onClick: (rowData: Transfer) => handleGetTrasnfer(rowData._id),
        },
        {
          label: 'Eliminar',
          icon: (
            <DeleteOutlineOutlined
              sx={{ width: 20, height: 20, color: 'red' }}
            />
          ),
          onClick: (rowData: Transfer) => handleOpenModalDelete(rowData),
        },
      ],
    },
  ];

  const toggleCloseModal = (): void => {
    setDataEdit(null);
    handleCloseModal();
  };

  const handleModal = () => {
    handleOpenModal({
      fullWidth: true,
      maxWidth: 'sm',
      title: (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <IconButton onClick={toggleCloseModal}>
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
            {dataEdit ? 'Editar Traslado' : 'Crear Traslado'}
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
            <TransferForm
              toggleCloseModal={toggleCloseModal}
              dataEdit={dataEdit}
            />
          </Form>
        </Formik>
      ),
    });
  };

  return (
    <div>
      <Table
        tableHead
        showCheckboxes={false}
        title="Traslados"
        customButton
        renderCustomButton={
          <Button
            variant="contained"
            color="inherit"
            sx={{ p: '10px 20px', letterSpacing: '1px' }}
            onClick={() => handleModal()}
            startIcon={<Add />}
          >
            Agregar Traslado
          </Button>
        }
        columns={columns}
        data={transfersData}
      />
    </div>
  );
};

export { Transfers };
