import { useApi } from '../../../hooks/useApi';
import {
  CountriesData,
  FormatDataState,
  PayloadCountries,
  Response,
  ResponseCountries,
} from '../../../models';
import { formatToCurrency } from '../../../utils/amountFormater';
import { format, parseISO } from 'date-fns';

export const useCountries = ({ rootState, rootDispatch }: any) => {
  const { countries, countriesByState } = rootState;

  const _getAllCountries = useApi({
    endpoint: '/countries',
    method: 'get',
  });

  const _getCountriesByState = useApi({
    endpoint: '/countries/by-estado',
    method: 'get',
  });

  const handleGetAllCountries = async (): Promise<boolean> => {
    try {
      const { payload, response }: ResponseCountries = await _getAllCountries();
      const code: Response['code'] = response.code;
      const dataResponse: PayloadCountries['data'] = payload.data;

      if (code === 200) {
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

  const handleGetCountrie = async (data: FormatDataState): Promise<boolean> => {
    try {
      console.log('ROOT', data);
      const { payload, response }: ResponseCountries =
        await _getCountriesByState({
          urlParam: data.codigo,
        });
      const code: Response['code'] = response.code;
      const dataResponse: PayloadCountries['data'] = payload.data;

      if (code === 200) {
        const payload: PayloadCountries['data'] = dataResponse;
        rootDispatch({ type: 'countriesByState', payload });
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    countries,
    countriesByState,
    handleGetAllCountries,
    handleGetCountrie,
  };
};
