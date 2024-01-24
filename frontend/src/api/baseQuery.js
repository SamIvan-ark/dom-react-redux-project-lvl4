import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import serverRoutes from '../utils/routes';
import getAuthToken from '../utils/getAuthToken';

const baseQuery = () => fetchBaseQuery({
  baseUrl: serverRoutes.BASE_URL,
  prepareHeaders: (headers) => {
    const token = getAuthToken();

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export default baseQuery;
