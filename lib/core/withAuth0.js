function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import * as React from 'react';
import { Auth0Context } from './auth0Context';

function withAuth0(Component) {
  return class extends React.PureComponent {
    render() {
      return React.createElement(Auth0Context.Consumer, null, value => React.createElement(Component, _extends({}, this.props, {
        auth: value
      })));
    }

  };
}

withAuth0.propTypes = {
  Component: PropTypes.node
};
export default withAuth0;