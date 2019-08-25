// src/react-auth0-wrapper.js

import createAuth0Client from '@auth0/auth0-spa-js';
import PropTypes from 'prop-types';
import * as React from 'react';
import { flatten, getAuth0Config, onRedirectCallback } from '../utils/authUtils';
import { AuthProvider } from './auth0Context';

const Auth0Provider = ({
  children,
  onSuccessfulLogin,
  auth0config = getAuth0Config(),
}) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState();
  const [user, setUser] = React.useState();
  const [auth0Client, setAuth0] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [accessToken, setAccessToken] = React.useState();

  React.useEffect(() => {
    const initAuth0 = async () => {
      /* Instantiate AuthO client */
      setLoading(true);
      const auth0FromHook = await createAuth0Client({ auth0config });
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

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client.loginWithPopup(params);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setPopupOpen(false);
    }

    setUser(await auth0Client.getUser());
    setIsAuthenticated(true);
  };

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

  const onLogout = (...p) => {
    auth0Client.logout(...p || window.location.origin);
  };

  return (
    <AuthProvider
      value={{
        isAuthenticated,
        user,
        accessToken,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p) => auth0Client && auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth0Client && auth0Client.loginWithRedirect(...p),
        logout: (...p) => onLogout(...p),
      }}
    >
      {children}
    </AuthProvider>
  );
};

Auth0Provider.propTypes = {
  children: PropTypes.node.isRequired,
  onSuccessfulLogin: PropTypes.func.isRequired,
  auth0config: PropTypes.objectOf({
    client_id: PropTypes.string,
    domain: PropTypes.string,
    audience: PropTypes.string,
    scope: PropTypes.string,
    redirect_uri: PropTypes.string,
    response_type: PropTypes.string,
    leeway: PropTypes.number,
  }).isRequired,
};

export default Auth0Provider;
