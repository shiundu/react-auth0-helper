const JWT_DECODE = require('jwt_decode');

export const userSetup = (token: string, user: any, namespace: string) => {
  if (namespace) {
    const decodedToken = JWT_DECODE(token);
    const userMetadata = decodedToken[`${namespace}user_metadata`];
    return {
      user,
      ...userMetadata,
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
