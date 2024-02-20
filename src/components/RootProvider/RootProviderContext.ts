import { Context, createContext } from 'react';

export interface Values {
  customers: [];
  states: [];
  countries: [];
  countriesByState: [];
  countriesByStateSecond: [];
  countriesByStateUnitTypeOrigin: [];
  countriesByStateUnitTypeDestination: [];
  countriesByStateUnitType: [];
  localidades: [];
  localidadesSecond: [];
  catalogs: [];
  unitTypes: [];
  routes: [];
  routesWithoutExpenses: [];
}

export const initialState: Values = {
  customers: [],
  states: [],
  countries: [],
  countriesByState: [],
  countriesByStateSecond: [],
  countriesByStateUnitTypeOrigin: [],
  countriesByStateUnitTypeDestination: [],
  countriesByStateUnitType: [],
  localidades: [],
  localidadesSecond: [],
  catalogs: [],
  unitTypes: [],
  routes: [],
  routesWithoutExpenses: [],
};

export const RootProviderContext: Context<any> | any = createContext(null);
