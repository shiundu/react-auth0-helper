import * as React from 'react';
import { Auth0Context } from './auth0Context';

// eslint-disable-next-line space-before-function-paren
function withAuth0(Component) {
  return class WrappedComponent extends React.PureComponent {
    render() {
      return React.createElement(Auth0Context.Consumer, null, value => React.createElement(Component, {
        props: this.props,
        auth: value
      }));
    }

  };
}

export default withAuth0;