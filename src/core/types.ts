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
  client_id: string;
  returnTo: string;
};

export type LogoutProps = {
  options?: logoutType;
  federated?: string;
};

export type WithAuth0Props = {
  isLoading: boolean | undefined;
  isAuthenticated: boolean;
  logout: (logoutProps?: LogoutProps) => void;
  user: any;
  accessToken: string;
  handleRedirectCallback: () => void;
  login: () => void,
};
