import { useContext } from 'react';
import { LoaderContext } from '../LoaderContext';
import { LoaderContextType } from '../../../models';

export const useLoader = (): LoaderContextType => useContext(LoaderContext);
