import { createContext, useCallback, useState, useContext, FC } from 'react';

import api from '../services/api';

interface AuthState {
  token: string;
  user: Object;
}



interface IAuthContext {
  user: Object;
  signIn(connectionId: string): Promise<void>;
  signOut(): void;
}


const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: FC = ({ children }) => {
  const [data, setData] = useState<AuthState>( () => {
    const user = window.sessionStorage.getItem('user') as string | null;
    const token =  window.sessionStorage.getItem('token') as string | null;

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ connectionId }) => {
    const response = await api.post('sessions_connection_id', { connectionId });

    console.log(response);

    const { token, user } = response.data;

    window.sessionStorage.setItem('token', token);
    window.sessionStorage.setItem('user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('user');

    setData({} as AuthState);
  }, []);

  return <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>{children}</AuthContext.Provider>;
};

export function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within as AuthProvider');
  }

  return context;
}