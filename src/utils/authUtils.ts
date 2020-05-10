import * as JWT_DECODE from 'jwt-decode';

export const userSetup = (token: string, user: any, namespace: string) => {
  if (namespace) {
    const decodedToken = JWT_DECODE(token);
    const userMetadata = decodedToken[`${namespace}user_metadata`];
    const appMetadata = decodedToken[`${namespace}app_metadata`];
    return {
      ...user,
      ...userMetadata,
      ...appMetadata
    };
  }
  else {
    return user;
  }
};

export const onRedirectCallback = (appState: any) => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname,
  );
};
