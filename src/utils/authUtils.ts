import * as JWT_DECODE from 'jwt-decode';
const withoutEndingSlash = (str: string) => str.replace(/\/$/, '');

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

export const storeOriginalRequest = (clientId: string) => {
  const fullUrl = withoutEndingSlash(window.location.href);
  const baseUrl = withoutEndingSlash(window.location.origin);

  if (!window.localStorage) {
    return;
  }

  const redirectKey = `${clientId}_shouldRedirectTo`;

  if (fullUrl !== baseUrl && !window.localStorage.getItem(redirectKey)) {
    window.localStorage.setItem(redirectKey, fullUrl);
  }
};

export const doStoredRequest = (clientId: string) => {
  if (!window.localStorage) {
    return;
  }

  const redirectKey = `${clientId}_shouldRedirectTo`;
  const url = window.localStorage.getItem(redirectKey);

  if (url) {
    window.localStorage.removeItem(redirectKey);
    window.location.href = url;
  }
};