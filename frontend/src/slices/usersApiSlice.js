import { USERS_URL } from "../store/constants";
import { apiSlice } from "./apiSlice";

const usersSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: (credentials) => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
        body: credentials,
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),
    deleteUsers:builder.mutation({
      query:(userId)=>({
        url:`${USERS_URL}/${userId}`,
        method:'DELETE',
      }),
    }),
    getUserDetails:builder.query({
      query:(userId)=>({
        url:`${USERS_URL}/${userId}`,
      }),
      keepUnusedDataFor:5
    }),
    updateUser:builder.mutation({
      query:(data)=>({
        url:`${USERS_URL}/${data.userId}`,
        method:'PUT',
        body: data
      }),
      invalidatesTags:["Users"]
    })
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUsersMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation
} = usersSlice;
