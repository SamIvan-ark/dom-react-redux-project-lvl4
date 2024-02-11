import * as Api from './ApiProvider';
import * as Auth from './AuthProvider';
import ConditionalRollbarProvider from './ConditionalRollbarProvider';

export const hooks = {
  useAuth: Auth.useAuth,
  useApi: Api.useApi,
};

export const providers = {
  AuthProvider: Auth.AuthProvider,
  ApiProvider: Api.ApiProvider,
  ConditionalRollbarProvider,
};
