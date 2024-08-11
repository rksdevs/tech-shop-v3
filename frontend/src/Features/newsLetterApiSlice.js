import { NEWSLETTER_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const newsLetterApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        subscribeToNewsLetter: builder.mutation({
            query: (data)=>({
                url:`${NEWSLETTER_URL}/subscribe`,
                method: 'POST',
                body: data
            })
        }),
        deleteOneSubscriber: builder.mutation({
            query: (data)=>({
                url:`${NEWSLETTER_URL}/unsubscribe`,
                method: 'DELETE',
                body: data
            })
        }),
        getAllSubscribers: builder.query({
            query: ()=>({
                url:`${NEWSLETTER_URL}/subscribers`,
                method: 'GET',
            })
        }),
        sendOffersToSubscribers: builder.mutation({
            query: (data)=>({
                url:`${NEWSLETTER_URL}/send-offers`,
                method: 'POST',
                body: data,
            })
        }),
        sendProductToSubscribers: builder.mutation({
            query: (data)=>({
                url:`${NEWSLETTER_URL}/send-newProduct-offer`,
                method: 'POST',
                body: data,
            })
        }),
    })
})

export const {useSubscribeToNewsLetterMutation, useDeleteOneSubscriberMutation, useGetAllSubscribersQuery, useSendOffersToSubscribersMutation, useSendProductToSubscribersMutation} = newsLetterApiSlice;