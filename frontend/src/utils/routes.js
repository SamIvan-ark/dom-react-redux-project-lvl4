const apiPath = '/api/v1';

export const serverRoutes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),
};

export const lala = 'jopa';
