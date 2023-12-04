/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { useLoader } from '../../components/Loader';
import { LoaderContextType, Response } from '../../models';
import { DataTolls, ResponseTolls } from './types';
import { PayloadDataReturns } from '../Returns/types';
import { formatToCurrency } from '../../utils/amountFormater';
import { useModalConfirmation } from '../../hooks/useModalConfirmation';

export const useHelpers = () => {
  const [tollsData, setTollsData] = useState<DataTolls[]>([]);
  const { handleShowLoader }: LoaderContextType = useLoader();
  const { modalDelete, modalSuccess, modalInformation } =
    useModalConfirmation();

  const _getTolls = useApi({
    endpoint: '/peajes',
    method: 'get',
  });

  const _getStates = useApi({
    endpoint: '/states',
    method: 'get',
  });

  const _getCountries = useApi({
    endpoint: '/countries',
    method: 'get',
  });

  const _deleteToll = useApi({
    endpoint: '/peajes',
    method: 'delete',
  });

  useEffect(() => {
    handleShowLoader(true);
    handleGetTolls();
    handleGetState();
    handleGetCountries();
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
        console.log('DATA', formatData);
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleGetState = async (): Promise<boolean> => {
    try {
      const response = await _getStates();

      //   console.log('COUTRIES', response);
      handleShowLoader(false);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleGetCountries = async (): Promise<boolean> => {
    try {
      const response = await _getCountries();

      //   console.log('SATES', response);
      handleShowLoader(false);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleOpenModalDelete = (data: DataTolls) => {
    console.log('data', data);
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
      console.log('ID_DELETE', id);
      // const response = await _deleteToll({
      //   urlParam: id,
      // });
      // console.log('RESponse', response);
      // handleGetTolls();

      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    tollsData,
    handleOpenModalDelete,
  };
};
