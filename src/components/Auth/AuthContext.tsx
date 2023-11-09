import { Context, createContext } from 'react';
import { AuthContextType } from '../../models/auth';

export const AuthContext: Context<AuthContextType> = createContext(
  {} as AuthContextType
);
