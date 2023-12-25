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
    case 'countriesByStateSecond':
      return {
        ...state,
        countriesByStateSecond: _.get(action, ['payload'], []),
      };
    case 'countriesByStateUnitType':
      return {
        ...state,
        countriesByStateUnitType: _.get(action, ['payload'], []),
      };
    case 'countriesByStateUnitTypeOrigin':
      return {
        ...state,
        countriesByStateUnitTypeOrigin: _.get(action, ['payload'], []),
      };
    case 'countriesByStateUnitTypeDestination':
      return {
        ...state,
        countriesByStateUnitTypeDestination: _.get(action, ['payload'], []),
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
    case 'resetCountriesByState':
      return {
        ...state,
        countriesByState: [],
      };
    case 'resetCountriesByStateSecond':
      return {
        ...state,
        countriesByStateSecond: [],
      };
    case 'resetCountriesByStateUnitTypeOrigin':
      return {
        ...state,
        countriesByStateUnitTypeOrigin: [],
      };
    case 'resetCountriesByStateUnitTypeDestination':
      return {
        ...state,
        countriesByStateUnitTypeDestination: [],
      };
    case 'resetCountriesByStateUnitType':
      return {
        ...state,
        countriesByStateUnitType: [],
      };
    default:
      return state;
  }
};
