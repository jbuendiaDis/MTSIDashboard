/* eslint-disable no-throw-literal */
import { get, isEmpty, isObject } from 'lodash';
import { Box, Button } from '@mui/material';
import { useLoader } from '../components/Loader';
import { useModal } from '../components/Modal';
import { toQueryString } from '../utils/https';
import { instance } from '../providers/api';
import { useTranslation } from '../hooks/useTranslations';
import { useAuth } from '../components/Auth';

interface Props {
  endpoint: string;
  method: 'post' | 'put' | 'get' | 'post' | 'delete' | 'patch';
  customMessagesKey?: string;
}

function useApi<U = null>({ endpoint, method, customMessagesKey }: Props) {
  const { t } = useTranslation();
  const { handleOpenModal, handleCloseModal } = useModal();
  const { handleShowLoader } = useLoader();
  const auth = useAuth();

  type HandleFetch = <T = U>(param?: {
    body?: object;
    urlParam?: string | number;
    queryString?:
      | string
      | {
          [key: string]: string | number | undefined | (string | number)[];
        };
    config?: {
      showLoader?: boolean;
      showErrorModal?: boolean;
    };
  }) => Promise<T>;

  const handleFetch: HandleFetch = async ({
    body,
    urlParam,
    queryString,
    config: _config,
  } = {}) => {
    const config = {
      showLoader: true,
      showErrorModal: true,
      ..._config,
    };

    let url = `${endpoint}${urlParam ? `/${urlParam}` : ''}`;

    if (isObject(queryString) && !isEmpty(queryString)) {
      if (Object.values(queryString).some((value) => !!value)) {
        url = `${url}?${toQueryString(queryString)}`;
      }
    }

    try {
      config.showLoader && handleShowLoader(true);

      const response = await instance[method](url, body);

      return response.data;
    } catch (error: any) {
      if (get(error, 'response.status') === 401) {
        return auth.logout();
      }

      console.log('error', error);

      const errorMessage = get(error, 'message', '');
      const statusError = get(error, 'response.status', '');

      // let errorMessage = t(
      //   `httpErrors.${customMessagesKey}.${get(error, 'response.status', '')}`
      // );

      // errorMessage = errorMessage.includes('httpErrors')
      //   ? `httpErrors.${get(error, 'response.status', '')}`
      //   : errorMessage;

      // errorMessage = errorMessage.includes('httpErrors')
      //   ? t('errorPages.unexpectedDescription')
      //   : errorMessage;

      config.showErrorModal &&
        handleOpenModal({
          fullWidth: true,
          maxWidth: 'xs',
          title: 'Ha ocurrido un error',
          body: (
            <Box component="div">
              {errorMessage}
              <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <span>status: {statusError}</span>
              </Box>
            </Box>
          ),
          actionButtons: (
            <Button onClick={handleCloseModal} variant="contained">
              Aceptar
            </Button>
          ),
        });

      return get(error, 'response.data');
    } finally {
      config.showLoader && handleShowLoader(false);
    }
  };

  return handleFetch;
}

export { useApi };
