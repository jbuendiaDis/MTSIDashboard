/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';
import {
  FormValues,
  PayloadConfigureData,
  PayloadQuotez,
  ResponseConfigureData,
  ResponseQuotes,
} from './types';
import { Response } from '../../models';
import { format, parseISO } from 'date-fns';
import { useFormik } from 'formik';
import { useModalConfirmation } from '../../hooks/useModalConfirmation';
import * as Yup from 'yup';

interface HelpersProps {
  setOpen: (value: boolean) => void;
}

export const useHelpers = ({ setOpen }: HelpersProps) => {
  const [isQuotez, setIsQuotez] = useState<boolean>(false);
  const [isConfigureData, setIsConfigureData] = useState<boolean>(true);
  const [configureData, setConfigureData] = useState<
    PayloadConfigureData['data'] | null
  >(null);
  const [dataQuotezTable, setDataQuotezTable] = useState<PayloadQuotez['data']>(
    []
  );

  const { modalInformation, modalSuccess } = useModalConfirmation();

  const _getAllQuotes = useApi({
    endpoint: '/quotes-01/all',
    method: 'get',
  });

  const _getConfigureData = useApi({
    endpoint: '/configureData/active',
    method: 'get',
  });

  const _createConfigureData = useApi({
    endpoint: '/configureData',
    method: 'post',
  });

  useEffect(() => {
    handleGetAllQuotez();
    handleGetconfigureData();
    setIsQuotez(true);
  }, []);

  useEffect(() => {
    if (configureData !== null) setIsConfigureData(true);
  }, [configureData]);

  const handleGetAllQuotez = async (): Promise<boolean> => {
    try {
      const { payload, response }: ResponseQuotes = await _getAllQuotes();
      const code: Response['code'] = response.code;
      const dataResponse = payload.data;

      if (code === 200) {
        const formatData = dataResponse.map((item) => {
          return {
            ...item,
            fechaCreacion:
              typeof item.fechaCreacion === 'string'
                ? format(parseISO(item.fechaCreacion), 'dd/MM/yyyy')
                : format(item.fechaCreacion, 'dd/MM/yyyy'),
          };
        });

        setDataQuotezTable(formatData);
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleGetconfigureData = async (): Promise<boolean> => {
    try {
      const { payload, response }: ResponseConfigureData =
        await _getConfigureData();
      const code: Response['code'] = response.code;
      const messageResponse: Response['message'] = response.message;

      console.log('payload', payload);

      if (code == 200) {
        console.log('HAY DATA');
      } else if (code === 204) {
        const message: string = `${messageResponse} Configure las variables antes de continuar`;
        modalInformation({ message });
        setIsConfigureData(false);
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const initialValues: FormValues = {
    rendimiento: '',
    combustible: '',
    inflacion: '',
    financiamiento: '',
    otros: '',
    sucontrato: '',
  };

  const validationSchema = Yup.object().shape({
    rendimiento: Yup.number(),
    combustible: Yup.number().required('Este campo es obligatorio.'),
    inflacion: Yup.number().required('Este campo es obligatorio.'),
    financiamiento: Yup.number().required('Este campo es obligatorio.'),
    otros: Yup.number(),
    sucontrato: Yup.number(),
  });

  const formikConfig = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async (values: FormValues) => {
      try {
        console.log('VALUES', values);
        const { payload, response }: ResponseConfigureData =
          await _createConfigureData({
            body: values,
          });
        const code: Response['code'] = response.code;
        const message: Response['message'] = response.message;
        const dataResponse: PayloadConfigureData['data'] = payload.data;

        if (code === 200) {
          modalSuccess({ message });
          setConfigureData(dataResponse);
        } else {
          modalInformation({ message });
        }
        setOpen(false);
        return true;
      } catch (error) {
        return false;
      }
    },
  });

  return {
    formikConfig,
    isQuotez,
    isConfigureData,
    dataQuotezTable,
  };
};
