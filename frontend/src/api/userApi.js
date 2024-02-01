import { createApi } from '@reduxjs/toolkit/query/react';

import serverRoutes from '../utils/routes';
import baseQueryWithHeaders from './baseQuery';

export const user = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithHeaders(),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: serverRoutes.LOGIN,
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: serverRoutes.SIGNUP,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
} = user;

export default user;
