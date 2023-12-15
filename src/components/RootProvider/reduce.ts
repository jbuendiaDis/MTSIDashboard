import _ from 'lodash';
import { Values } from './RootProviderContext';

interface ActionValues {
  type: string;
  payload: any[];
}

export const reducer = (state: Values, action: ActionValues) => {
  switch (action.type) {
    case 'customers':
      return {
        ...state,
        customers: _.get(action, ['payload'], []),
      };
    case 'states':
      return {
        ...state,
        states: _.get(action, ['payload'], []),
      };
    case 'countries':
      return {
        ...state,
        countries: _.get(action, ['payload'], []),
      };
    case 'countriesByState':
      return {
        ...state,
        countriesByState: _.get(action, ['payload'], []),
      };
    case 'catalogs':
      return {
        ...state,
        catalogs: _.get(action, ['payload'], []),
      };
    case 'unitTypes':
      return {
        ...state,
        unitTypes: _.get(action, ['payload'], []),
      };
    default:
      return state;
  }
};
