import { createApi } from '@reduxjs/toolkit/query/react';

import serverRoutes from '../utils/routes';
import baseQueryWithHeaders from './baseQuery';

export const messages = createApi({
  reducerPath: 'messagesApi',
  baseQuery: baseQueryWithHeaders(),
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => ({
        url: serverRoutes.MESSAGES,
      }),
      providesTags: ['Messages'],
    }),
    addMessage: builder.mutation({
      query: (data) => ({
        url: serverRoutes.MESSAGES,
        method: 'POST',
        body: data,
      }),
    }),
    // editMessage: builder.mutation({
    //   query: ({ data, id }) => ({
    //     url: [serverRoutes.MESSAGES, id].join('/'),
    //     method: 'PATCH',
    //     body: data,
    //   }),
    //   invalidatesTags: ['Messages'],
    // }),
    // removeMessage: builder.mutation({
    //   query: ({ id }) => ({
    //     url: [serverRoutes.MESSAGES, id].join('/'),
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: ['Messages'],
    // }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  // useEditMessageMutation,
  // useRemoveMessageMutation,
} = messages;

export default messages;
