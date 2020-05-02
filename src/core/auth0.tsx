import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import * as React from 'react';
import { onRedirectCallback, userSetup } from '../utils/authUtils';
import { AuthProvider } from './auth0Context';
import { ConfigProps, LogoutProps } from './types';

export interface Auth0ProviderProps {
  children: React.ReactNode;
  onSuccessfulLogin: (authProps: any) => void;
  config: ConfigProps;
  forceAuth?: boolean;
  namespace?: string;
}

const Auth0Provider: React.FC<Auth0ProviderProps> = ({
  children,
  onSuccessfulLogin,
  config,
  forceAuth = true,
  namespace
}) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState();
  const [auth0Client, setAuth0] = React.useState<Auth0Client>();
  const [loading, setLoading] = React.useState<boolean>(true);
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
        /* get user token */
        const getTokenSilently = await auth0FromHook.getTokenSilently();
        setAccessToken(getTokenSilently);

        /* get user details */
        const userDetails = await auth0FromHook.getUser();
        setUser(userSetup(getTokenSilently, userDetails, namespace));

        /* function called when the authentication process is successful */
        onSuccessfulLogin({ user: userSetup(getTokenSilently, userDetails, namespace), accessToken: getTokenSilently });
      } else {
        /* redirects to login page is user is not authenticated */
        if (!checkIfAuthenticated && forceAuth) {
          auth0FromHook.loginWithRedirect();
        }
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
    /* get user token */
    const getTokenSilently = auth0Client && await auth0Client.getTokenSilently();
    setAccessToken(getTokenSilently);

    /* get user details */
    const userDetails = auth0Client && await auth0Client.getUser();
    setUser(userSetup(getTokenSilently, userDetails, namespace));

    /* function called when the authentication process is successful */
    onSuccessfulLogin({ user: userSetup(getTokenSilently, userDetails, namespace), accessToken: getTokenSilently });

    setLoading(false);
  };

  const onLogout = (props: LogoutProps) => {
    return auth0Client && auth0Client.logout({
      ...props.options,
      federated: props.federated && !!props.federated
    });
  };

  return (
    <AuthProvider
      value={{
        isAuthenticated,
        user,
        accessToken,
        isLoading: loading,
        logout: onLogout,
        handleRedirectCallback,
      }}
    >
      {children}
    </AuthProvider>
  );
};

export default Auth0Provider;
