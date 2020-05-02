import * as React from 'react';
import { WithAuth0Props } from './types';

export const Auth0Context = React.createContext<WithAuth0Props | undefined>(undefined);
export const AuthProvider = Auth0Context.Provider;
export const useAuth0 = (): WithAuth0Props => React.useContext(Auth0Context);
