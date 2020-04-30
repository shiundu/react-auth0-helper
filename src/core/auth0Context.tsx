import * as React from 'react';
import { Auth0Props } from './types';

const defaultValues = {
  isLoading: undefined,
  isAuthenticated: undefined,
  logout: undefined,
  user: undefined,
  accessToken: undefined,
  handleRedirectCallback: () => null,
};

export const Auth0Context = React.createContext(defaultValues);
export const AuthProvider = Auth0Context.Provider;
export const useAuth0 = (): Auth0Props => React.useContext(Auth0Context);
