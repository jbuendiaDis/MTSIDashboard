import { AuthContextType, FormValues, Roles } from '../../models';
import { ReactNode, useMemo, useState } from 'react';
import { AuthContext } from './AuthContext';
import { getItem, setItem } from '../../utils/persistentStorage';

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<AuthContextType['user']>(getItem('session'));

  const login: AuthContextType['login'] = async (
    values: FormValues
  ): Promise<boolean> => {
    try {
      //TODO: Peticion login a la API
      console.log('AUTH_PROVIDER', values);

      //datos que retorna nuestra API

      if (values) {
        const response = {
          name: 'Juan Carlos',
          rol: Roles.ADMIN,
        };
        setItem('session', response);

        setUser(response);

        console.log('RES', response);
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  const logout: AuthContextType['logout'] = (): void => {
    localStorage.removeItem('session');

    setUser(undefined);
  };

  const contextValue = useMemo(() => ({ user, login, logout }), [user]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider };
