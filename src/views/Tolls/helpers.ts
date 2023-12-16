/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { Response } from '../../models';
import { DataToll, FormValues, ResponseTolls } from './types';
import * as Yup from 'yup';
import { useModalConfirmation } from '../../hooks/useModalConfirmation';
import { useRootProvider } from '../../components/RootProvider/hooks/useRootProvider';
import { get } from 'lodash';

export const useHelpers = () => {
  const [dataEdit, setDataEdit] = useState<any | null>(null);
  const [dataTemp, setDataTemp] = useState<any | null>(null);
  const { actionsCountries, actionsState, actionsCatalogs }: any =
    useRootProvider();
  const { handleGetAllCountries, handleGetCountrie, countriesByState } =
    actionsCountries;
  const { states } = actionsState;
  const { unitTypes } = actionsCatalogs;
  const { modalDelete, modalSuccess, modalInformation } =
    useModalConfirmation();

  const requiredField: string = 'Este campo es obligatorio.';

  const _getCountriesByState = useApi({
    endpoint: '/countries/by-estado',
    method: 'get',
  });

  const _getCountrieById = useApi({
    endpoint: '/countries',
    method: 'get',
  });

  const _createCountrie = useApi({
    endpoint: '/countries',
    method: 'post',
  });

  const _delteCountrie = useApi({
    endpoint: '/countries',
    method: 'delete',
  });

  const _updateCountrie = useApi({
    endpoint: '/countries',
    method: 'put',
  });

  useEffect(() => {
    if (countriesByState.length > 0) {
      console.log('RENDER', dataTemp);
      // console.log('unitTypes', unitTypes);
      console.log('caseta', countriesByState);
      const filterState = states.find(
        (item: any) => item.codigo === dataTemp?.estado
      );
      const filterCountrie = countriesByState.filter(
        (item: any) => item.nombre === dataTemp?.nombre
      );

      console.log('filter', filterCountrie);

      const newDataEdit = {
        state: filterState,
        // nombre: filterCountrie,
        // costo: dataTemp?.costo,
        unitType: 'Automoviles',
      };

      setDataEdit(newDataEdit);

      console.log('newDataEdit', newDataEdit);
    }
  }, [countriesByState]);

  const handleOpenModalDelete = (data: DataToll): void => {
    const message: string = '¿Seguro que desea eliminar esta caseta:';
    const dataValue = `${data.nombre}`;
    modalDelete({
      message,
      dataValue,
      callbackConfirm: () => handleDeleteToll(data._id),
    });
  };

  const handleDeleteToll = async (id: string): Promise<boolean> => {
    try {
      const response: ResponseTolls = await _delteCountrie({
        urlParam: id,
      });
      const code: Response['code'] = response.response.code;
      const message: Response['message'] = response.response.message;

      if (code === 200) {
        modalSuccess({ message });
        handleGetAllCountries();
      } else {
        modalInformation({ message });
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleGetToll = async (code: number): Promise<boolean> => {
    try {
      const { payload, response }: ResponseTolls = await _getCountrieById({
        urlParam: code,
      });
      const dataResponse: DataToll = Array.isArray(payload.data)
        ? payload.data[0]
        : payload.data;
      const codeResponse: Response['code'] = response.code;

      if (codeResponse === 200) {
        handleGetCountrie(dataResponse);
        setDataTemp(dataResponse);
      }
      // const filterState: any = states
      //   .filter((item: any) => item.codigo !== null) // Filtrar elementos null
      //   .find((item: any) => item.codigo === dataResponse.estado);

      // const newData = {
      //   state: filterState,
      //   nombre: dataResponse.nombre,
      //   costo: dataResponse.costo,
      //   codigo: dataResponse.codigo,
      // };

      // if (codeResponse === 200) setDataEdit(newData);
      return true;
    } catch (error) {
      return false;
    }
  };

  const validationSchema = Yup.object().shape({
    state: Yup.object().nullable().required(requiredField),
    unitType: Yup.string().required(requiredField),
    nombre: Yup.object().nullable().required(requiredField),
    costo: Yup.number().required(requiredField),
    _id: Yup.string(),
  });

  const initialValues: FormValues = {
    unitType: dataEdit ? dataEdit?.unitType : '',
    state: dataEdit ? dataEdit?.state : undefined,
    nombre: dataEdit ? dataEdit?.nombre : undefined,
    costo: '',
  };

  console.log('values', initialValues);

  const handleSubmit = async (values: FormValues): Promise<boolean> => {
    try {
      console.log('VALUES', values);
      const newValues = {
        tipoUnidad: values.unitType,
        nombre: values.nombre?.nombre,
        costo: values.costo,
        estado: values.state?.codigo,
        codigo: values.state?.codigo,
      };

      console.log('newValues', newValues);

      // if (dataEdit) {
      // const response: ResponseTolls = await _updateCountrie({
      //   urlParam: values.codigo,
      //   body: newValues,
      // });
      // const code: Response['code'] = get(response, 'response.code');
      // const message: Response['message'] = get(
      //   response,
      //   'response.message',
      //   ''
      // );
      // if (code === 200) {
      //   modalSuccess({ message });
      //   handleGetAllCountries();
      //   setDataEdit(null);
      // } else {
      //   modalInformation({ message });
      // }
      // } else {
      // const response: ResponseTolls = await _createCountrie({
      //   body: newValues,
      // });
      // const code: Response['code'] = get(response, 'response.code');
      // const message: Response['message'] = get(
      //   response,
      //   'response.message',
      //   ''
      // );

      // if (code === 200) {
      //   modalSuccess({ message });
      //   handleGetAllCountries();
      // } else {
      //   modalInformation({ message });
      // }
      // }
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    dataEdit,
    initialValues,
    validationSchema,
    handleSubmit,
    handleOpenModalDelete,
    handleGetToll,
    setDataEdit,
  };
};
