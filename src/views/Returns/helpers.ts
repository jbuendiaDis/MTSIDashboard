import { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { useLoader } from '../../components/Loader';
import { LoaderContextType, Response } from '../../models';
import { DataReturns, PayloadDataReturns, ResponseReturns } from './types';
import * as Yup from 'yup';
import { useModalConfirmation } from '../../hooks/useModalConfirmation';
import { useModal } from '../../components/Modal';
import { get } from 'lodash';

export const useHelpers = () => {
  const { handleShowLoader }: LoaderContextType = useLoader();
  const { modalSuccess, modalInformation, modalDelete } =
    useModalConfirmation();
  const { handleCloseModal } = useModal();
  const [dataEdit, setDataEdit] = useState<any | null>(null);
  const [returnsData, setReturnsData] = useState<PayloadDataReturns['data']>(
    []
  );
  const requiredFile: string = 'Campo obligatorio.';

  const _getReturns = useApi({
    endpoint: '/rendimientos',
    method: 'get',
  });

  const _updateReturn = useApi({
    endpoint: '/rendimientos',
    method: 'put',
  });

  const _createReturn = useApi({
    endpoint: '/rendimientos',
    method: 'post',
  });

  const _deleteReturn = useApi({
    endpoint: '/rendimientos',
    method: 'delete',
  });

  useEffect(() => {
    handleShowLoader(true);
    handleGetReturns();
  }, []);

  const handleGetReturns = async (): Promise<boolean> => {
    try {
      const { payload, response }: ResponseReturns = await _getReturns();
      const code: Response['code'] = response.code;
      const dataResponse: PayloadDataReturns['data'] = payload.data;

      if (code === 200) {
        handleShowLoader(false);
        setReturnsData(dataResponse);
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleOpenModalDelete = (data: any) => {
    const message: string = '¿Seguro que desea eliminar marca:';
    const dataValue = `${data?.marca}`;
    modalDelete({
      message,
      dataValue,
      callbackConfirm: () => handleDeleteReturns(data._id),
    });
  };

  const handleDeleteReturns = async (id: string): Promise<boolean> => {
    try {
      const response: ResponseReturns = await _deleteReturn({
        urlParam: id,
      });
      const code: Response['code'] = get(response, 'response.code');
      const message: Response['message'] = get(
        response,
        'response.message',
        ''
      );

      if (code === 200) {
        modalSuccess({ message });
        handleGetReturns();
      } else {
        modalInformation({ message });
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  const initialValues: DataReturns = {
    vehicleCondition: dataEdit ? dataEdit?.condicionVeiculoId : '',
    bodyStyle: dataEdit ? dataEdit?.estiloCarroceriaId : '',
    marca: dataEdit ? dataEdit?.marca : '',
    modelo: dataEdit ? dataEdit?.modelo : '',
    rendimiento: dataEdit ? dataEdit?.rendimiento : '',
    _id: dataEdit ? dataEdit?._id : '',
  };

  const validationSchema = Yup.object().shape({
    vehicleCondition: Yup.string().required(requiredFile),
    bodyStyle: Yup.string().required(requiredFile),
    marca: Yup.string().required(requiredFile),
    modelo: Yup.string().required(requiredFile),
    rendimiento: Yup.number()
      .min(1, 'El rendimiento debe ser mayor a 0.')
      .required(requiredFile),
    _id: Yup.string(),
  });

  const handleSubmit = async (values: DataReturns): Promise<boolean> => {
    try {
      const newValues = {
        condicionVeiculoId: values.vehicleCondition,
        estiloCarroceriaId: values.bodyStyle,
        marca: values.marca,
        modelo: values.modelo,
        rendimiento: values.rendimiento,
      };

      if (dataEdit) {
        const { response }: ResponseReturns = await _updateReturn({
          urlParam: values._id,
          body: newValues,
        });
        const code: Response['code'] = response.code;
        const message: Response['message'] = response.message;

        if (code) {
          handleCloseModal();
          modalSuccess({ message });
          handleGetReturns();
          setDataEdit(null);
        } else {
          handleCloseModal();
          const message: string = 'Ha ocurrido algo inesperado.';
          modalInformation({ message });
        }
      } else {
        const { response }: ResponseReturns = await _createReturn({
          body: newValues,
        });
        const message: Response['message'] = response.message;

        if (response) {
          handleCloseModal();
          handleGetReturns();
          modalSuccess({ message });
        } else {
          handleCloseModal();
          const message: string = 'Ha ocurrido algo inesperado.';
          modalInformation({ message });
        }
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    initialValues,
    dataEdit,
    returnsData,
    validationSchema,
    handleOpenModalDelete,
    setDataEdit,
    handleSubmit,
  };
};
