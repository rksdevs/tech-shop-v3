import { apiSlice } from "./apiSlice";
import { PREBUILTPC_URL } from "../constants";

export const pcConfigureApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createNewPrebuiltPc: builder.mutation({
            query: (data) => ({
                url: `${PREBUILTPC_URL}/configure/create`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['PrebuiltPc']
        }),
        getAllPrebuiltPcs: builder.query({
            query: () => ({
                url: `${PREBUILTPC_URL}/configure/all`,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['PrebuiltPc'],
        }),
        getSpecificPrebuiltPc: builder.query({
            query: (prebuiltPcId) => ({
                url: `${PREBUILTPC_URL}/configure/one/${prebuiltPcId}`,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['PrebuiltPc'],
        }),
        updatePrebuiltPc: builder.mutation({
            query: (data) => ({
                url: `${PREBUILTPC_URL}/configure/update/${data.prebuiltPcId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags:['PrebuiltPc'],
        }),
        deletePrebuiltPc: builder.mutation({
            query: (pcId) => ({
                url: `${PREBUILTPC_URL}/configure/delete/${pcId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['PrebuiltPc']
        }),
        uploadPrebuiltPCImg: builder.mutation({
            query: (data) => ({
                url: `${PREBUILTPC_URL}/uploadPrebuiltPcImg`,
                method: 'POST',
                body: data
            }),
        }),
    })
})

export const {useUploadPrebuiltPCImgMutation, useCreateNewPrebuiltPcMutation, useDeletePrebuiltPcMutation, useGetAllPrebuiltPcsQuery, useGetSpecificPrebuiltPcQuery, useUpdatePrebuiltPcMutation} = pcConfigureApiSlice