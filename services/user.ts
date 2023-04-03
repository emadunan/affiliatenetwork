import { User } from "@prisma/client";
import { UserWithMeta } from "@prisma/client/scalar";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({baseUrl: '/api/users'}),
  tagTypes: ["UserCreated"],
  endpoints: (builder) => {
    return {
      getAllUsers: builder.query<UserWithMeta[], void>({
        query: () => "/",
      }),
      createUser: builder.mutation<User, Partial<User>>({
        query: (payload) => ({
          url: `/`,
          method: "POST",
          body: payload,
          headers: {
            "Content-Type": "application/json"
          }
        }),
        invalidatesTags: ["UserCreated"]
      })
    }
  }
});

export const {useGetAllUsersQuery} = userApi;