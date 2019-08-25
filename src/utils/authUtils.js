export const getAuth0Config = () => {
  const checkEnv = (env, envName) => {
    if (!env) {
      throw new Error(`.env.${envName} variables required is required`);
    }
    return env;
  };

  return {
    client_id: checkEnv(
      process.env.REACT_APP_AUTH0_CLIENT_ID,
      'REACT_APP_AUTH0_CLIENT_ID',
    ),
    domain: checkEnv(
      process.env.REACT_APP_AUTH0_DOMAIN,
      'REACT_APP_AUTH0_DOMAIN',
    ),
    audience: checkEnv(
      process.env.REACT_APP_AUTH0_AUDIENCE,
      'REACT_APP_AUTH0_AUDIENCE',
    ),
    scope: checkEnv(process.env.REACT_APP_AUTH0_SCOPE, 'REACT_APP_AUTH0_SCOPE'),
    redirect_uri: checkEnv(
      process.env.REACT_APP_AUTH0_CALLBACK_URL,
      'REACT_APP_AUTH0_CALLBACK_URL',
    ),
    response_type:
      process.env.REACT_APP_AUTH0_RESPONSE_TYPE || 'id_token token',
    leeway: process.env.REACT_APP_AUTH0_LEEWAY || 40,
  };
};

export const flatten = (xx, aToken) => {
  const origObj = Object.keys(xx).map((key) => {
    if (typeof xx[key] === 'object') {
      return xx[key];
    }
    return {
      [key]: xx[key],
    };
  });
  const userObj = { token: aToken, ...origObj[0] };
  return userObj;
};

export const onRedirectCallback = (appState) => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname,
  );
};
