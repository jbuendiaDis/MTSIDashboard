/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useMemo, useReducer } from 'react';
import { Values, initialState } from './RootProviderContext';
import { reducer } from './reduce';
import { RootProviderContext } from './RootProviderContext';
import { useStates } from './hooks/useStates';
import { useCountries } from './hooks/useCountries';
import { useCatalogs } from './hooks/useCatalogs';
import { useCustomers } from './hooks/useCustomers';
import { useRoutes } from './hooks/useRoutes';

interface RootProviderProps {
  children: ReactNode;
}

const RootProvider = ({ children }: RootProviderProps) => {
  const [rootState, rootDispatch] = useReducer<Values | any>(
    reducer,
    initialState
  );

  const actionsState = useStates({ rootState, rootDispatch });
  const actionsCountries = useCountries({ rootState, rootDispatch });
  const actionsCatalogs = useCatalogs({ rootState, rootDispatch });
  const actionsCustomers = useCustomers({ rootState, rootDispatch });
  const actionsRoutes = useRoutes({ rootState, rootDispatch });

  const contextValue = useMemo(
    () => ({
      actionsState,
      actionsCountries,
      actionsCatalogs,
      rootState,
      actionsCustomers,
      actionsRoutes,
    }),
    [rootState]
  );

  return (
    <RootProviderContext.Provider value={contextValue}>
      {children}
    </RootProviderContext.Provider>
  );
};

export { RootProvider };
