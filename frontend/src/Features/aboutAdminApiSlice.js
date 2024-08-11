import { apiSlice } from "./apiSlice";
import { ABOUT_ADMIN_URL } from "../constants";

const aboutAdminApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        updateAdminDetails: builder.mutation({
            query: (data) => ({
                url: `${ABOUT_ADMIN_URL}/aboutAdmin`,
                method: 'PUT',
                body: data
            })
        }),
        getAboutAdminDetails: builder.query({
          query: () => ({
            url: `${ABOUT_ADMIN_URL}/aboutAdmin`,
            method: 'GET'
          })  
        }),
        addInstaPosts: builder.mutation({
            query: ()=> ({
                url: `${ABOUT_ADMIN_URL}/aboutAdmin/instagramPosts`,
                method: 'POST',
            })
        }),
        deleteInstaPost: builder.mutation({
            query:(postId) => ({
                url: `${ABOUT_ADMIN_URL}/aboutAdmin/instagramPosts/${postId}`,
                method: 'DELETE'
            })
        }),
        uploadPostImage: builder.mutation({
            query:(data) => ({
                url: `${ABOUT_ADMIN_URL}/aboutAdmin/uploadPostImg`,
                method: 'POST',
                body: data
            })
        }),
        updateInstaPost: builder.mutation({
            query:(data) => ({
                url: `${ABOUT_ADMIN_URL}/aboutAdmin/instagramPosts/${data.postParamId}`,
                method: 'PUT',
                body: data.updateData,
            })
        }),
    })
})

export const {useAddInstaPostsMutation, useDeleteInstaPostMutation, useGetAboutAdminDetailsQuery, useUpdateAdminDetailsMutation, useUpdateInstaPostMutation, useUploadPostImageMutation,} = aboutAdminApiSlice;