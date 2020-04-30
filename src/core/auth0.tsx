import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import * as React from 'react';
import { flatten, onRedirectCallback } from '../utils/authUtils';
import { AuthProvider } from './auth0Context';

type ConfigProps = {
  client_id: string;
  domain: string;
  redirectUri: string;
};
export interface Auth0ProviderProps {
  children: React.ReactNode;
  onSuccessfulLogin: (authProps: any) => void;
  config: ConfigProps;
}

const Auth0Provider: React.FC<Auth0ProviderProps> = ({
  children,
  onSuccessfulLogin,
  config,
}) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState();
  const [auth0Client, setAuth0] = React.useState<Auth0Client>();
  const [loading, setLoading] = React.useState(true);
  const [accessToken, setAccessToken] = React.useState();

  React.useEffect(() => {
    const initAuth0 = async () => {
      /* Instantiate AuthO client */
      setLoading(true);
      const auth0FromHook = await createAuth0Client(config);
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
    // auth0Client && auth0Client.handleRedirectCallback();

    /* get user details */
    const getUser = auth0Client && await auth0Client.getUser();

    /* get user token */
    const getTokenSilently = auth0Client && await auth0Client.getTokenSilently();
    setAccessToken(getTokenSilently);

    /* function called when the authentication process is successful */
    onSuccessfulLogin(flatten(getUser, getTokenSilently));
    setUser(getUser);
    setLoading(false);
  };

  const onLogout = (...p) => {
    return auth0Client && auth0Client.logout();
  };

  return (
    <AuthProvider
      value={{
        isAuthenticated,
        user,
        accessToken,
        loading,
        handleRedirectCallback,
        loginWithRedirect: (...p) => auth0Client && auth0Client.loginWithRedirect(...p),
        logout: (...p) => onLogout(...p),
      }}
    >
      {children}
    </AuthProvider>
  );
};

export default Auth0Provider;
