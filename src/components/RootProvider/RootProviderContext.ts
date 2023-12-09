import { Context, createContext } from 'react';

export interface Values {
  customers: [];
  states: [];
}

export const initialState: Values = {
  customers: [],
  states: [],
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
