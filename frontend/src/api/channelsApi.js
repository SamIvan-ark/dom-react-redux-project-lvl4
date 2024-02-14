import { createApi } from '@reduxjs/toolkit/query/react';

import serverRoutes from '../utils/routes';
import baseQueryWithHeaders from './baseQuery';
import messagesApi from './messagesApi';

export const channels = createApi({
  reducerPath: 'channelsApi',
  baseQuery: baseQueryWithHeaders(),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => ({
        url: serverRoutes.CHANNELS,
      }),
    }),
    addChannel: builder.mutation({
      query: (data) => ({
        url: serverRoutes.CHANNELS,
        method: 'POST',
        body: data,
      }),
    }),
    editChannel: builder.mutation({
      query: ({ data, id }) => ({
        url: [serverRoutes.CHANNELS, id].join('/'),
        method: 'PATCH',
        body: data,
      }),
    }),
    removeChannel: builder.mutation({
      query: ({ id }) => ({
        url: [serverRoutes.CHANNELS, id].join('/'),
        method: 'DELETE',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(messagesApi.util.invalidateTags(['Messages']));
      },
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useEditChannelMutation,
  useRemoveChannelMutation,
} = channels;

export default channels;
