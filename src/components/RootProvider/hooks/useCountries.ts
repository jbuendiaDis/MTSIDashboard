import { get } from 'lodash';
import { useApi } from '../../../hooks/useApi';
import {
  CountriesData,
  PayloadCountries,
  Response,
  ResponseCountries,
} from '../../../models';
import { formatToCurrency } from '../../../utils/amountFormater';
import { format, parseISO } from 'date-fns';

export const useCountries = ({ rootState, rootDispatch }: any) => {
  const { countries, countriesByState, countriesByStateUnitType } = rootState;

  const _getAllCountries = useApi({
    endpoint: '/countries/all',
    method: 'get',
  });

  const _getCountriesByState = useApi({
    endpoint: '/countries/by-estado',
    method: 'get',
  });

  const _getCountriesByStateUnitType = useApi({
    endpoint: '/countries/estado',
    method: 'get',
  });

  const handleGetAllCountries = async (): Promise<boolean> => {
    try {
      const { payload, response }: ResponseCountries = await _getAllCountries();
      const code: Response['code'] = response.code;
      const dataResponse: PayloadCountries['data'] = payload.data;

      if (code === 202 || code === 200) {
        const payload: CountriesData[] = dataResponse.map((item) => {
          const costoNumber =
            typeof item.costo === 'number'
              ? item.costo
              : parseFloat(item.costo || '0');

          return {
            ...item,
            costo: item.costo
              ? formatToCurrency(costoNumber)
              : formatToCurrency(0),
            fechaCreacion:
              typeof item.fechaCreacion === 'string'
                ? format(parseISO(item.fechaCreacion), 'dd/MM/yyyy')
                : format(item.fechaCreacion, 'dd/MM/yyyy'),
          };
        });

        rootDispatch({ type: 'countries', payload });
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleGetCountrie = async (state: number): Promise<boolean> => {
    try {
      const response: ResponseCountries = await _getCountriesByState({
        urlParam: state,
      });
      const code: Response['code'] = get(response, 'response.code');
      const payload: PayloadCountries['data'] = get(response, 'payload.data');

      if (code === 200) rootDispatch({ type: 'countriesByState', payload });

      return true;
    } catch (error) {
      return false;
    }
  };

  const handleGetCountriesByStateUnitType = async (
    state: number,
    unit: string
  ): Promise<boolean> => {
    try {
      console.log('antes', state, unit);
      const response: ResponseCountries = await _getCountriesByStateUnitType({
        urlParam: `${state}/tipoUnidad/${unit}`,
      });
      const code: Response['code'] = get(response, 'response.code');
      const payload: PayloadCountries['data'] = get(response, 'payload.data');

      if (code === 200)
        rootDispatch({ type: 'countriesByStateUnitType', payload });
      console.log('ROOT', payload, response);
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    countries,
    countriesByState,
    countriesByStateUnitType,
    handleGetAllCountries,
    handleGetCountrie,
    handleGetCountriesByStateUnitType,
  };
};
