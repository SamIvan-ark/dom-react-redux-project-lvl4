import { createApi } from '@reduxjs/toolkit/query/react';

import serverRoutes from '../utils/routes';
import baseQueryWithHeaders from './baseQuery';

export const messages = createApi({
  reducerPath: 'messagesApi',
  baseQuery: baseQueryWithHeaders(),
  tagTypes: ['Channels'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => ({
        url: serverRoutes.MESSAGES,
      }),
      providesTags: ['Channels'],
    }),
    addMessage: builder.mutation({
      query: (data) => ({
        url: serverRoutes.MESSAGES,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Channels'],
    }),
    editMessage: builder.mutation({
      query: ({ data, id }) => ({
        url: [serverRoutes.MESSAGES, id].join('/'),
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Channels'],
    }),
    removeMessage: builder.mutation({
      query: ({ id }) => ({
        url: [serverRoutes.MESSAGES, id].join('/'),
        method: 'DELETE',
      }),
      invalidatesTags: ['Channels'],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useEditMessageMutation,
  useRemoveMessageMutation,
} = messages;

export default messages;
