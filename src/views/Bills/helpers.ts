import { useEffect, useState } from 'react';
import { useLoader } from '../../components/Loader';
import { useApi } from '../../hooks/useApi';
import { LoaderContextType, Response } from '../../models';
import { PayloadTollExpenses, ResponseTollExpenses } from './types';
import { formatToCurrency } from '../../utils/amountFormater';

export const useHelpers = () => {
  const [billsDataTable, setBillsDataTable] = useState<any[]>([]);
  const { handleShowLoader }: LoaderContextType = useLoader();

  const _getAllTollExpenses = useApi({
    endpoint: '/gastosPeajes',
    method: 'get',
  });

  // const _getAllBills = useApi({
  //   endpoint: '/gastos',
  //   method: 'get',
  // });

  const _getBillByid = useApi({
    endpoint: '/gastos',
    method: 'get',
  });

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

        console.log('>>>', formaterData);

        setBillsDataTable(formaterData);
        handleShowLoader(false);
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  const handleGetBill = async (data: string): Promise<boolean> => {
    console.log('DATA', data);
    try {
      const response = await _getBillByid({
        urlParam: data,
      });

      console.log('RESPONSe', response);
      return true;
    } catch (error) {
      return false;
    }
  };

  const initialValues = {
    name: '',
  };

  const handleSubmit = async (values: any): Promise<boolean> => {
    try {
      console.log('VALUES', values);
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    initialValues,
    billsDataTable,
    handleGetAllBills,
    handleGetBill,
    handleSubmit,
  };
};
