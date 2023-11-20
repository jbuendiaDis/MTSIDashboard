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

  const _getStates = useApi({
    endpoint: '/states',
    method: 'get',
  });

  const _getCountries = useApi({
    endpoint: '/countries',
    method: 'get',
  });

  useEffect(() => {
    handleShowLoader(true);
    handleGetTolls();
    handleGetState();
    handleGetCountries();
  }, []);

  const handleGetTolls = async (): Promise<boolean> => {
    try {
      const response = await _getTolls();

      console.log('PEAJES', response);
      handleShowLoader(false);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleGetState = async (): Promise<boolean> => {
    try {
      const response = await _getStates();

      console.log('COUTRIES', response);
      handleShowLoader(false);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleGetCountries = async (): Promise<boolean> => {
    try {
      const response = await _getCountries();

      console.log('SATES', response);
      handleShowLoader(false);
      return true;
    } catch (error) {
      return false;
    }
  };

  return <div>Tolls</div>;
};

export { Tolls };
