import { apiSlice } from "./apiSlice";
import { SHIPROCKET_URL } from "../constants";
const shipRocketApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createShiprocketOrder: builder.mutation({
            query: (data) => ({
                url: `${SHIPROCKET_URL}/order/create`,
                method: 'POST',
                body: data
            })
        }),
        cancelShiprocketOrder: builder.mutation({
            query: (data) => ({
                url: `${SHIPROCKET_URL}/order/cancel`,
                method: 'POST',
                body: data
            })
        }),
    })
})

export const {useCreateShiprocketOrderMutation, useCancelShiprocketOrderMutation} = shipRocketApiSlice 