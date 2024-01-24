import { createApi } from '@reduxjs/toolkit/query/react';

import serverRoutes from '../utils/routes';
import baseQueryWithHeaders from './baseQuery';

export const channels = createApi({
  reducerPath: 'channels',
  baseQuery: baseQueryWithHeaders(),
  tagTypes: ['Channels'],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => ({
        url: serverRoutes.GET_CHANNELS,
      }),
    }),
  }),
});

export const {
  useGetChannelsQuery,
} = channels;

export default channels;
