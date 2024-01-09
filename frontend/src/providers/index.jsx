import * as Auth from './AuthProvider';
import * as Api from './ApiProvider';

export const hooks = {
  useAuth: Auth.useAuth,
  useApi: Api.useApi,
};

export const providers = {
  AuthProvider: Auth.AuthProvider,
  ApiProvider: Api.ApiProvider,
};
