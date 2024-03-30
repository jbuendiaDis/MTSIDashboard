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
import { useFormik } from 'formik';
import { useModalConfirmation } from '../../hooks/useModalConfirmation';
import * as Yup from 'yup';
import { get } from 'lodash';
import { useLocation } from 'react-router-dom';

interface HelpersProps {
  setOpen: (value: boolean) => void;
}

export const useHelpers = ({ setOpen }: HelpersProps) => {
  const location = useLocation();
  const { pathname } = location;
  const [configureData, setConfigureData] = useState<
    PayloadConfigureData['data'] | null
  >(null);
  const [dataQuotezTable, setDataQuotezTable] = useState<PayloadQuotez['data']>(
    []
  );
  const { modalInformation, modalSuccess } = useModalConfirmation();

  const _getAllQuotes = useApi({
    endpoint: '/quotes-01/byclienteId',
    method: 'get',
  });

  const _getHistorialQuotes = useApi({
    endpoint: '/v2/cotizacionhistorial/byclienteId',
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

  const _getConfigDataById = useApi({
    endpoint: '/configureData',
    method: 'get',
  });

  const _updateConfigureData = useApi({
    endpoint: '/configureData',
    method: 'put',
  });

  useEffect(() => {
    if (pathname === '/quotes') handleGetconfigureData();
    setDataQuotezTable([]);
  }, [pathname]);

  const handleGetQuotezByClient = async (id: string): Promise<boolean> => {
    try {
      const { payload, response }: ResponseQuotes = await _getAllQuotes({
        urlParam: id,
      });
      const code: Response['code'] = response.code;
      const dataResponse = payload.data;

      if (code === 200) setDataQuotezTable(dataResponse);
      else setDataQuotezTable([]);

      return true;
    } catch (error) {
      return false;
    }
  };

  const handleGetHistorialQuotezByClient = async (
    id: string
  ): Promise<boolean> => {
    try {
      const { payload, response }: ResponseQuotes = await _getHistorialQuotes({
        urlParam: id,
      });
      const code: Response['code'] = response.code;
      const message: Response['message'] = response.message;
      const dataResponse = payload.data;

      if (code === 200) {
        setDataQuotezTable(dataResponse);
      } else {
        modalInformation({ message });
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

      if (code == 200) {
        setConfigureData(payload.data);
      } else if (code === 204) {
        const message: string = `${messageResponse} Configure las variables antes de continuar`;
        modalInformation({ message });
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleGetConfigDataById = async (id: string): Promise<boolean> => {
    try {
      const { payload, response }: ResponseConfigureData =
        await _getConfigDataById({ urlParam: id });
      const code: Response['code'] = response.code;
      const dataResponse = payload.data;

      if (code === 200) {
        formikConfig.setValues({
          // rendimiento: dataResponse ? dataResponse.rendimiento : '',
          combustible: dataResponse ? dataResponse.combustible : '',
          inflacion: dataResponse ? dataResponse.inflacion : '',
          financiamiento: dataResponse ? dataResponse.financiamiento : '',
          // otros: dataResponse ? dataResponse.otros : '',
          // sucontrato: dataResponse ? dataResponse.sucontrato : '',
          _id: dataResponse ? dataResponse._id : '',
        });
        setOpen(true);
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const initialValues: FormValues = {
    // rendimiento: '',
    combustible: '',
    inflacion: '',
    financiamiento: '',
    // otros: '',
    // sucontrato: '',
    _id: '',
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
        const newValues = {
          // rendimiento: values.rendimiento === '' ? 0 : values.rendimiento,
          combustible: values.combustible,
          inflacion: values.inflacion,
          financiamiento: values.financiamiento,
          // otros: values.otros === '' ? 0 : values.otros,
          // sucontrato: values.sucontrato === '' ? 0 : values.sucontrato,
        };

        if (configureData) {
          const response = await _updateConfigureData({
            urlParam: values._id,
            body: newValues,
          });
          const code = get(response, 'response.code');
          const message = get(response, 'response.message', '');

          if (code === 200) {
            modalSuccess({ message });
            setOpen(false);
          } else {
            modalInformation({ message });
          }
        } else {
          const { payload, response }: ResponseConfigureData =
            await _createConfigureData({
              body: newValues,
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
        }
      } catch (error) {
        return false;
      }
    },
  });

  return {
    formikConfig,
    dataQuotezTable,
    configureData,
    setDataQuotezTable,
    handleGetConfigDataById,
    handleGetQuotezByClient,
    handleGetHistorialQuotezByClient,
  };
};
