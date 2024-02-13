import { useApi } from '../../../hooks/useApi';
import { Response } from '../../../models';
import { DataToll, ResponseTolls } from '../../../views/Tolls/types';

export const useRoutes = ({ rootState, rootDispatch }: any) => {
  const { routes } = rootState;

  const _getTolls = useApi({
    endpoint: '/peajes',
    method: 'get',
  });

  const handleGetTolls = async (): Promise<boolean> => {
    try {
      const { payload, response }: ResponseTolls = await _getTolls();
      const code: Response['code'] = response.code;
      const dataResponse: DataToll[] = payload.data;

      if (code === 200) {
        const payload: DataToll[] = dataResponse;
        rootDispatch({ type: 'routes', payload });
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    handleGetTolls,
    routes,
  };
};
