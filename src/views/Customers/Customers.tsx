/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useLoader } from '../../components/Loader';
import { LoaderContextType, ModalContextType } from '../../models';
import { Table } from '../../components/Table';
import {
  Add,
  Close,
  DeleteOutlineOutlined,
  ModeEditOutlineOutlined,
} from '@mui/icons-material';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { useHelpers } from './helpers';
import { PaylaodCustomers, Payload } from './types';
import { Response } from '../../models/responseApi';
import { useApi } from '../../hooks/useApi';
import { useModal } from '../../components/Modal';
import { Form, Formik } from 'formik';
import { CustomerForm } from './CustomerForm';
import { Column } from '../../models';

export const Customers = () => {
  const { handleShowLoader }: LoaderContextType = useLoader();
  const {
    dataEdit,
    initialValuesForm,
    customersData,
    setDataEdit,
    handleGetCustomers,
    handleGetBusinessName,
    handleOpenModalDelete,
    handleSubmit,
  } = useHelpers();
  const { handleOpenModal, handleCloseModal }: ModalContextType = useModal();

  useEffect(() => {
    handleShowLoader(true);
    handleGetCustomers();
    handleGetBusinessName();
    setDataEdit(null);
  }, []);

  useEffect(() => {
    if (dataEdit !== null) handleModal();
  }, [dataEdit]);

  const _getCustomerById = useApi({
    endpoint: '/clientes/id',
    method: 'get',
  });

  const columns: Column[] = [
    { id: 'calle', label: 'Calle', align: 'left' },
    { id: 'codigoCliente', label: 'código cliente', align: 'left' },
    { id: 'colonia', label: 'Colonia', align: 'left' },
    { id: 'formaPago', label: 'Forma de Pago', align: 'left' },
    { id: 'metodoPago', label: 'Método de Pago', align: 'left' },
    { id: 'numeroExterior', label: 'No. Exterior', align: 'left' },
    { id: 'numeroInterior', label: 'No. Interior', align: 'left' },
    { id: 'razonSocial', label: 'Razón Social', align: 'left' },
    { id: 'regimenFiscal', label: 'REgime Fiscal', align: 'left' },
    { id: 'rfc', label: 'RFC', align: 'left' },
    { id: 'telefono', label: 'Teléfono', align: 'left' },
    { id: 'usoCFDI', label: 'CFDI', align: 'left' },
    {
      id: 'actions',
      label: 'Acciones',
      align: 'center',
      actions: [
        {
          label: 'Editar',
          icon: <ModeEditOutlineOutlined sx={{ width: 20, height: 20 }} />,
          onClick: (rowData: PaylaodCustomers['data']) =>
            handleGetCustomer(rowData),
        },
        {
          label: 'Eliminar',
          icon: (
            <DeleteOutlineOutlined
              sx={{ width: 20, height: 20, color: 'red' }}
            />
          ),
          onClick: (rowData: PaylaodCustomers['data']) =>
            handleOpenModalDelete(rowData),
        },
      ],
    },
  ];

  const handleToggleModal = (): void => {
    handleCloseModal();
    setDataEdit(null);
  };

  const handleGetCustomer = async (
    data: PaylaodCustomers['data']
  ): Promise<boolean> => {
    try {
      const { payload, response }: Payload = await _getCustomerById({
        urlParam: data._id,
      });

      const code: Response['code'] = response.code;
      const dataResponse: PaylaodCustomers['data'] = payload.data;

      if (code === 200) {
        setDataEdit(dataResponse);
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  const handleModal = () => {
    handleOpenModal({
      fullWidth: true,
      maxWidth: 'md',
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
            {dataEdit ? 'EDITAR CLIENTE' : 'CREAR CLIENTE'}
          </Typography>
        </Box>
      ),
      body: (
        <Formik initialValues={initialValuesForm} onSubmit={handleSubmit}>
          <Form>
            <CustomerForm
              handleToggleModal={handleToggleModal}
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
        showCheckboxes={false}
        tableHead
        title="Clientes"
        columns={columns}
        data={customersData}
        customButton
        renderCustomButton={
          <Button
            variant="contained"
            color="inherit"
            sx={{ p: '10px 20px', letterSpacing: '1px' }}
            onClick={() => handleModal()}
            startIcon={<Add />}
          >
            Agregar Cliente
          </Button>
        }
      />
    </div>
  );
};
