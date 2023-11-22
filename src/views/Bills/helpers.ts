import { useState } from 'react';
import { useLoader } from '../../components/Loader';
import { useApi } from '../../hooks/useApi';
import { LoaderContextType } from '../../models';
import { FormaterData, PayloadData } from './types';
import { formatToCurrency } from '../../utils/amountFormater';

export const useHelpers = () => {
  const [billsDataTable, setBillsDataTable] = useState<FormaterData[]>([]);
  const { handleShowLoader }: LoaderContextType = useLoader();

  const _getAllBills = useApi({
    endpoint: '/gastos',
    method: 'get',
  });

  const _getBillByid = useApi({
    endpoint: '/gastos',
    method: 'get',
  });

  const handleGetAllBills = async (): Promise<boolean> => {
    try {
      const response: PayloadData[] = await _getAllBills();

      if (response.length > 0) {
        console.log(response);

        const formaterData: FormaterData[] = response.map((item) => {
          const foods = formatToCurrency(item.comidas);
          const hotels = formatToCurrency(item.hoteles);
          const originPassage = formatToCurrency(item.pasajeOrigen);
          const destinyPassage = formatToCurrency(item.pasajeDestino);

          return {
            ...item,
            comidas: foods,
            hoteles: hotels,
            pasajeOrigen: originPassage,
            pasajeDestino: destinyPassage,
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
