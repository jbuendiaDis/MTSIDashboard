import { useEffect, useState } from 'react';
import { useLoader } from '../../components/Loader';
import { useApi } from '../../hooks/useApi';
import { LoaderContextType, Response } from '../../models';
import {
  DataTollExpenses,
  FormValues,
  PayloadTollExpenses,
  ResponseTollExpenses,
  TollExpensesData,
} from './types';
import { formatToCurrency } from '../../utils/amountFormater';
import { useModalConfirmation } from '../../hooks/useModalConfirmation';
import { useAuth } from '../../components/Auth';
import { get } from 'lodash';
import * as Yup from 'yup';
import { useRootProvider } from '../../components/RootProvider/hooks/useRootProvider';

export const useHelpers = () => {
  const { user } = useAuth();
  const { handleShowLoader }: LoaderContextType = useLoader();
  const { modalDelete, modalInformation, modalSuccess } =
    useModalConfirmation();
  const { actionsCountries, actionsState }: any = useRootProvider();
  const { states } = actionsState;
  const {
    countriesByState,
    countriesByStateSecond,
    handleGetCountrie,
    handleGetCountrieSecond,
  } = actionsCountries;
  const [billsDataTable, setBillsDataTable] = useState<any[]>([]);
  const [dataEdit, setDataEdit] = useState<any | null>(null);
  const [dataTemp, setDataTemp] = useState<DataTollExpenses | null>(null);

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

  // console.log('locations', countriesByState, countriesByStateSecond);

  useEffect(() => {
    if (
      dataTemp !== null &&
      countriesByState.length > 0 &&
      countriesByStateSecond.length > 0
    ) {
      console.log('RENDER', dataTemp, countriesByState, countriesByStateSecond);
      const filterOriginState = states.find(
        (item: any) => item.codigo === parseInt(dataTemp.estadoOrigen)
      );
      const filterDestinationState = states.find(
        (item: any) => item.codigo === parseInt(dataTemp.estadoDestino)
      );
      // const filterOriginLocality = countriesByState.find(
      //   (item: any) => item.codigo === dataTemp.codigo
      // );

      console.log('filter', filterOriginState, filterDestinationState);
      // const filterCountrie = countriesByState.find(
      //   (item: any) => item.codigo === dataTemp.codigo
      // );
      // const newDataEdit: FormValues = {
      //   state: filterState,
      //   nombre: filterCountrie,
      //   costo: dataTemp.costo,
      //   unitType: dataTemp.tipoUnidad,
      //   codigo: dataTemp.codigo,
      // };
      // setDataEdit(newDataEdit);
      // setDataTemp(null);
    }
  }, [dataTemp, countriesByState, countriesByStateSecond]);

  const handleGetAllBills = async (): Promise<boolean> => {
    try {
      const { payload, response }: ResponseTollExpenses =
        await _getAllTollExpenses();
      const code: Response['code'] = response.code;
      const dataResponse: PayloadTollExpenses['data'] = payload.data;

      if (code === 200) {
        const formaterData = dataResponse.map((item) => {
          const foods = formatToCurrency(item.comidas);
          const hotels = formatToCurrency(item.hoteles);
          const originPassage = formatToCurrency(item.pasajeOrigen);
          const destinyPassage = formatToCurrency(item.pasajeDestino);
          const kilometers = item.peajes.reduce(
            (totalKilometers, kilometers) => {
              return totalKilometers + kilometers.kms;
            },
            0
          );
          const totalPeajes = formatToCurrency(
            item.peajes.reduce((total, costTotal) => {
              return total + costTotal.totalPeajes;
            }, 0)
          );
          return {
            ...item,
            comidas: foods,
            hoteles: hotels,
            pasajeOrigen: originPassage,
            pasajeDestino: destinyPassage,
            totalKilometers: `${kilometers} kms`,
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

      const originState: number = parseInt(dataResponse.estadoOrigen);
      const destinationState: number = parseInt(dataResponse.estadoDestino);

      if (code === 200) {
        handleGetCountrie(originState);
        handleGetCountrieSecond(destinationState);
        setDataTemp(dataResponse);
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleOpenDeleteModal = (data: TollExpensesData['data']) => {
    const message: string = '¿Seguro que desea eliminar este dato:';
    const dataValue = `${data?.origen ? data?.origen : '-'} - ${
      data?.destino ? data?.destino : '-'
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
    originState: Yup.object().nullable().required(),
    destinationState: Yup.object().nullable().required(),
    originLocality: Yup.object().nullable().required(),
    destinationLocality: Yup.object().nullable().required(),
    comidas: Yup.number().nullable(),
    hoteles: Yup.number().nullable(),
    pasajeDestino: Yup.number().nullable(),
    pasajeOrigen: Yup.number().nullable(),
  });

  const initialValues: FormValues = {
    originState: null,
    destinationState: null,
    originLocality: null,
    destinationLocality: null,
    comidas: '',
    hoteles: '',
    pasajeDestino: '',
    pasajeOrigen: '',
  };

  const handleSubmit = async (values: any): Promise<boolean> => {
    try {
      console.log('VALUES', values);
      const newValues = {
        idCliente: user?.id,
        estadoOrigen: values.originState.codigo,
        localidadOrigen: values.originLocality.codigo,
        estadoDestino: values.destinationState.codigo,
        localidadDestino: values.destinationLocality.codigo,
        origen: values.originState.label,
        destino: values.destinationState.label,
        pasajeOrigen: values.pasajeOrigen,
        pasajeDestino: values.pasajeDestino,
        comidas: values.comidas,
        hoteles: values.hoteles,
      };

      console.log('newValues', newValues);

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
