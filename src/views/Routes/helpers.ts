/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { useLoader } from '../../components/Loader';
import { FormatDataState, LoaderContextType, Response } from '../../models';
import { DataTolls, ResponseTolls, TableDots } from './types';
import {
  formatToCurrency,
  parseCurrencyStringToNumber,
} from '../../utils/amountFormater';
import { useModalConfirmation } from '../../hooks/useModalConfirmation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { get } from 'lodash';

interface FormValues {
  tipoUnidad: string;
  localidadOrigen: number | null | FormatDataState;
  localidadDestino: number | null | FormatDataState;
  kms: null | string | number;
  state: null;
}

export const useHelpers = () => {
  const [tollsData, setTollsData] = useState<DataTolls[]>([]);
  const [dataEdit, setDataEdit] = useState<DataTolls[] | null>(null);
  const [pagoCasetas, setPagoCasetas] = useState<string>('');
  const [nombreCaseta, setNombreCaseta] = useState<string>('');
  const [costo, setCosto] = useState<number>(0);
  const [dataDotsTable, setDataDotsTable] = useState<any[]>([]);
  const { handleShowLoader }: LoaderContextType = useLoader();
  const { modalDelete, modalSuccess, modalInformation } =
    useModalConfirmation();

  const requiredField: string = 'Este campo es obligatorio.';

  const _getTolls = useApi({
    endpoint: '/peajes',
    method: 'get',
  });

  const _getTollById = useApi({
    endpoint: '/peajes',
    method: 'get',
  });

  const _createToll = useApi({
    endpoint: '/peajes',
    method: 'post',
  });

  const _deleteToll = useApi({
    endpoint: '/peajes',
    method: 'delete',
  });

  useEffect(() => {
    handleShowLoader(true);
    handleGetTolls();
  }, []);

  // useEffect(() => {
  //   if (dataDotsTable.length > 0) setErrorDots('');
  // }, [dataDotsTable]);

  const handleGetTolls = async (): Promise<boolean> => {
    try {
      const { payload, response }: ResponseTolls = await _getTolls();
      const code: Response['code'] = response.code;
      const dataResponse: DataTolls[] = payload.data;

      const formatData = dataResponse.map((item) => {
        const kilometers = `${item.kms} kms`;
        const totalCost = item.puntos.reduce((total, costTotal) => {
          return total + costTotal.costo;
        }, 0);

        return {
          ...item,
          totalKilometers: kilometers,
          costTotalPeajes: formatToCurrency(totalCost),
        };
      });

      if (code === 200) {
        handleShowLoader(false);
        setTollsData(formatData);
        // console.log('DATA', formatData);
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleGetToll = async (id: string): Promise<boolean> => {
    try {
      const { payload, response }: ResponseTolls = await _getTollById({
        urlParam: id,
      });
      const code: Response['code'] = response.code;
      const dataResponse: DataTolls[] = payload.data;

      const formatDots = get(dataResponse, 'puntos', []).map((item: any) => {
        return {
          ...item,
          costo: formatToCurrency(item.costo),
        };
      });

      if (code === 200) {
        setDataEdit(dataResponse);
        setDataDotsTable(formatDots);
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleOpenModalDelete = (data: DataTolls) => {
    const message: string = '¿Seguro que desea eliminar este dato';
    const dataValue = '';
    modalDelete({
      message,
      dataValue,
      callbackConfirm: () => handleDeleteToll(data._id),
    });
  };

  const handleDeleteToll = async (id: string): Promise<boolean> => {
    try {
      const response: ResponseTolls = await _deleteToll({
        urlParam: id,
      });
      const code: Response['code'] = response.response.code;
      const message: Response['message'] = response.response.message;

      if (code === 200) {
        modalSuccess({ message });
        handleGetTolls();
      } else {
        modalInformation({ message });
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  const handleAddDot = () => {
    const newDot: TableDots = {
      casetas: pagoCasetas,
      nombreCaseta,
      costo: formatToCurrency(costo),
      _id: dataDotsTable.length + 1,
    };

    setDataDotsTable((prevDots) => [...prevDots, newDot]);
    setPagoCasetas('');
    setNombreCaseta('');
    setCosto(0);
    // setErrorDots('');
  };

  const handleRemoveDot = (id: number) => {
    setDataDotsTable((prevDots) => {
      const updatedDots = prevDots.filter((dot) => dot._id !== id);

      return updatedDots.map((dot, index) => ({
        ...dot,
        _id: (index + 1).toString(),
      }));
    });
  };

  const initialValues: FormValues = {
    tipoUnidad: '',
    localidadOrigen: null,
    localidadDestino: null,
    kms: '',
    state: null,
  };

  const validationSchema = Yup.object().shape({
    tipoUnidad: Yup.string().required(requiredField),
    localidadOrigen: Yup.object().nullable().required(requiredField),
    localidadDestino: Yup.object().nullable().required(requiredField),
    kms: Yup.number()
      .min(1, 'El kilometraje debe ser mayor a 0.')
      .required(requiredField),
    state: Yup.object().nullable().required(requiredField),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async (values: FormValues) => {
      try {
        console.log('VALUES', values);
        const arrayDots: any[] = [];

        dataDotsTable.map((item: any) => {
          arrayDots.push({
            casetas: item.casetas,
            nombreCaseta: item.nombreCaseta,
            costo: parseCurrencyStringToNumber(item.costo),
            // _id: item._id.toString(),
          });
        });

        const newValues: any = {
          tipoUnidad: values.tipoUnidad,
          localidadOrigen: (
            values.localidadOrigen as FormatDataState
          ).codigo.toString(),
          localidadDestino: (
            values.localidadDestino as FormatDataState
          ).codigo.toString(),
          kms: values.kms,
          puntos: arrayDots,
          totalPeajes: arrayDots.reduce((total, costTotal) => {
            return total + costTotal.costo;
          }, 0),
        };

        const response = await _createToll({
          body: newValues,
        });
        handleGetTolls();

        console.log('POST', response);

        return true;
      } catch (error) {
        return false;
      }
    },
  });

  return {
    tollsData,
    formik,
    pagoCasetas,
    nombreCaseta,
    costo,
    dataDotsTable,
    dataEdit,
    // errorDots,
    // setErrorDots,
    setPagoCasetas,
    setNombreCaseta,
    setCosto,
    handleOpenModalDelete,
    handleGetToll,
    handleAddDot,
    handleRemoveDot,
    setDataDotsTable,
  };
};
