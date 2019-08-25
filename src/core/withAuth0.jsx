/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import * as React from 'react';
import { Auth0Context } from './auth0Context';

function withAuth0(Component) {
  return class extends React.PureComponent {
    render() {
      return (
        <Auth0Context.Consumer>
          {(value) => <Component {...this.props} auth={value} />}
        </Auth0Context.Consumer>
      );
    }
  };
}

withAuth0.propTypes = {
  Component: PropTypes.node,
};

export default withAuth0;
