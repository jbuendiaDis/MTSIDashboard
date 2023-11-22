import { get } from 'lodash';
import { useApi } from '../../hooks/useApi';
import { PaylaodCustomers, Payload } from './types';
import { useLoader } from '../../components/Loader';
import { LoaderContextType, ModalContextType } from '../../models';
import { useState } from 'react';
import { Response } from '../../models/responseApi';
import { useModalConfirmation } from '../../hooks/useModalConfirmation';
import { useModal } from '../../components/Modal';

export const useHelpers = () => {
  const [dataEdit, setDataEdit] = useState<PaylaodCustomers['data'] | null>(
    null
  );
  const [customersData, setCustomersTable] = useState<
    PaylaodCustomers['data'][]
  >([]);
  const { handleCloseModal }: ModalContextType = useModal();
  const { handleShowLoader }: LoaderContextType = useLoader();
  const { modalInformation, modalSuccess, modalDelete } =
    useModalConfirmation();

  const _getCustomers = useApi({
    endpoint: '/clientes',
    method: 'get',
  });

  const _createCustomer = useApi({
    endpoint: '/clientes',
    method: 'post',
  });

  const _updateCustomer = useApi({
    endpoint: '/clientes',
    method: 'put',
  });

  const _deleteCustomer = useApi({
    endpoint: '/clientes',
    method: 'delete',
  });

  const getBusinessName = useApi({
    endpoint: '/clientes/razonSocial/dai',
    method: 'get',
  });

  const handleGetCustomers = async (): Promise<boolean> => {
    try {
      const response: Payload = await _getCustomers();
      const payload = get(response, 'payload', {});
      const dataResponse: PaylaodCustomers['data'][] = get(payload, 'data', []);
      const headerResponse: Payload['response'] = get(response, 'response');

      if (headerResponse.code === 200) {
        handleShowLoader(false);
        setCustomersTable(dataResponse);
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  const handleOpenModalDelete = (data: PaylaodCustomers['data']) => {
    const message: string = '¿Seguro que desea eliminar código cliente:';
    const dataValue = `${data?.codigoCliente}`;
    modalDelete({
      message,
      dataValue,
      callbackConfirm: () => handleDeleteCustomer(data._id),
    });
  };

  const handleDeleteCustomer = async (id: string): Promise<boolean> => {
    try {
      console.log('ID_DELETE', id);
      const { response }: Payload = await _deleteCustomer({
        urlParam: id,
      });

      const code: Response['code'] = response.code;
      const message: Response['message'] = response.message;

      if (code === 200) {
        modalSuccess({ message });
        handleGetCustomers();
      } else {
        const message = 'Ha ocurrido un error inesperado.';
        modalInformation({ message });
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  const handleGetBusinessName = async (): Promise<boolean> => {
    try {
      const response = await getBusinessName();
      console.log('RESPONSE', response);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async (values: PaylaodCustomers['data']) => {
    try {
      const newValues = {
        calle: values.calle,
        codigoCliente: values.codigoCliente,
        colonia: values.colonia,
        formaPago: values.formaPago,
        metodoPago: values.metodoPago,
        numeroExterior: values.numeroExterior,
        numeroInterior: values.numeroInterior,
        razonSocial: values.razonSocial,
        regimenFiscal: values.regimenFiscal,
        rfc: values.rfc,
        telefono: values.telefono,
        usoCFDI: values.usoCFDI,
      };

      if (dataEdit) {
        const response: Payload = await _updateCustomer({
          urlParam: values._id,
          body: newValues,
        });

        const codeUpdate: Response['code'] = get(response, 'response.code');
        const message: Response['message'] = get(response, 'response.message');

        if (codeUpdate === 200) {
          handleCloseModal();
          handleGetCustomers();
          modalSuccess({ message });
        } else {
          modalInformation({ message });
        }
      } else {
        const { response }: Payload = await _createCustomer({
          body: newValues,
        });
        const message: Response['message'] = response.message;
        const code: Response['code'] = response.code;

        if (code === 200) {
          handleCloseModal();
          handleGetCustomers();
          modalSuccess({ message });
        } else {
          modalInformation({ message });
        }
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const initialValuesForm: PaylaodCustomers['data'] = {
    calle: dataEdit ? dataEdit.calle : '',
    codigoCliente: dataEdit ? dataEdit.codigoCliente : '',
    colonia: dataEdit ? dataEdit.colonia : '',
    formaPago: dataEdit ? dataEdit.formaPago : '',
    metodoPago: dataEdit ? dataEdit.metodoPago : '',
    numeroExterior: dataEdit ? dataEdit.numeroExterior : '',
    numeroInterior: dataEdit ? dataEdit.numeroInterior : '',
    razonSocial: dataEdit ? dataEdit.razonSocial : '',
    regimenFiscal: dataEdit ? dataEdit.regimenFiscal : '',
    rfc: dataEdit ? dataEdit.rfc : '',
    telefono: dataEdit ? dataEdit.telefono : '',
    usoCFDI: dataEdit ? dataEdit.usoCFDI : '',
    _id: dataEdit ? dataEdit._id : '',
  };

  return {
    dataEdit,
    initialValuesForm,
    customersData,
    setDataEdit,
    handleGetCustomers,
    handleGetBusinessName,
    handleOpenModalDelete,
    handleSubmit,
  };
};
