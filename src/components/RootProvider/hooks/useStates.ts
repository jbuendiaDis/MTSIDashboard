import { useApi } from '../../../hooks/useApi';
import {
  DataStates,
  FormatDataState,
  Response,
  ResponseStates,
} from '../../../models';

export const useStates = ({ rootState, rootDispatch }: any) => {
  const { states } = rootState;

  const _getStates = useApi({
    endpoint: '/states',
    method: 'get',
  });

  const handleGetStates = async (): Promise<boolean> => {
    try {
      const { payload, response }: ResponseStates = await _getStates();
      const code: Response['code'] = response.code;
      const dataResponse: DataStates['data'] = payload.data;

      if (code === 200) {
        const payload: FormatDataState[] = dataResponse
          .map((obj: any) => {
            const keys = Object.keys(obj);
            return keys.map((key) => ({
              label: obj[key],
              codigo: Number(key),
              // _id: obj._id,
            }));
          })
          .flat();

        if (payload.length > 0) {
          payload.pop();
        }

        rootDispatch({ type: 'states', payload });
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    states,
    handleGetStates,
  };
};
