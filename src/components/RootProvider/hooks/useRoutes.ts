import { useApi } from '../../../hooks/useApi';
import { Response } from '../../../models';
import {
  PayloadRoutesWithoutExpenses,
  ResponseRoutesWithoutExpenses,
} from '../../../views/Routes/types';
import { DataToll, ResponseTolls } from '../../../views/Tolls/types';

export const useRoutes = ({ rootState, rootDispatch }: any) => {
  const { routes, routesWithoutExpenses } = rootState;

  const _getTolls = useApi({
    endpoint: '/peajes',
    method: 'get',
  });

  const _getTollsWithoutCharges = useApi({
    endpoint: '/peajessingastos',
    method: 'get',
  });

  const handleGetTolls = async (): Promise<boolean> => {
    try {
      const { payload, response }: ResponseTolls = await _getTolls();
      const code: Response['code'] = response.code;
      const dataResponse: DataToll[] | DataToll = payload.data;

      if (code === 200) {
        const payload: DataToll[] | DataToll = dataResponse;
        rootDispatch({ type: 'routes', payload });
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleGetTollsWithoutChgarges = async (): Promise<boolean> => {
    try {
      const { payload, response }: ResponseRoutesWithoutExpenses =
        await _getTollsWithoutCharges();
      const code: Response['code'] = response.code;
      const dataResponse: PayloadRoutesWithoutExpenses['data'] = payload.data;

      if (code === 200) {
        const payload: PayloadRoutesWithoutExpenses['data'] = dataResponse;
        rootDispatch({ type: 'routesWithoutExpenses', payload });
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    handleGetTolls,
    handleGetTollsWithoutChgarges,
    routes,
    routesWithoutExpenses,
  };
};
