/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import { useLoader } from '../../components/Loader';
import { LoaderContextType } from '../../models';

const Transfers = () => {
  const { handleShowLoader }: LoaderContextType = useLoader();

  const _getTransfers = useApi({
    endpoint: '/peajes',
    method: 'get',
  });

  useEffect(() => {
    handleShowLoader(true);
    handleGetTransfers();
  }, []);

  const handleGetTransfers = async (): Promise<boolean> => {
    try {
      const response = await _getTransfers();

      console.log('TRANSFERS', response);
      handleShowLoader(false);
      return true;
    } catch (error) {
      return false;
    }
  };
  return <div>Transfers</div>;
};

export { Transfers };
