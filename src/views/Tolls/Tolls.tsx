/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import { useLoader } from '../../components/Loader';
import { LoaderContextType } from '../../models';

const Tolls = () => {
  const { handleShowLoader }: LoaderContextType = useLoader();

  const _getTolls = useApi({
    endpoint: '/peajes',
    method: 'get',
  });

  useEffect(() => {
    handleShowLoader(true);
    handleGetTolls();
  }, []);

  const handleGetTolls = async (): Promise<boolean> => {
    try {
      const response = await _getTolls();

      console.log('RESPONSE', response);
      handleShowLoader(false);
      return true;
    } catch (error) {
      return false;
    }
  };

  return <div>Tolls</div>;
};

export { Tolls };
