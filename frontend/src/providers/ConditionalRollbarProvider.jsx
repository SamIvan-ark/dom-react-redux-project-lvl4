import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_POST_CLIENT_TOKEN,
  environment: 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const ConditionalRollbarProvider = ({ children }) => {
  const isDev = process.env.NODE_ENV === 'development';
  return isDev ? (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </RollbarProvider>
  ) : children;
};

export default ConditionalRollbarProvider;
