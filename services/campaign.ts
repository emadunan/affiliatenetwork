import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CampaignWithUser, UserWithCampaigns } from '@prisma/client/scalar';

// Define a service using a base URL and expected endpoints
export const campaignApi = createApi({
  reducerPath: 'campaignApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/campaigns' }),
  tagTypes: ["Requested", "Approved", "Declined"],
  endpoints: (builder) => ({
    getAllCampaigns: builder.query<CampaignWithUser[], string>({
      query: (id: string) => `/all/${id}`,
      providesTags: ["Requested"]
    }),
    getUserCampaigns: builder.query<UserWithCampaigns, string | undefined>({
      query: (id) => `/${id}`,
      providesTags: ["Requested"]
    }),
    // Handle requests from specific user
    getUsersCampaignsReq: builder.query<any, void>({
      query: () => `/requests`,
      providesTags: ["Requested", "Approved", "Declined"],
    }),
    makeCampaignRequest: builder.mutation<void, { userId: string | undefined, campaignId: string }>({
      query: (payload) => {        
        return {
        url: `/all/${payload.userId}`,
        method: "PUT",
        body: payload,
        headers: {
          "Content-Type": "application/json"
        }
      }},
      invalidatesTags: ["Requested"]
    }),
    declinePendingReq: builder.mutation<void, any>({
      query: (payload) => ({
        url: `requests/decline`,
        method: "PUT",
        body: payload,
        headers: {
          "Content-Types": "application/json"
        },
      }),
      invalidatesTags: ["Declined"]
    }),
    approvePendingReq: builder.mutation<void, any>({
      query: (payload) => ({
        url: `requests/approve`,
        method: "PUT",
        body: payload,
        headers: {
          "Content-Types": "application/json"
        },
      }),
      invalidatesTags: ["Approved"]
    }),
    getPendingReqCount: builder.query<any, void>({
      query: () => `requests/count`,
      providesTags: ["Requested", "Approved", "Declined"],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllCampaignsQuery,
  useMakeCampaignRequestMutation,
  useGetUserCampaignsQuery,
  useGetUsersCampaignsReqQuery,
  useGetPendingReqCountQuery,
  useDeclinePendingReqMutation,
  useApprovePendingReqMutation,
} = campaignApi;