# Authentication provider

## with @auth0/auth0-spa-js

## Note :-

- Make sure you have the latest update of frontend-modules.
- make sure you have the enviroment variables listed below in your **.env** file  
   - REACT_APP_AUTH0_CLIENT_ID,  
   - REACT_APP_AUTH0_DOMAIN,  
   - REACT_APP_AUTH0_AUDIENCE,  
   - REACT_APP_AUTH0_SCOPE,  
   - REACT_APP_AUTH0_CALLBACK_URL,
- available props

        auth {
            isAuthenticated: boolean;
            user: {
                token: string;
                userId: string;
                companyId: string;
            };
            loading: boolean;
            handleRedirectCallback: () => void;
            getTokenSilently: () => void;
            getIdTokenClaims: () => void;
            loginWithRedirect: () => void;
            logout: () => void;
        }
