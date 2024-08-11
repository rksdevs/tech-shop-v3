import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        login: builder.mutation({
            query: (data) =>({
                url: `${USERS_URL}/auth`,
                method: "POST",
                body: data
            }),
        }),
        register: builder.mutation({
            query: (data)=> ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data,
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST'
            }),
        }),
        profile: builder.query({
            query: () => ({
                url: `${USERS_URL}/profile`,
            }),
        }),
        getUsers: builder.query({
            query: ()=> ({
                url: USERS_URL,
            }),
            invalidatesTags: ['User'],
            keepUnusedDataFor: 5,
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                method: 'DELETE'
            })
        }),
        getUserDetails: builder.query({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`
            }),
            keepUnusedDataFor: 5,
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/${data.userId}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['User']
        }),
        updateUserProfile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['User']
        }),
        googleLogin: builder.mutation({
            query: () => ({
              url: `${USERS_URL}/google/callback`,
              headers: {
                "Access-Control-Allow-Origin": "*"
              },
              method: 'GET',
            }),
        }),
        validateUser: builder.mutation({
            query: (data) =>({
                url: `${USERS_URL}/forget-password/validate-email`,
                method: "POST",
                body: data
            }),
        }),
        otpGenerate: builder.mutation({
            query: (data) =>({
                url: `${USERS_URL}/forget-password/otp-generation`,
                method: "POST",
                body: data
            }),
        }),
        otpVerification: builder.mutation({
            query: (data) =>({
                url: `${USERS_URL}/forget-password/otp-verification`,
                method: "POST",
                body: data
            }),
        }),
        updatePassword: builder.mutation({
            query: (data) =>({
                url: `${USERS_URL}/forget-password/update-password`,
                method: "POST",
                body: data
            }),
        }),
    })
})

export const {useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileQuery, useGetUsersQuery, useDeleteUserMutation, useUpdateUserMutation, useGetUserDetailsQuery, useUpdateUserProfileMutation, useGoogleLoginMutation, useValidateUserMutation, useOtpGenerateMutation, useOtpVerificationMutation, useUpdatePasswordMutation} = usersApiSlice;