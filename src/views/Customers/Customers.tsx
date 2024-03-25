/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useLoader } from '../../components/Loader';
import { LoaderContextType, ModalContextType } from '../../models';
import { Table } from '../../components/Table';
import {
  Add,
  DeleteOutlineOutlined,
  ModeEditOutlineOutlined,
} from '@mui/icons-material';
import { Button } from '@mui/material';
import { useHelpers } from './helpers';
import { PaylaodCustomers, Payload } from './types';
import { Response } from '../../models/responseApi';
import { useApi } from '../../hooks/useApi';
import { useModal } from '../../components/Modal';
import { Form, Formik } from 'formik';
import { CustomerForm } from './CustomerForm';
import { Column } from '../../models';
import { HeaderTitleModal } from '../../components/Modal/HeaderTitleModal';
import { useRootProvider } from '../../components/RootProvider/hooks/useRootProvider';

export const Customers = () => {
  const { handleShowLoader }: LoaderContextType = useLoader();
  const { handleOpenModal, handleCloseModal }: ModalContextType = useModal();
  const { actionsState }: any = useRootProvider();
  const { states, handleGetStates } = actionsState;

  const {
    dataEdit,
    initialValuesForm,
    dataCfdi,
    dataRegimenFiscal,
    validationSchema,
    customers,
    setDataEdit,
    handleOpenModalDelete,
    handleSubmit,
  } = useHelpers();

  useEffect(() => {
    handleShowLoader(true);
    setDataEdit(null);
    handleGetStates();
  }, []);

  useEffect(() => {
    if (dataEdit !== null) handleModal();
  }, [dataEdit]);

  const _getCustomerById = useApi({
    endpoint: '/clientes/id',
    method: 'get',
  });

  const columns: Column[] = [
    { id: 'codigoCliente', label: 'Número cliente', align: 'left' },
    { id: 'razonSocial', label: 'Razón social', align: 'left' },
    { id: 'rfc', label: 'RFC', align: 'left' },
    { id: 'calle', label: 'Calle', align: 'left' },
    { id: 'colonia', label: 'Colonia', align: 'left' },
    { id: 'numeroExterior', label: 'No. exterior', align: 'left' },
    { id: 'numeroInterior', label: 'No. interior', align: 'left' },
    { id: 'telefono', label: 'Teléfono', align: 'left' },
    { id: 'formaPago', label: 'Forma de pago', align: 'left' },
    { id: 'metodoPago', label: 'Método de pago', align: 'left' },
    { id: 'regimenFiscal', label: 'Regimen fiscal', align: 'left' },
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

      const filterCfdi = dataCfdi.find(
        (item) => item.descripcion === dataResponse.usoCFDI
      );

      const filterRegimenFiscal = dataRegimenFiscal.find(
        (item) => item.descripcion === dataResponse.regimenFiscal
      );

      const filterState = states.find(
        (item: any) => item.codigo === dataResponse.estadoId
      );

      const newValuesEdit = {
        ...dataResponse,
        regimenFiscal: filterRegimenFiscal,
        usoCFDI: filterCfdi,
        state: filterState,
      };

      if (code === 200) {
        setDataEdit(newValuesEdit);
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
        <HeaderTitleModal
          handleToggleModal={handleToggleModal}
          title={dataEdit ? 'EDITAR CLIENTE' : 'CREAR CLIENTE'}
        />
      ),
      body: (
        <Formik
          initialValues={initialValuesForm}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <CustomerForm
              handleToggleModal={handleToggleModal}
              dataEdit={dataEdit}
              states={states}
              dataCfdi={dataCfdi}
              dataRegimenFiscal={dataRegimenFiscal}
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
        data={customers}
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
