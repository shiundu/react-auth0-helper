// @flow

import * as React from 'react';
import { Auth0Context } from './auth0Context';


export type WithAuth0 = {
  auth: {
    isAuthenticated: boolean,
    user: any,
    loading: boolean,
    handleRedirectCallback: () => void,
    getTokenSilently: () => void,
    getIdTokenClaims: () => void,
    loginWithRedirect: () => void,
    logout: () => void
  }
};

// eslint-disable-next-line space-before-function-paren
function withAuth0<Config: { auth: WithAuth0 }> (
  Component: React.AbstractComponent < Config >,
): React.AbstractComponent < Config > {
  return class WrappedComponent extends React.PureComponent<Config> {
    render() {
      return (
        <Auth0Context.Consumer>
          {(value) => <Component props={this.props} auth={value} />}
        </Auth0Context.Consumer>
      );
    }
  };
}

export default withAuth0;
