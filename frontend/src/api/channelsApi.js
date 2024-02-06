import { createApi } from '@reduxjs/toolkit/query/react';

import serverRoutes from '../utils/routes';
import baseQueryWithHeaders from './baseQuery';

export const channels = createApi({
  reducerPath: 'channelsApi',
  baseQuery: baseQueryWithHeaders(),
  tagTypes: ['Channels', 'Messages'],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => ({
        url: serverRoutes.CHANNELS,
      }),
      providesTags: ['Channels'],
    }),
    addChannel: builder.mutation({
      query: (data) => ({
        url: serverRoutes.CHANNELS,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Channels'],
    }),
    editChannel: builder.mutation({
      query: ({ data, id }) => ({
        url: [serverRoutes.CHANNELS, id].join('/'),
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Channels'],
    }),
    removeChannel: builder.mutation({
      query: ({ id }) => ({
        url: [serverRoutes.CHANNELS, id].join('/'),
        method: 'DELETE',
      }),
      invalidatesTags: ['Channels', 'Messages'],
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
