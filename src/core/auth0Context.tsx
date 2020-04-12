import * as React from 'react';

export const Auth0Context = React.createContext({});
export const AuthProvider = Auth0Context.Provider;
export const useAuth0 = () => React.useContext(Auth0Context);
