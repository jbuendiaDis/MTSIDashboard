/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { Response } from '../../models';
import { DataToll, FormValues, ResponseTolls } from './types';
import * as Yup from 'yup';
import { useModalConfirmation } from '../../hooks/useModalConfirmation';
import { useRootProvider } from '../../components/RootProvider/hooks/useRootProvider';
import { get } from 'lodash';

interface PropsHelpers {
  valueState: any;
  setValueState: (value: null) => void;
}

export const useHelpers = ({ valueState, setValueState }: PropsHelpers) => {
  const [dataEdit, setDataEdit] = useState<FormValues | null>(null);
  const [dataTemp, setDataTemp] = useState<any | null>(null);
  const { actionsCountries, actionsState }: any = useRootProvider();
  const {
    handleGetAllCountries,
    handleGetCountrie,
    countriesByStateUnitType,
    handleGetCountriesByStateUnitType,
    handleResetCountriesByState,
  } = actionsCountries;
  const { states } = actionsState;
  const { modalDelete, modalSuccess, modalInformation } =
    useModalConfirmation();

  const requiredField: string = 'Este campo es obligatorio.';

  const _getCountrieById = useApi({
    endpoint: '/countries/by-id',
    method: 'get',
  });

  const _createCountrie = useApi({
    endpoint: '/countrie',
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
    if (dataTemp !== null && countriesByStateUnitType?.length > 0) {
      const filterState = states.find(
        (item: any) => item.codigo === dataTemp.estado
      );

      const filterCountrie = countriesByStateUnitType.find(
        (item: any) => item.codigo === dataTemp.codigo
      );

      const newDataEdit: FormValues = {
        state: filterState,
        nombre: filterCountrie,
        costo: dataTemp.costo,
        unitType: dataTemp.tipoUnidad,
        codigo: dataTemp.codigo,
        _id: dataTemp._id,
      };

      setDataEdit(newDataEdit);
      setDataTemp(null);
    }
  }, [dataTemp, countriesByStateUnitType]);

  const handleOpenModalDelete = (data: DataToll): void => {
    const message: string = '¿Seguro que desea eliminar este peaje:';
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

  const handleGetToll = async (data: DataToll): Promise<boolean> => {
    try {
      const { payload, response }: ResponseTolls = await _getCountrieById({
        urlParam: data._id,
      });
      const dataResponse: DataToll = Array.isArray(payload.data)
        ? payload.data[0]
        : payload.data;
      const codeResponse: Response['code'] = response.code;

      if (codeResponse === 200) {
        handleGetCountriesByStateUnitType(
          dataResponse.estado,
          dataResponse.tipoUnidad
        );
        setDataTemp(dataResponse);
      }

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
    state: dataEdit ? dataEdit?.state : null,
    nombre: dataEdit ? dataEdit?.nombre : null,
    costo: dataEdit ? dataEdit?.costo : '',
    codigo: dataEdit ? dataEdit?.codigo : 0,
    _id: dataEdit ? dataEdit?._id : '',
  };

  const handleSubmit = async (values: FormValues): Promise<boolean> => {
    try {
      const newValues = {
        tipoUnidad: values.unitType,
        nombre: values.nombre?.nombre,
        costo: values.costo,
        estado: values.state?.codigo,
      };

      if (dataEdit) {
        const response: ResponseTolls = await _updateCountrie({
          urlParam: values._id,
          body: newValues,
        });
        const code: Response['code'] = get(response, 'response.code');
        const message: Response['message'] = get(
          response,
          'response.message',
          ''
        );
        if (code === 200) {
          modalSuccess({ message });
          handleGetCountrie(valueState.codigo);
        } else {
          modalInformation({ message });
        }
      } else {
        setValueState(null);
        const response: ResponseTolls = await _createCountrie({
          body: newValues,
        });

        const code: Response['code'] = get(response, 'response.code');
        const message: Response['message'] = get(
          response,
          'response.message',
          ''
        );

        if (code === 200) {
          handleResetCountriesByState();
          console.log('res', response);
          handleGetCountrie(newValues.estado);
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

  return {
    dataEdit,
    initialValues,
    validationSchema,
    handleSubmit,
    handleOpenModalDelete,
    handleGetToll,
    setDataEdit,
    setDataTemp,
  };
};
