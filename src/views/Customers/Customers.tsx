/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useLoader } from '../../components/Loader';
import { LoaderContextType, ModalContextType } from '../../models';
import { Table } from '../../components/Table';
import {
  Add,
  ModeEditOutlineOutlined,
  DeleteOutlineOutlined,
  Close,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useHelpers } from './helpers';
import { PaylaodCustomers, Payload } from './types';
import { Response } from '../../models/responseApi';
import { useApi } from '../../hooks/useApi';
import { useModal } from '../../components/Modal';
import { Form, Formik } from 'formik';
import Input from '../../components/Input/Input';

export const Customers = () => {
  // const initialValuesForm = {
  //   calle: '',
  //   codigoCliente: '',
  //   colonia: '',
  //   formaPago: '',
  //   metodoPago: '',
  //   numeroExterior: '',
  //   numeroInterior: '',
  //   razonSocial: '',
  //   regimenFiscal: '',
  //   rfc: '',
  //   telefono: '',
  //   usoCFDI: '',
  //   _id: '',
  //   __v: 0,
  // };
  const [dataEdit, setDataEdit] = useState<
    PaylaodCustomers['data'] | undefined
  >(undefined);
  const { handleShowLoader }: LoaderContextType = useLoader();
  const { customersData, handleGetCustomers, handleSubmit } = useHelpers();
  const { handleOpenModal, handleCloseModal }: ModalContextType = useModal();
  const [initialValues, setInitialValues] = useState<PaylaodCustomers['data']>({
    calle: '',
    codigoCliente: '',
    colonia: '',
    formaPago: '',
    metodoPago: '',
    numeroExterior: '',
    numeroInterior: '',
    razonSocial: '',
    regimenFiscal: '',
    rfc: '',
    telefono: '',
    usoCFDI: '',
    _id: '',
    __v: 0,
  });

  useEffect(() => {
    handleShowLoader(true);

    handleGetCustomers();
  }, []);

  useEffect(() => {
    if (dataEdit !== undefined) {
      setInitialValues({
        calle: dataEdit ? dataEdit?.calle : '',
        codigoCliente: dataEdit ? dataEdit?.codigoCliente : '',
        colonia: dataEdit ? dataEdit?.colonia : '',
        formaPago: dataEdit ? dataEdit?.colonia : '',
        metodoPago: dataEdit ? dataEdit?.metodoPago : '',
        numeroExterior: dataEdit ? dataEdit?.numeroExterior : '',
        numeroInterior: dataEdit ? dataEdit?.numeroInterior : '',
        razonSocial: dataEdit ? dataEdit?.razonSocial : '',
        regimenFiscal: dataEdit ? dataEdit?.regimenFiscal : '',
        rfc: dataEdit ? dataEdit?.rfc : '',
        telefono: dataEdit ? dataEdit?.telefono : '',
        usoCFDI: dataEdit ? dataEdit?.usoCFDI : '',
        _id: dataEdit ? dataEdit?._id : '',
        __v: dataEdit ? dataEdit?.__v : '',
      });
    }
  }, [dataEdit]);

  const _getCustomerById = useApi({
    endpoint: '/clientes/id',
    method: 'get',
  });

  const columns: any[] = [
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
          onClick: (rowData: any) => handleGetCustomer(rowData),
        },
        {
          label: 'Eliminar',
          icon: (
            <DeleteOutlineOutlined
              sx={{ width: 20, height: 20, color: 'red' }}
            />
          ),
          onClick: (rowData: PaylaodCustomers['data']) =>
            console.log('DELETE', rowData),
        },
      ],
    },
  ];

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
        <Grid sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>CREAR CLIENTE</Typography>
          <IconButton onClick={() => handleCloseModal()}>
            <Close />
          </IconButton>
        </Grid>
      ),
      body: (
        <Box sx={{ mt: 2 }}>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            // enableReinitialize
          >
            <Form>
              <Grid container>
                <Grid item>
                  <Input label="Calle" name="calle" />
                </Grid>
                <Grid item>
                  <Input label="Código Cliente" name="codigoCliente" />
                </Grid>
                <Grid item>
                  <Input label="Razón Social" name="razonSocial" />
                </Grid>
                <Grid item>
                  <Input label="RFC" name="rfc" />
                </Grid>
                <Grid item>
                  <Input label="Método de Pago" name="metodoPago" />
                </Grid>
                <Grid item>
                  <Input label="Forma de Pago" name="formaPago" />
                </Grid>
                <Grid item>
                  <Input label="Regimen Fiscal" name="regimenFiscal" />
                </Grid>
                <Grid item>
                  <Input label="CFDI" name="usoCFDI" />
                </Grid>
                <Grid item>
                  <Input label="Teléfono" name="telefono" />
                </Grid>
                <Grid item>
                  <Input label="Número Exterior" name="numeroExterior" />
                </Grid>
                <Grid item>
                  <Input label="Número Interior" name="numeroInterior" />
                </Grid>
                <Grid item>
                  <Input label="Colonia" name="colonia" />
                </Grid>
              </Grid>

              <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                <Button
                  color="inherit"
                  variant="outlined"
                  onClick={() => {
                    handleCloseModal();
                    // setInitialValues(initialValuesForm);

                    // setDataEdit(undefined);
                  }}
                >
                  Cancelar
                </Button>
                <Button variant="contained" type="submit">
                  Crear
                </Button>
              </Stack>
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
        title="Clientes"
        columns={columns}
        data={customersData}
        customButton
        renderCustomButton={
          <Button
            variant="contained"
            color="inherit"
            sx={{ p: '10px 20px', letterSpacing: '1px' }}
            onClick={() => {
              handleModal();
              // setInitialValues(initialValuesForm);
              // setDataEdit(undefined);
            }}
            startIcon={<Add />}
          >
            Agregar Cliente
          </Button>
        }
      />
    </div>
  );
};
