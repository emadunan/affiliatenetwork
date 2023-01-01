import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Campaign } from '@prisma/client'

// Define a service using a base URL and expected endpoints
export const campaignApi = createApi({
  reducerPath: 'campaignApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/campaigns' }),
  endpoints: (builder) => ({
    getAllCampaigns: builder.query<Campaign[], void>({
      query: () => `/`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllCampaignsQuery } = campaignApi;