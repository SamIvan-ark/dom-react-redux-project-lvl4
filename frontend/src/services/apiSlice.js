import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import serverRoutes from '../utils/routes';

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({ baseUrl: serverRoutes.BASE_URL }),
  endpoints: (builder) => ({
    getData: builder.query({
      query: (authHeaders) => ({
        url: serverRoutes.GET_DATA,
        headers: authHeaders,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: serverRoutes.LOGIN,
        method: 'POST',
        body: credentials,
      }),
    }),
    signupUser: builder.mutation({
      query: (credentials) => ({
        url: serverRoutes.SIGNUP,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const {
  useGetDataQuery,
  useLoginUserMutation,
  useSignupUserMutation,
} = chatApi;
