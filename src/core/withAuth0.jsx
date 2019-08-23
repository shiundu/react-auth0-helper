/* eslint-disable react/jsx-props-no-spreading */
// @flow

import * as React from 'react';
import { Auth0Context } from './auth0Context';


export type WithAuth0 = {
  isAuthenticated: boolean,
  user: any,
  loading: boolean,
  handleRedirectCallback: () => void,
  getTokenSilently: () => void,
  getIdTokenClaims: () => void,
  loginWithRedirect: () => void,
  logout: () => void
};

// eslint-disable-next-line space-before-function-paren
function withAuth0<Config>(
  Component: React.AbstractComponent<{|...Config, ...WithAuth0 |}>,
): React.AbstractComponent < Config > {
  return function WrappedComponent(props: Config) {
    return (
      <Auth0Context.Consumer>
        {(value) => <Component {...props} auth={value} />}
      </Auth0Context.Consumer>
    );
  };
}

export default withAuth0;
