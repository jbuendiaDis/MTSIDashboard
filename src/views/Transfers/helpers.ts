import { useState } from 'react';
import { useLoader } from '../../components/Loader';
import { useApi } from '../../hooks/useApi';
import { LoaderContextType, Response } from '../../models';
import { ResponseTransfer, PayloadData, Transfer, Options } from './types';
import * as Yup from 'yup';
import { get } from 'lodash';
import { useModalConfirmation } from '../../hooks/useModalConfirmation';
import { useModal } from '../../components/Modal';

export const useHelpers = () => {
  const [dataEdit, setDataEdit] = useState<any | null>(null);
  const [transfersData, setTransfersData] = useState<PayloadData['data']>([]);
  const { handleShowLoader }: LoaderContextType = useLoader();
  const { handleCloseModal } = useModal();
  const { modalInformation, modalSuccess, modalDelete } =
    useModalConfirmation();

  const _getTransfers = useApi({
    endpoint: '/traslados',
    method: 'get',
  });

  const _createTransfer = useApi({
    endpoint: '/traslados',
    method: 'post',
  });

  const _getTransferById = useApi({
    endpoint: '/traslados',
    method: 'get',
  });

  const _updateTransferById = useApi({
    endpoint: '/traslados',
    method: 'put',
  });

  const _delteTransfer = useApi({
    endpoint: '/traslados',
    method: 'delete',
  });

  const handleGetTransfers = async (): Promise<boolean> => {
    try {
      const { payload, response }: ResponseTransfer = await _getTransfers();
      const dataResponse: PayloadData['data'] = payload.data;
      const code: Response['code'] = response.code;

      if (code === 200) {
        handleShowLoader(false);
        setTransfersData(dataResponse);
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  const handleGetTrasnfer = async (id: string): Promise<boolean> => {
    try {
      const response = await _getTransferById({
        urlParam: id,
      });

      const code = get(response, 'response.code');
      const dataResponse = get(response, 'payload.data', []);

      if (code === 200) {
        setDataEdit(dataResponse);
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  const handleOpenModalDelete = (data: Transfer) => {
    const message: string = '¿Seguro que desea eliminar concepto:';
    const dataValue = `${data?.concepto}`;
    modalDelete({
      message,
      dataValue,
      callbackConfirm: () => handleDeleteTransfer(data._id),
    });
  };

  const handleDeleteTransfer = async (id: string): Promise<boolean> => {
    try {
      const response = await _delteTransfer({
        urlParam: id,
      });

      if (response === null || response !== undefined) {
        const message = 'Se ha eliminado correctamente';
        modalSuccess({ message });
        handleGetTransfers();
      } else {
        handleCloseModal();
        const message = 'Ha ocurrido un error inesperado';
        modalInformation({ message });
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  const validationSchema = Yup.object().shape({
    tipoTraslado: Yup.string().required('Este campo es obligatorio.'),
    concepto: Yup.string().required('Este campo es obligatorio.'),
    sueldo: Yup.number()
      .min(1, 'El sueldo debe ser mayor a 0.')
      .required('Este campo es obligatorio.'),
    _id: Yup.string(),
  });

  const initialValues: Transfer = {
    tipoTraslado: dataEdit ? dataEdit?.tipoTraslado : '',
    concepto: dataEdit ? dataEdit?.concepto : '',
    sueldo: dataEdit ? dataEdit?.sueldo : 0,
    _id: dataEdit ? dataEdit?._id : '',
  };

  const handleSubmit = async (values: Transfer): Promise<boolean> => {
    try {
      const newValues = {
        tipoTraslado: values.tipoTraslado,
        concepto: values.concepto,
        sueldo: values.sueldo,
      };

      if (dataEdit) {
        const responseUpdate = await _updateTransferById({
          urlParam: values._id,
          body: newValues,
        });

        if (responseUpdate !== null || responseUpdate !== undefined) {
          const message = 'Actualización realizada';
          modalSuccess({ message });
          handleGetTransfers();
        } else {
          const message = 'Ha ocurrido algo inesperado.';
          modalInformation({ message });
        }
      } else {
        const { response }: ResponseTransfer = await _createTransfer({
          body: newValues,
        });
        const code: Response['code'] = response.code;
        const message: Response['message'] = response.message;

        if (code === 200) {
          modalSuccess({ message });
          handleGetTransfers();
        } else modalInformation({ message });
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  const optionsTraslados: Options[] = [
    {
      label: 'TCC-TA',
      value: 'TCC-TA',
    },
    {
      label: 'TCC53',
      value: 'TCC53',
    },
    {
      label: 'TM2M',
      value: 'TM2M',
    },
    {
      label: 'TIE-USA',
      value: 'TIE-USA',
    },
  ];

  return {
    dataEdit,
    transfersData,
    validationSchema,
    initialValues,
    optionsTraslados,
    setDataEdit,
    handleOpenModalDelete,
    handleGetTransfers,
    handleGetTrasnfer,
    handleSubmit,
  };
};
