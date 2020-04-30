import * as React from 'react';
import { Auth0Context } from './auth0Context';

export interface WithAuth0Props {
  Component: React.ReactNode;
  props: any;
}

export declare type Auth0Props = {
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => void;
  user: any;
  accessToken: string;
};

const withAuth0 = (Component: React.ReactType) => {
  const Child = ({ ...props }) => {
    return (<Auth0Context.Consumer>
      {(value: Auth0Props) => <Component {...props} auth={value} />}
    </Auth0Context.Consumer>
    );
  };
  return Child;
};

export default withAuth0;
