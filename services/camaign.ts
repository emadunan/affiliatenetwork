import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CampaignWithUser } from '@prisma/client/scalar';

// Define a service using a base URL and expected endpoints
export const campaignApi = createApi({
  reducerPath: 'campaignApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/campaigns' }),
  tagTypes: ["Requested"],
  endpoints: (builder) => ({
    getAllCampaigns: builder.query<CampaignWithUser[], void>({
      query: () => `/`,
      providesTags: ["Requested"]
    }),
    getUserCampaigns: builder.query<any, string>({
      query: (id) => `/${id}`
    }),
    makeCampaignRequest: builder.mutation<void, { userId: string | undefined, campaignId: string }>({
      query: (payload) => ({
        url: `/`,
        method: "PUT",
        body: payload,
        headers: {
          "Content-Type": "application/json"
        }
      }),
      invalidatesTags: ["Requested"]
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllCampaignsQuery, useMakeCampaignRequestMutation } = campaignApi;