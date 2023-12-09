import { get } from 'lodash';
import { useApi } from '../../../hooks/useApi';

export const useCustomers = ({ rootState, rootDispatch }: any) => {
  const { customers } = rootState;

  const _getCustomers = useApi({
    endpoint: '/clientes',
    method: 'get',
  });

  // console.log('hook_customers', customers);

  const handleGetCustomers = async (): Promise<boolean> => {
    try {
      const response = await _getCustomers();
      //   const payload = get(response, 'payload', {});
      //   const dataResponse: PaylaodCustomers['data'][] = get(payload, 'data', []);
      //   const headerResponse: Payload['response'] = get(response, 'response');
      const payload = get(response, 'payload.data', []);

      rootDispatch({ type: 'customers', payload });

      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    handleGetCustomers,
    customers,
  };
};
