import { Context, createContext } from 'react';

export interface Values {
  customers: [];
  states: [];
  countries: [];
  countriesByState: [];
  countriesByStateSecond: [];
  countriesByStateUnitType: [];
  catalogs: [];
  unitTypes: [];
}

export const initialState: Values = {
  customers: [],
  states: [],
  countries: [],
  countriesByState: [],
  countriesByStateSecond: [],
  countriesByStateUnitType: [],
  catalogs: [],
  unitTypes: [],
};

export const RootProviderContext: Context<any> | any = createContext(null);
