import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { sessionExpiredOrLoggedOutKey } from '@/lib/sessionExpired';
import { getToken } from '@/lib/tokenStorage';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_ORIGIN,
  prepareHeaders: async (headers) => {
    const token = getToken();

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
  validateStatus(response) {
    if (response.status >= 200 && response.status <= 299) return true;
    if (response.status === 401) {
      window.dispatchEvent(new Event(sessionExpiredOrLoggedOutKey));
    }

    return false;
  },
  credentials: 'include',
});

// initialize an empty api service that we'll inject endpoints into later as needed
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: async (args, api, extraOptions) => {
    return baseQuery(args, api, extraOptions);
  },
  endpoints: () => ({}),
});
