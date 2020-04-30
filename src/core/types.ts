
export type ConfigProps = {
  client_id: string;
  domain: string;
  redirect_uri: string;
};

export declare type Auth0Props = {
  isLoading: boolean | undefined;
  isAuthenticated: boolean;
  logout: () => void;
  user: any;
  accessToken: string;
  handleRedirectCallback: () => void;
};