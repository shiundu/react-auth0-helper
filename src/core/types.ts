
export type ConfigProps = {
  client_id: string;
  domain: string;
  redirectUri: string;
};

export declare type Auth0Props = {
  isLoading: boolean | undefined;
  isAuthenticated: boolean;
  logout: () => void;
  user: any;
  accessToken: string;
  handleRedirectCallback: () => void;
};