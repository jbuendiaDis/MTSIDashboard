/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { useLoader } from '../../components/Loader';
import { LoaderContextType } from '../../models';
import { PayloadData, ResponseReturns } from './types';
import * as Yup from 'yup';
import { useModalConfirmation } from '../../hooks/useModalConfirmation';
import { useModal } from '../../components/Modal';

export const useHelpers = () => {
  const { handleShowLoader }: LoaderContextType = useLoader();
  const { modalSuccess, modalInformation, modalDelete } =
    useModalConfirmation();
  const { handleCloseModal } = useModal();
  const [dataEdit, setDataEdit] = useState<ResponseReturns['payload'] | null>(
    null
  );
  const [returnsData, setReturnsData] = useState<ResponseReturns['payload'][]>(
    []
  );

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
      const response: ResponseReturns['payload'][] = await _getReturns();

      if (response.length > 0) {
        handleShowLoader(false);
        setReturnsData(response);
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleOpenModalDelete = (data: PayloadData) => {
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
      const response = await _deleteReturn({
        urlParam: id,
      });

      console.log('DELTE', response);
      const message: string = 'Se ha eliminado correctamente';
      modalSuccess({ message });
      handleGetReturns();

      return true;
    } catch (error) {
      return false;
    }
  };

  const initialValues: PayloadData = {
    marca: dataEdit ? dataEdit?.marca : '',
    modelo: dataEdit ? dataEdit?.modelo : '',
    rendimiento: dataEdit ? dataEdit?.rendimiento : 0,
    _id: dataEdit ? dataEdit?._id : '',
  };

  const validationSchema = Yup.object().shape({
    marca: Yup.string().required('Este campo es obligatorios.'),
    modelo: Yup.string().required('Este campo es obligatorios.'),
    rendimiento: Yup.number()
      .min(1, 'El rendimiento debe ser mayor a 0.')
      .required('Este campo es obligatorios.'),
    _id: Yup.string(),
  });

  const handleSubmit = async (values: PayloadData): Promise<boolean> => {
    try {
      const newValues = {
        marca: values.marca,
        modelo: values.modelo,
        rendimiento: values.rendimiento,
      };

      if (dataEdit) {
        const response: PayloadData = await _updateReturn({
          urlParam: values._id,
          body: newValues,
        });

        if (response) {
          handleCloseModal();
          const message: string = `La marca ${response.marca} se ha actualizado correctamente.`;
          modalSuccess({ message });
          handleGetReturns();
        } else {
          handleCloseModal();
          const message: string = 'Ha ocurrido algo inesperado.';
          modalInformation({ message });
        }
      } else {
        const response: PayloadData = await _createReturn({
          body: newValues,
        });
        const message: string = `la marca: ${response.marca} se ha creado correctamente.`;

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
