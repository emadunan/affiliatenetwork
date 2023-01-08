import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/admin' }),
  endpoints: (builder) => ({
    getPendingReqCount: builder.query<any, void>({
      query: () => `requests/count`
    })
  })
});

export const { useGetPendingReqCountQuery } = adminApi;