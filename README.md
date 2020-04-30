# React Auth0 Authentication helper

## with @auth0/auth0-spa-js

## Note :-

- make sure you have the enviroment variables listed below in your **.env** file or in a config file. If you have the configs in your **.env** you dont need to pass them in your provider.

  - REACT_APP_AUTH0_CLIENT_ID,
  - REACT_APP_AUTH0_DOMAIN,
  - REACT_APP_AUTH0_REDIRECT_URI,  
    defaults:

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

index

      import React from "react";
      import ReactDOM from "react-dom";
      import App from "./App";
      import * as serviceWorker from "./serviceWorker";
      import { Auth0Provider } from "react-auth0-helper";
      import config from "./auth_config.json";

      // A function that routes the user to the right place
      // after login
      const onSuccessfulLogin = (user) => {
          console.info(user)
      };

      const auth0config = {
        client_id: clientEnv.AUTH0_CLIENT_ID,
        domain: clientEnv.AUTH0_DOMAIN,
        redirectUri: clientEnv.AUTH0_DOMAIN,
      }

      ReactDOM.render(
        <Auth0Provider
          onSuccessfulLogin={onSuccessfulLogin}>
          config={auth0config}
          forceAuth={false} // default is true, change to false if users should access even without loging in
      <App />

      </Auth0Provider>,
        document.getElementById("root")
      );

      serviceWorker.unregister();

App

    import React from "react";
    import NavBar from "./components/NavBar";
    import { withAuth0 } from "./react-auth0-helper";

    class App extends React.PureComponent () {
      const { loading } = this.props;

      if (loading) {
        return (
          <div>Loading...</div>
        );
      }

      return (
        <div className="App">
          <header>
            <NavBar />
          </header>
        </div>
      );
    }

    export default withAuth0()(App)

(AuthO)[https://auth0.com/docs/quickstart/spa/react/01-login]
