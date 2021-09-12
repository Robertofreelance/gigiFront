import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import ApolloProvider from "./ApolloProvider";

ReactDOM.render(
  <ApolloProvider />,
  document.getElementById("root")
);

serviceWorkerRegistration.register();