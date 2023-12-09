/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useMemo, useReducer } from 'react';
import { Values, initialState } from './RootProviderContext';
import { reducer } from './reduce';
import { RootProviderContext } from './RootProviderContext';
import { useCustomers } from './useCustomers/useCustomers';
import { useStates } from './hooks/useStates';

interface RootProviderProps {
  children: ReactNode;
}

const RootProvider = ({ children }: RootProviderProps) => {
  const [rootState, rootDispatch] = useReducer<Values | any>(
    reducer,
    initialState
  );

  const actionsCustomers = useCustomers({ rootState, rootDispatch });
  const actionsState = useStates({ rootState, rootDispatch });

  const contextValue = useMemo(
    () => ({
      actionsCustomers,
      actionsState,
      rootState,
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
