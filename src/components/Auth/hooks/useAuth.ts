import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { AuthContextType } from '../../../models';

export const useAuth = (): AuthContextType => useContext(AuthContext);
