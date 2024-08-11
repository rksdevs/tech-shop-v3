import { apiSlice } from "./apiSlice";
import { OFFERS_URL } from "../constants";

const offersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=> ({
        createOffer: builder.mutation({
            query: (data)=> ({
                url: `${OFFERS_URL}/createOffer`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Offer'],
        }),
        getAllOffers: builder.query({
            query: () => ({
                url: `${OFFERS_URL}/allOffers`,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Offer'],
        }),
        updateOffer: builder.mutation({
            query: (data) => ({
                url: `${OFFERS_URL}/updateOffer/${data.offerId}`,
                method: 'PUT',
                body: {offerName: data.offerName, offerDiscount: data.offerDiscount, status: data.status, offerId: data.offerId, offerHeading : data.offerHeading, offerTagline: data.offerTagline, offerImage: data.offerImage}
            }),
            invalidatesTags: ['Offer']
        }),
        deleteOffer: builder.mutation({
            query: (offerId) => ({
                url: `${OFFERS_URL}/${offerId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Offer']
        }),
        applyOffer: builder.mutation({
            query: (data) => ({
                url: `${OFFERS_URL}/applyOffer`,
                method: 'POST',
                body: data
            })
        }),
        uploadOfferImage: builder.mutation({
            query:(data) => ({
                url: `${OFFERS_URL}/uploadOfferImg`,
                method: 'POST',
                body: data
            })
        }),
    })
})

export const {useCreateOfferMutation, useUploadOfferImageMutation, useGetAllOffersQuery, useApplyOfferMutation, useDeleteOfferMutation, useUpdateOfferMutation} = offersApiSlice