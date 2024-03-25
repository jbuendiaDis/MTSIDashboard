import { useApi } from '../../../hooks/useApi';
import {
  PayloadCatalogs,
  Response,
  ResponseCatalogs,
  ResponseCatalogsUnitTypes,
} from '../../../models';
import { get } from 'lodash';

export const useCatalogs = ({ rootState, rootDispatch }: any) => {
  const { catalogs, unitTypes, vehicleCondition, bodyStyle } = rootState;

  const _getCatalogs = useApi({
    endpoint: '/catalogs/parents',
    method: 'get',
  });
  const _getCatalogChildren = useApi({
    endpoint: '/catalogs/children',
    method: 'get',
  });

  const handleGetCatalogs = async (): Promise<boolean> => {
    try {
      const response: ResponseCatalogs = await _getCatalogs();
      const code: Response['code'] = get(response, 'response.code');
      const payload: PayloadCatalogs['data'] = get(
        response,
        'payload.data',
        []
      );

      if (code === 200) {
        rootDispatch({ type: 'catalogs', payload });
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleGetUnitType = async (id: string): Promise<boolean> => {
    try {
      const response: ResponseCatalogsUnitTypes = await _getCatalogChildren({
        urlParam: id,
      });
      const code: Response['code'] = get(response, 'response.code');
      const payload = get(response, 'payload.data', []);

      if (code === 200) {
        rootDispatch({ type: 'unitTypes', payload });
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleVehicleCondition = async (id: string): Promise<boolean> => {
    try {
      const response: ResponseCatalogsUnitTypes = await _getCatalogChildren({
        urlParam: id,
      });

      const code: Response['code'] = get(response, 'response.code');
      const payload = get(response, 'payload.data', []);

      if (code === 200) {
        rootDispatch({ type: 'vehicleCondition', payload });
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleBodyStyle = async (id: string): Promise<boolean> => {
    try {
      const response: ResponseCatalogsUnitTypes = await _getCatalogChildren({
        urlParam: id,
      });

      const code: Response['code'] = get(response, 'response.code');
      const payload = get(response, 'payload.data', []);

      if (code === 200) {
        rootDispatch({ type: 'bodyStyle', payload });
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    handleGetCatalogs,
    handleGetUnitType,
    handleVehicleCondition,
    handleBodyStyle,
    catalogs,
    unitTypes,
    vehicleCondition,
    bodyStyle,
  };
};
