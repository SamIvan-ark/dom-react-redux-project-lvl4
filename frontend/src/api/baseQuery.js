import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import getAuthToken from '../utils/getAuthToken';
import serverRoutes from '../utils/routes';

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
