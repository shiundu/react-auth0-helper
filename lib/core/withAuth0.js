function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { Auth0Context } from './auth0Context';

// eslint-disable-next-line space-before-function-paren
function withAuth0(Component) {
  return function WrappedComponent(props) {
    return React.createElement(Auth0Context.Consumer, null, value => React.createElement(Component, _extends({}, props, {
      auth: value
    })));
  };
}

export default withAuth0;