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
  const [customersData, setCustomersTable] = useState<
    PaylaodCustomers['data'][]
  >([]);
  const { handleCloseModal }: ModalContextType = useModal();
  const { handleShowLoader }: LoaderContextType = useLoader();
  const { modalInformation, modalSuccess } = useModalConfirmation();

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

  const handleSubmit = async (values: PaylaodCustomers['data']) => {
    try {
      console.log('VALUES', values);

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

      console.log('NEW', newValues);

      const { response }: Payload = await _createCustomer({
        body: newValues,
      });
      const message: Response['message'] = response.message;
      const code: Response['code'] = response.code;

      if (code === 200) {
        console.log('RESPONSE', response);
        handleCloseModal();
        modalSuccess({ message });
      } else {
        modalInformation({ message });
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    customersData,
    handleGetCustomers,
    handleSubmit,
  };
};
