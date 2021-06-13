import 'reflect-metadata';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ClientContextProvider } from 'react-fetching-library';
import { Auth0Provider } from '@auth0/auth0-react';

import { App } from './app/app';
import { apiClient } from './app/apiClient';
import { InternalError } from './app/features/error/500';

ReactDOM.render(
  <StrictMode>
    <Auth0Provider
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      domain={process.env.NX_AUTH0_DOMAIN!}
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      clientId={process.env.NX_AUTH0_CLIENT_ID!}
      redirectUri={window.location.origin}
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      audience={process.env.NX_API_IDENTIFIER!}
    >
      <ClientContextProvider client={apiClient}>
        <App />
      </ClientContextProvider>
    </Auth0Provider>
  </StrictMode>,
  document.getElementById('root')
);
