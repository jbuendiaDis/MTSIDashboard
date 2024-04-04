/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { Button } from '@mui/material';
import {
  Add,
  ModeEditOutlineOutlined,
  DeleteOutlineOutlined,
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
import { HeaderTitleModal } from '../../components/Modal/HeaderTitleModal';

const Transfers = () => {
  const { handleOpenModal, handleCloseModal }: ModalContextType = useModal();
  const { handleShowLoader }: LoaderContextType = useLoader();
  const {
    dataEdit,
    initialValues,
    transfersData,
    validationSchema,
    optionsTraslados,
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

  const handleToggleModal = (): void => {
    setDataEdit(null);
    handleCloseModal();
  };

  const handleModal = () => {
    handleOpenModal({
      fullWidth: true,
      maxWidth: 'sm',
      title: (
        <HeaderTitleModal
          handleToggleModal={handleToggleModal}
          title={dataEdit ? 'EDITAR TRASLADO' : 'CREAR TRASLADO'}
        />
      ),
      body: (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <TransferForm
              toggleCloseModal={handleToggleModal}
              dataEdit={dataEdit}
              optionsTraslados={optionsTraslados}
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
