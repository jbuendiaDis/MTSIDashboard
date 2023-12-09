import { useContext } from 'react';
import { RootProviderContext } from '../RootProviderContext';

export const useRootProvider = () => useContext(RootProviderContext);
