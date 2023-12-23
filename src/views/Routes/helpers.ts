/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { useLoader } from '../../components/Loader';
import { FormatDataState, LoaderContextType, Response } from '../../models';
import { DataTolls, ResponseTolls, ResponseUnidades, TableDots } from './types';
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
  stateOrigen: null | FormatDataState;
  stateDestino: null | FormatDataState;

  pagoCasetas: string;
  stateCaseta: null;
  nombreCaseta: null;
}

interface HelpersProps {
  setOpen: (value: boolean) => void;
}

export const useHelpers = ({ setOpen }: HelpersProps) => {
  const [tollsData, setTollsData] = useState<DataTolls[]>([]);
  const [dataEdit, setDataEdit] = useState<DataTolls[] | null>(null);
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
      casetas: formik.values.pagoCasetas,
      nombreCaseta: get(formik.values, 'nombreCaseta.nombre', ''),
      costo: formatToCurrency(get(formik.values, 'nombreCaseta.costo', 0)),
      _id: dataDotsTable.length + 1,
    };
    setDataDotsTable((prevDots) => [...prevDots, newDot]);

    formik.setValues({
      ...formik.values,
      pagoCasetas: '',
      stateCaseta: null,
      nombreCaseta: null,
    });
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
    stateOrigen: null,
    stateDestino: null,

    pagoCasetas: '',
    stateCaseta: null,
    nombreCaseta: null,
  };

  const validationSchema = Yup.object().shape({
    tipoUnidad: Yup.string().required(requiredField),
    localidadOrigen: Yup.object().nullable().required(requiredField),
    localidadDestino: Yup.object().nullable().required(requiredField),
    kms: Yup.number()
      .min(1, 'El kilometraje debe ser mayor a 0.')
      .required(requiredField),
    stateOrigen: Yup.object().nullable().required(requiredField),
    stateDestino: Yup.object().nullable().required(requiredField),

    pagoCasetas: Yup.string(),
    stateCaseta: Yup.object().nullable(),
    nombreCaseta: Yup.object().nullable(),
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

        console.log('array', arrayDots);

        const newValues: any = {
          estadoOrigen: values.stateOrigen!.codigo,
          estadoDestino: values.stateDestino!.codigo,
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

        console.log('newValues', newValues);

        const response: ResponseUnidades = await _createToll({
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
          handleGetTolls();
          formik.resetForm();
          setOpen(false);
        } else {
          modalInformation({ message });
        }

        return true;
      } catch (error) {
        return false;
      }
    },
  });

  const options: any = [
    {
      label: 'VIAPASS',
      value: 'VIAPASS',
    },
    {
      label: 'EFEC',
      value: 'EFEC',
    },
  ];

  return {
    tollsData,
    formik,
    dataDotsTable,
    dataEdit,
    options,
    handleOpenModalDelete,
    handleGetToll,
    handleAddDot,
    handleRemoveDot,
    setDataDotsTable,
  };
};
