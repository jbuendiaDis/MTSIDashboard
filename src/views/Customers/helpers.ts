/* eslint-disable react-hooks/exhaustive-deps */
import { get } from 'lodash';
import { useApi } from '../../hooks/useApi';
import {
  DataCatalogs,
  PaylaodCustomers,
  Payload,
  PayloadCatalogs,
} from './types';
import { ModalContextType } from '../../models';
import { useEffect, useState } from 'react';
import { Response } from '../../models/responseApi';
import { useModalConfirmation } from '../../hooks/useModalConfirmation';
import { useModal } from '../../components/Modal';
import * as Yup from 'yup';
import { useRootProvider } from '../../components/RootProvider/hooks/useRootProvider';

export const useHelpers = () => {
  const [dataEdit, setDataEdit] = useState<PaylaodCustomers['data'] | null>(
    null
  );
  const [dataCfdi, setDataCfdi] = useState<DataCatalogs['data']>([]);
  const [dataRegimenFiscal, setdataRegimenFiscal] = useState<
    DataCatalogs['data']
  >([]);
  const { handleCloseModal }: ModalContextType = useModal();
  const { modalInformation, modalSuccess, modalDelete } =
    useModalConfirmation();
  const { actionsCustomers }: any = useRootProvider();
  const { customers, handleGetCustomers } = actionsCustomers;
  const requiredField: string = 'Este campo es obligatorio.';

  const _getCatalogsCfdi = useApi({
    endpoint: '/catalogs/children/6577fa0ba3b49e34400ca6b8',
    method: 'get',
  });

  const _getCatalogsRegimenFiscal = useApi({
    endpoint: '/catalogs/children/6577f9f5a3b49e34400ca6b6',
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

  useEffect(() => {
    handleGetCatalogs();
    handleGetCatalogsRegimenFiscal();
    handleGetCustomers();
  }, []);

  const handleGetCatalogs = async (): Promise<boolean> => {
    try {
      const { payload, response }: PayloadCatalogs = await _getCatalogsCfdi();
      const code: Response['code'] = response.code;

      const dataResponse: DataCatalogs['data'] = payload.data;

      if (code === 200) {
        setDataCfdi(dataResponse);
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleGetCatalogsRegimenFiscal = async (): Promise<boolean> => {
    try {
      const { payload, response }: PayloadCatalogs =
        await _getCatalogsRegimenFiscal();
      const code: Response['code'] = response.code;
      const dataResponse: DataCatalogs['data'] = payload.data;

      if (code === 200) {
        setdataRegimenFiscal(dataResponse);
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  const handleOpenModalDelete = (data: PaylaodCustomers['data']) => {
    const message: string = '¿Seguro que desea eliminar código cliente:';
    const dataValue = `${data?.razonSocial}`;
    modalDelete({
      message,
      dataValue,
      callbackConfirm: () => handleDeleteCustomer(data._id),
    });
  };

  const handleDeleteCustomer = async (id: string): Promise<boolean> => {
    try {
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

  const handleSubmit = async (values: PaylaodCustomers['data']) => {
    try {
      const newValues = {
        estadoId: values.state?.codigo,
        calle: values.calle,
        colonia: values.colonia,
        formaPago: values.formaPago,
        metodoPago: values.metodoPago,
        numeroExterior: values.numeroExterior,
        numeroInterior: values.numeroInterior,
        razonSocial: values.razonSocial,
        regimenFiscal: values.regimenFiscal.descripcion,
        rfc: values.rfc,
        telefono: values.telefono,
        usoCFDI: values.usoCFDI.descripcion,
        codigoCliente: values.codigoCliente,
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
          setDataEdit(null);
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

  const validationSchema = Yup.object().shape({
    codigoCliente: Yup.string().required(requiredField),
    state: Yup.object().nullable().required(requiredField),
    calle: Yup.string().required(requiredField),
    numeroExterior: Yup.string().required(requiredField),
    telefono: Yup.string().required(requiredField),
    colonia: Yup.string().required(requiredField),
    regimenFiscal: Yup.object().nullable().required(requiredField),
    usoCFDI: Yup.object().nullable().required(requiredField),
    rfc: Yup.string().required(requiredField),
    razonSocial: Yup.string().required(requiredField),
    formaPago: Yup.string().required(requiredField),
    metodoPago: Yup.string().required(requiredField),
  });

  const initialValuesForm: PaylaodCustomers['data'] = {
    codigoCliente: dataEdit ? dataEdit.codigoCliente : '',
    state: dataEdit ? dataEdit.state : null,
    calle: dataEdit ? dataEdit.calle : '',
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
    dataCfdi,
    dataRegimenFiscal,
    validationSchema,
    customers,
    setDataEdit,
    handleOpenModalDelete,
    handleSubmit,
  };
};
