import { useEffect, useState } from 'react';
import { useLoader } from '../../components/Loader';
import { useApi } from '../../hooks/useApi';
import { LoaderContextType, Response } from '../../models';
import {
  DataTollExpenses,
  // DataTollExpenses,
  FormValues,
  PayloadTollExpenses,
  ResponseTollExpenses,
  TollExpensesData,
} from './types';
import { formatToCurrency } from '../../utils/amountFormater';
import { useModalConfirmation } from '../../hooks/useModalConfirmation';
import { useAuth } from '../../components/Auth';
import * as Yup from 'yup';
import { useRootProvider } from '../../components/RootProvider/hooks/useRootProvider';
import { get } from 'lodash';

export const useHelpers = () => {
  const { user } = useAuth();
  const { handleShowLoader }: LoaderContextType = useLoader();
  const { modalDelete, modalInformation, modalSuccess } =
    useModalConfirmation();
  const { actionsRoutes }: any = useRootProvider();
  const { handleGetTolls, routes } = actionsRoutes;
  const [billsDataTable, setBillsDataTable] = useState<any[]>([]);
  const [dataEdit, setDataEdit] = useState<any | null>(null);
  const [dataTemp, setDataTemp] = useState<DataTollExpenses | null>(null);
  const positiveNumber: string = 'Solo se permiten cantidades positivas.';

  const _getAllTollExpenses = useApi({
    endpoint: '/gastosPeajes',
    method: 'get',
  });

  const _createBill = useApi({
    endpoint: '/gastos',
    method: 'post',
  });

  const _deleteBill = useApi({
    endpoint: '/gastos',
    method: 'delete',
  });

  const _getBillByid = useApi({
    endpoint: '/gastos',
    method: 'get',
  });

  const _updateBill = useApi({
    endpoint: '/gastos',
    method: 'put',
  });

  useEffect(() => {
    if (dataTemp !== null && routes.length > 0) {
      const filterRoute = routes.find(
        (item: any) => item._id === dataTemp.rutaId
      );

      const newDataEdit: FormValues = {
        comidas: dataTemp.comidas,
        extra: dataTemp.extra,
        ferri: 0,
        phytoSanitary: dataTemp.fitosanitarias,
        hoteles: dataTemp.hoteles,
        stayPayment: 0,
        pasajeDestino: dataTemp.pasajeDestino,
        pasajeOrigen: dataTemp.pasajeOrigen,
        portRelease: 0, //Liberacion de puerto
        routes: filterRoute,
        transferInsurance: 0, //SEguro de traslado
        talachas: dataTemp.talachas,
        taxi: dataTemp.taxi,
        udsUsa: dataTemp.udsUsa,
        urea: dataTemp.urea,
        flight: dataTemp.vuelo,
      };

      setDataEdit(newDataEdit);
    }
  }, [dataTemp, routes]);

  const handleGetAllBills = async (): Promise<boolean> => {
    try {
      const { payload, response }: ResponseTollExpenses =
        await _getAllTollExpenses();
      const code: Response['code'] = response.code;
      const dataResponse: PayloadTollExpenses['data'] = payload.data;

      if (code === 200) {
        const formaterData = dataResponse.map((item) => {
          const foods = item.comidas
            ? formatToCurrency(item.comidas)
            : formatToCurrency(0);
          const hotels = item.hoteles
            ? formatToCurrency(item.hoteles)
            : formatToCurrency(0);
          const taxi = item.taxi
            ? formatToCurrency(item.taxi)
            : formatToCurrency(0);
          const flight = item.vuelo
            ? formatToCurrency(item.vuelo)
            : formatToCurrency(0);
          const udsUsa = item.udsUsa
            ? formatToCurrency(item.udsUsa)
            : formatToCurrency(0);
          const urea = item.urea
            ? formatToCurrency(item.urea)
            : formatToCurrency(0);
          const talachas = item.talachas
            ? formatToCurrency(item.talachas)
            : formatToCurrency(0);
          const extra = item.extra
            ? formatToCurrency(item.extra)
            : formatToCurrency(0);
          const phytoSanitary = item.fitosanitarias
            ? formatToCurrency(item.fitosanitarias)
            : formatToCurrency(0);
          const originPassage = item.pasajeOrigen
            ? formatToCurrency(item.pasajeOrigen)
            : formatToCurrency(0);
          const destinyPassage = item.pasajeDestino
            ? formatToCurrency(item.pasajeDestino)
            : formatToCurrency(0);
          const kilometers = `${item.kms} kms`;
          const totalPeajes = formatToCurrency(
            item.peajes.reduce((total, costTotal) => {
              return total + costTotal.costo;
            }, 0)
          );
          return {
            ...item,
            comidas: foods,
            hoteles: hotels,
            taxi: taxi,
            vuelo: flight,
            fitosanitarias: phytoSanitary,
            udsUsa: udsUsa,
            urea: urea,
            talachas: talachas,
            extra: extra,
            pasajeOrigen: originPassage,
            pasajeDestino: destinyPassage,
            kms: kilometers,
            totalPeajes: totalPeajes,
          };
        });

        setBillsDataTable(formaterData);
        handleShowLoader(false);
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  const handleGetBill = async (id: string): Promise<boolean> => {
    try {
      const { payload, response }: ResponseTollExpenses = await _getBillByid({
        urlParam: id,
      });
      const code: Response['code'] = response.code;
      const dataResponse: DataTollExpenses = Array.isArray(payload.data)
        ? payload.data[0]
        : payload.data;

      if (code === 200) {
        handleGetTolls();
        setDataTemp(dataResponse);
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleOpenDeleteModal = (data: TollExpensesData['data']) => {
    const message: string = '¿Seguro que desea eliminar este dato:';
    const dataValue = `${data?.nombreOrigen ? data?.nombreOrigen : '-'} - ${
      data?.nombreDestino ? data?.nombreDestino : '-'
    }`;
    modalDelete({
      message,
      dataValue,
      callbackConfirm: () => handleConfirmDeleteBill(data._id),
    });
  };

  const handleConfirmDeleteBill = async (id: string): Promise<boolean> => {
    try {
      const response: ResponseTollExpenses = await _deleteBill({
        urlParam: id,
      });
      const code: Response['code'] = response.response.code;
      const message: Response['message'] = response.response.message;

      if (code === 200) {
        modalSuccess({ message });
        handleGetAllBills();
      } else {
        modalInformation({ message });
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const validationSchema = Yup.object().shape({
    routes: Yup.object().nullable().required('Este campo es obligatorio'),
    comidas: Yup.number().nullable().positive(positiveNumber),
    hoteles: Yup.number().nullable().positive(positiveNumber),
    pasajeDestino: Yup.number().nullable().positive(positiveNumber),
    pasajeOrigen: Yup.number().nullable().positive(positiveNumber),
    ferri: Yup.number().nullable().positive(positiveNumber),
    flight: Yup.number().nullable().positive(positiveNumber),
    stayPayment: Yup.number().nullable().positive(positiveNumber),
    transferInsurance: Yup.number().nullable().positive(positiveNumber),
    taxi: Yup.number().nullable().positive(positiveNumber),
    portRelease: Yup.number().nullable().positive(positiveNumber),
    talachas: Yup.number().nullable().positive(positiveNumber),
    phytoSanitary: Yup.number().nullable().positive(positiveNumber),
    urea: Yup.number().nullable().positive(positiveNumber),
    UDSUSA: Yup.number().nullable().positive(positiveNumber),
    extra: Yup.number().nullable().positive(positiveNumber),
  });

  const initialValues: FormValues = {
    routes: dataEdit ? dataEdit?.routes : null,
    comidas: dataEdit ? dataEdit?.comidas : '',
    hoteles: dataEdit ? dataEdit?.hoteles : '',
    pasajeDestino: dataEdit ? dataEdit?.pasajeDestino : '',
    pasajeOrigen: dataEdit ? dataEdit?.pasajeOrigen : '',
    ferri: dataEdit ? dataEdit?.ferri : '',
    flight: dataEdit ? dataEdit?.flight : '',
    stayPayment: '',
    transferInsurance: '',
    taxi: dataEdit ? dataEdit?.taxi : '',
    portRelease: '',
    talachas: dataEdit ? dataEdit?.talachas : '',
    phytoSanitary: dataEdit ? dataEdit?.phytoSanitary : '',
    urea: dataEdit ? dataEdit?.urea : '',
    udsUsa: dataEdit ? dataEdit?.udsUsa : '',
    extra: dataEdit ? dataEdit?.extra : '',
  };

  const handleSubmit = async (values: any): Promise<boolean> => {
    try {
      const newValues = {
        idCliente: user?.id,
        rutaId: values.routes?._id,
        pasajeOrigen: values?.pasajeOrigen ? values?.pasajeOrigen : 0,
        pasajeDestino: values?.pasajeDestino ? values?.pasajeDestino : 0,
        comidas: values?.comidas ? values?.comidas : 0,
        hoteles: values?.hoteles ? values?.hoteles : 0,
        ferri: values?.ferri ? values?.ferri : 0,
        vuelo: values?.flight ? values?.flight : 0,
        pagoEstadia: values?.stayPayment ? values?.stayPayment : 0,
        seguroTraslado: values?.transferInsurance
          ? values?.transferInsurance
          : 0,
        taxi: values?.taxi ? values?.taxi : 0,
        puerto: values?.portRelease ? values?.portRelease : 0,
        talachas: values?.talachas ? values?.talachas : 0,
        fitosanitarias: values?.phytoSanitary ? values?.phytoSanitary : 0,
        urea: values?.urea ? values?.urea : 0,
        udsUsa: values?.udsUsa ? values?.udsUsa : 0,
        extra: values?.extra ? values?.extra : 0,
      };
      if (dataEdit) {
        const response = await _updateBill({
          urlParam: dataTemp?._id,
          body: newValues,
        });

        const code: Response['code'] = get(response, 'response.code', 200);
        const message: Response['message'] = get(
          response,
          'response.message',
          ''
        );

        if (code === 200) {
          modalSuccess({ message });
          handleGetAllBills();
          setDataTemp(null);
        } else {
          modalInformation({ message });
        }
      } else {
        const response: ResponseTollExpenses = await _createBill({
          body: newValues,
        });
        const code: Response['code'] = get(response, 'response.code');
        const message: Response['message'] = get(response, 'response.message');

        if (code === 200) {
          modalSuccess({ message });
          handleGetAllBills();
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
    billsDataTable,
    handleGetAllBills,
    handleGetBill,
    handleOpenDeleteModal,
    handleSubmit,
    setDataEdit,
    validationSchema,
  };
};
