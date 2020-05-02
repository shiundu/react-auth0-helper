import * as React from 'react';
import { Auth0Context } from './auth0Context';
import { WithAuth0Props } from './types';

const withAuth0 = (Component: React.ReactType) => {
  const Child = ({ ...props }) => {
    return (<Auth0Context.Consumer>
      {(value: WithAuth0Props) => <Component {...props} auth={value} />}
    </Auth0Context.Consumer>
    );
  };
  return Child;
};

export default withAuth0;
