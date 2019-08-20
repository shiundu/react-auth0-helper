// @flow
// src/react-auth0-wrapper.js
import * as React from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';
import { AuthProvider } from './auth0Context';
import {
  flatten,
  getAuth0Config,
  onRedirectCallback,
} from '../utils/authUtils';

export type Auth0ProviderInterface = {
  children: React.ReactNode,
  onSuccessfulLogin: (user: any) => void
};

const Auth0Provider = ({
  children,
  onSuccessfulLogin,
}: Auth0ProviderInterface) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState();
  const [user, setUser] = React.useState();
  const [auth0Client, setAuth0] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [accessToken, setAccessToken] = React.useState();

  const initOptions = getAuth0Config();

  React.useEffect(() => {
    const initAuth0 = async () => {
      /* Instantiate AuthO client */
      setLoading(true);
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0(auth0FromHook);

      /* get code from url and redirect to last url before being redirected to the login page */
      if (window.location.search.includes('code=')) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      /* Check if user is authenticated - returns boolean */
      const checkIfAuthenticated = await auth0FromHook.isAuthenticated();
      setIsAuthenticated(checkIfAuthenticated);

      if (checkIfAuthenticated) {
        /* get user details */
        const getUser = await auth0FromHook.getUser();
        setUser(getUser);

        /* get user token */
        const getTokenSilently = await auth0FromHook.getTokenSilently();
        setAccessToken(getTokenSilently);

        /* function called when the authentication process is successful */
        onSuccessfulLogin(flatten(getUser, getTokenSilently));
      } else {
        /* redirects to login page is user is not authenticated */
        auth0FromHook.loginWithRedirect();
      }
      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const handleRedirectCallback = async () => {
    setLoading(true);
    /* get user details */
    // eslint-disable-next-line no-unused-vars
    const redirectCallback = (await auth0Client) && auth0Client.handleRedirectCallback();

    /* get user details */
    const getUser = (await auth0Client) && auth0Client.getUser();

    /* get user token */
    const getTokenSilently = await auth0Client.getTokenSilently();
    setAccessToken(getTokenSilently);

    /* function called when the authentication process is successful */
    onSuccessfulLogin(flatten(getUser, getTokenSilently));
    setUser(getUser);
    setLoading(false);
  };

  return (
    <AuthProvider
      value={{
        isAuthenticated,
        user,
        accessToken,
        loading,
        handleRedirectCallback,
        getIdTokenClaims: (...p) => auth0Client && auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth0Client && auth0Client.loginWithRedirect(...p),
        logout: (...p) => auth0Client.logout(...p),
      }}
    >
      {children}
    </AuthProvider>
  );
};

export default Auth0Provider;
