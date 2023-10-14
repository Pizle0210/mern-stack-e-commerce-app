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
    profile:builder.mutation({
      query:(data)=>({
        url:`${USERS_URL}/profile`,
        method:'PUT',
        body:data,
      }),
    })
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation,useProfileMutation } =
  usersSlice;
