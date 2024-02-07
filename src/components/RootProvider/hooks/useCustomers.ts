import { get } from 'lodash';
import { useApi } from '../../../hooks/useApi';
import { PaylaodCustomers, Payload } from '../../../views/Customers/types';

export const useCustomers = ({ rootState, rootDispatch }: any) => {
  const { customers } = rootState;

  const _getCustomers = useApi({
    endpoint: '/clientes',
    method: 'get',
  });

  const handleGetCustomers = async (): Promise<boolean> => {
    try {
      const response: Payload = await _getCustomers();
      const payload = get(response, 'payload', {});
      const dataResponse: PaylaodCustomers['data'][] = get(payload, 'data', []);
      const headerResponse: Payload['response'] = get(response, 'response');

      if (headerResponse.code === 200) {
        const payload: PaylaodCustomers['data'][] = dataResponse;
        rootDispatch({ type: 'customers', payload });
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    customers,
    handleGetCustomers,
  };
};
