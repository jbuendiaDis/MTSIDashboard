import {
  // useEffect,
  useState,
} from 'react';
import { useLoader } from '../../components/Loader';
import { useApi } from '../../hooks/useApi';
import { LoaderContextType, Response } from '../../models';
import {
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
// import { useRootProvider } from '../../components/RootProvider/hooks/useRootProvider';
import { get } from 'lodash';

export const useHelpers = () => {
  const { user } = useAuth();
  const { handleShowLoader }: LoaderContextType = useLoader();
  const { modalDelete, modalInformation, modalSuccess } =
    useModalConfirmation();
  // const { actionsCountries, actionsState }: any = useRootProvider();
  // const { states } = actionsState;
  // const {
  //   countriesByState,
  //   countriesByStateSecond,
  //   // handleGetCountrie,
  //   // handleGetCountrieSecond,
  // } = actionsCountries;
  const [billsDataTable, setBillsDataTable] = useState<any[]>([]);
  const [dataEdit, setDataEdit] = useState<any | null>(null);
  // const [dataTemp, setDataTemp] = useState<DataTollExpenses | null>(null);
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

  // const _getBillByid = useApi({
  //   endpoint: '/gastos',
  //   method: 'get',
  // });

  // const _updateBill = useApi({
  //   endpoint: '/gastos',
  //   method: 'put',
  // });

  // useEffect(() => {
  //   if (
  //     dataTemp !== null &&
  //     countriesByState.length > 0 &&
  //     countriesByStateSecond.length > 0
  //   ) {
  //     console.log('RENDER', dataTemp, countriesByState, countriesByStateSecond);
  //     const filterOriginState = states.find(
  //       (item: any) => item.codigo === parseInt(dataTemp.estadoOrigen)
  //     );
  //     const filterDestinationState = states.find(
  //       (item: any) => item.codigo === parseInt(dataTemp.estadoDestino)
  //     );
  //     const filterOriginLocality = countriesByState.find(
  //       (item: any) => item.codigo === dataTemp.codigo
  //     );

  //     console.log('filter', filterOriginState, filterDestinationState);
  //     const filterCountrie = countriesByState.find(
  //       (item: any) => item.codigo === dataTemp.codigo
  //     );
  //     const newDataEdit: FormValues = {
  //       state: filterState,
  //       nombre: filterCountrie,
  //       costo: dataTemp.costo,
  //       unitType: dataTemp.tipoUnidad,
  //       codigo: dataTemp.codigo,
  //     };
  //     setDataEdit(newDataEdit);
  //     setDataTemp(null);
  //   }
  // }, [dataTemp, countriesByState, countriesByStateSecond]);

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
            taxi: taxi,
            vuelo: flight,
            fitosanitarias: phytoSanitary,
            udsUsa: udsUsa,
            urea: urea,
            talachas: talachas,
            extra: extra,
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
      console.log('ID', id);
      // const { payload, response }: ResponseTollExpenses = await _getBillByid({
      //   urlParam: id,
      // });
      // const code: Response['code'] = response.code;
      // const dataResponse: DataTollExpenses = Array.isArray(payload.data)
      //   ? payload.data[0]
      //   : payload.data;

      // const originState: number = parseInt(dataResponse.estadoOrigen);
      // const destinationState: number = parseInt(dataResponse.estadoDestino);

      // if (code === 200) {
      //   handleGetCountrie(originState);
      //   handleGetCountrieSecond(destinationState);
      //   setDataTemp(dataResponse);
      // }
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
    routes: null,
    comidas: '',
    hoteles: '',
    pasajeDestino: '',
    pasajeOrigen: '',
    ferri: '',
    flight: '',
    stayPayment: '',
    transferInsurance: '',
    taxi: '',
    portRelease: '',
    talachas: '',
    phytoSanitary: '',
    urea: '',
    udsUsa: '',
    extra: '',
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
