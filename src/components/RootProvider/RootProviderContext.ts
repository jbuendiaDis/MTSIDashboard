import { Context, createContext } from 'react';

export interface Values {
  customers: [];
  states: [];
  countries: [];
  countriesByState: [];
  countriesByStateUnitType: [];
  catalogs: [];
  unitTypes: [];
}

export const initialState: Values = {
  customers: [],
  states: [],
  countries: [],
  countriesByState: [],
  countriesByStateUnitType: [],
  catalogs: [],
  unitTypes: [],
  // countries: [],
  // userAdmin: {},
  // users: [],
  // tags: [],
  // tasks: [],
  // modules: [],
  // quotations: [],
  // doctors: [],
  // specialitys: [],
  // states: [],
  // statistics: {
  //   staticData: [],
  //   userInteractions: [],
  //   mostSee: [],
  //   topRated: [],
  //   percentageDoctorsBySpeciality: [],
  // },
  // lastContent: {
  //   lastDocuments: [],
  //   lastVideos: [],
  // },
};

export const RootProviderContext: Context<any> | any = createContext(null);
