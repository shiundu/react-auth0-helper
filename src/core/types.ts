
export type ConfigProps = {
  client_id: string;
  domain: string;
  redirect_uri: string;
  audience?: string
  scope?: string,
  state?: string,
  response_type?: string,
  ADDITIONAL_PARAMETERS?: any
};

export type logoutType = {
  client_id: string,
  returnTo: string,
}
export type logoutProps = {
  options?: logoutType,
  federated?: string,
}

export declare type Auth0Props = {
  isLoading: boolean | undefined;
  isAuthenticated: boolean;
  logout: (logoutProps?: logoutProps) => void;
  user: any;
  accessToken: string;
  handleRedirectCallback: () => void;
};