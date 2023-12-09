/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { useLoader } from '../../components/Loader';
import { LoaderContextType, Response } from '../../models';
import { DataToll, FormValues, PayloadTolls, ResponseTolls } from './types';
import { format, parseISO } from 'date-fns';
import * as Yup from 'yup';
// import { useRootProvider } from '../../components/RootProvider/hooks/useRootProvider';
// import { formatToCurrency } from '../../utils/amountFormater';
import { useModalConfirmation } from '../../hooks/useModalConfirmation';
import { formatToCurrency } from '../../utils/amountFormater';
import { get } from 'lodash';

export const useHelpers = () => {
  const [tollsData, setTollsData] = useState<PayloadTolls['data']>([]);
  const [dataEdit, setDataEdit] = useState<any | null>(null);
  const { handleShowLoader }: LoaderContextType = useLoader();
  const { modalDelete, modalSuccess, modalInformation } =
    useModalConfirmation();
  // const { actionsState }: any = useRootProvider();
  // const { states }: any = actionsState;

  // const { actionsCustomers }: any = useRootProvider();
  // const { handleGetCustomers, customers } = actionsCustomers;
  // console.log('customers', customers);

  const requiredField: string = 'Este campo es obligatorio.';

  const _getAllCountries = useApi({
    endpoint: '/countries',
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
    handleShowLoader(true);
    handleGetCountries();
    // handleGetCustomers();
  }, []);

  const handleGetCountries = async (): Promise<boolean> => {
    try {
      const { payload, response }: ResponseTolls = await _getAllCountries();
      const code: Response['code'] = response.code;
      const dataResponse: PayloadTolls['data'] = payload.data;

      if (code === 200) {
        const dataFormat: DataToll[] = dataResponse.map((item) => {
          const costoNumber =
            typeof item.costo === 'number'
              ? item.costo
              : parseFloat(item.costo || '0');

          return {
            ...item,
            costo: item.costo
              ? formatToCurrency(costoNumber)
              : formatToCurrency(0),
            fechaCreacion:
              typeof item.fechaCreacion === 'string'
                ? format(parseISO(item.fechaCreacion), 'dd/MM/yyyy')
                : format(item.fechaCreacion, 'dd/MM/yyyy'),
          };
        });

        setTollsData(dataFormat);
        handleShowLoader(false);
      }

      return true;
    } catch (error) {
      return false;
    }
  };

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
        handleGetCountries();
      } else {
        modalInformation({ message });
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleGetToll = async (code: number, states: any): Promise<boolean> => {
    try {
      const { payload, response }: ResponseTolls = await _getCountrieById({
        urlParam: code,
      });
      const dataResponse: DataToll = Array.isArray(payload.data)
        ? payload.data[0]
        : payload.data;
      const codeResponse: Response['code'] = response.code;

      const filterState: any = states
        .filter((item: any) => item.codigo !== null) // Filtrar elementos null
        .find((item: any) => item.codigo === dataResponse.estado);

      const newData = {
        state: filterState,
        nombre: dataResponse.nombre,
        costo: dataResponse.costo,
        codigo: dataResponse.codigo,
      };

      if (codeResponse === 200) setDataEdit(newData);
      return true;
    } catch (error) {
      return false;
    }
  };

  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required(requiredField),
    costo: Yup.number().nullable().required(requiredField),
    state: Yup.object().nullable().required(requiredField),
    codigo: Yup.number().nullable(),
    _id: Yup.string(),
  });

  const initialValues: FormValues = {
    nombre: dataEdit ? dataEdit?.nombre : '',
    costo: dataEdit ? dataEdit?.costo : '',
    state: dataEdit ? dataEdit.state : undefined,
    codigo: dataEdit ? dataEdit?.codigo : '',
  };

  const handleSubmit = async (values: FormValues): Promise<boolean> => {
    try {
      const newValues = {
        nombre: values.nombre,
        codigo: values.codigo,
        costo: values.costo,
        estado: values.state ? values.state.codigo : undefined,
      };

      if (dataEdit) {
        const response: ResponseTolls = await _updateCountrie({
          urlParam: values.codigo,
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
          handleGetCountries();
        } else {
          modalInformation({ message });
        }
      } else {
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
          modalSuccess({ message });
          handleGetCountries();
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
    tollsData,
    initialValues,
    validationSchema,
    handleSubmit,
    handleOpenModalDelete,
    handleGetToll,
    setDataEdit,
  };
};
