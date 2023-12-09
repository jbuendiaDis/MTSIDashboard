import { useState } from 'react';
import { useLoader } from '../../components/Loader';
import { useApi } from '../../hooks/useApi';
import { LoaderContextType, Response } from '../../models';
import {
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

export const useHelpers = () => {
  const { user } = useAuth();
  const { handleShowLoader }: LoaderContextType = useLoader();
  const { modalDelete, modalInformation, modalSuccess } =
    useModalConfirmation();
  const [billsDataTable, setBillsDataTable] = useState<any[]>([]);
  const [dataEdit, setDataEdit] = useState<any | null>(null);

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

  const handleGetAllBills = async (): Promise<boolean> => {
    try {
      const { payload, response }: ResponseTollExpenses =
        await _getAllTollExpenses();
      const code: Response['code'] = response.code;
      const dataResponse: PayloadTollExpenses['data'] = payload.data;

      console.log('dataResponse__', dataResponse);

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

        console.log('FORMAT', formaterData);

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
      const dataResponse = payload.data;

      if (code === 200) {
        setDataEdit(dataResponse);
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleOpenDeleteModal = (data: TollExpensesData['data']) => {
    const message: string = '¿Seguro que desea eliminar este dato:';
    const dataValue = `${data?.origen} - ${data.destino}`;
    console.log('data-delete', data);
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
    comidas: Yup.number().nullable(),
    hoteles: Yup.number().nullable(),
    pasajeDestino: Yup.number().nullable(),
    pasajeOrigen: Yup.number().nullable(),
  });

  const initialValues: FormValues = {
    comidas: '',
    hoteles: '',
    pasajeDestino: '',
    pasajeOrigen: '',
  };

  const handleSubmit = async (values: any): Promise<boolean> => {
    try {
      console.log('VALUES', values);
      const newValues = {
        ...values,
        idCliente: user?.id,
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

  console.log('DATA_EDIT', dataEdit);

  return {
    dataEdit,
    initialValues,
    billsDataTable,
    handleGetAllBills,
    handleGetBill,
    handleOpenDeleteModal,
    handleSubmit,
    validationSchema,
  };
};
