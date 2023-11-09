import { Configuration } from '../../models';

const env = import.meta.env;

export const config: Configuration = {
  endpoints: {
    mainBackendUrl: `${env.VITE_APP_API_URL}`,
  },
};
