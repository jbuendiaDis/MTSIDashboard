import { Context, createContext } from 'react';
import { LoaderContextType } from '../../models';

export const LoaderContext: Context<LoaderContextType> | any =
  createContext(null);
