/* eslint-disable react-hooks/exhaustive-deps */
import { AuthContextType, FormValues, PayloadAuth } from '../../models';
import { ReactNode, useMemo, useState } from 'react';
import { AuthContext } from './AuthContext';
import { getItem, setItem } from '../../utils/persistentStorage';
import { useApi } from '../../hooks/useApi';
import { Response } from '../../models/responseApi';

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<AuthContextType['user'] | any>(
    getItem('session')
  );

  const _loginAuth = useApi({
    endpoint: '/login',
    method: 'post',
  });

  const login: AuthContextType['login'] = async (
    values: FormValues
  ): Promise<boolean> => {
    try {
      const { payload, response }: PayloadAuth = await _loginAuth({
        body: values,
      });
      const code: Response['code'] = response.code;
      const user = payload.user;
      const token = payload.token;

      if (code === 200) {
        const session = {
          user,
          token,
        };

        setItem('session', session.user);
        setItem('token', session.token);
        setUser({ ...session.user, isLogger: true });
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  const logout: AuthContextType['logout'] = (): void => {
    localStorage.removeItem('session');
    localStorage.removeItem('token');
    setUser(undefined);
  };

  const contextValue = useMemo(() => ({ user, login, logout }), [user]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider };
