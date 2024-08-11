import { apiSlice } from "./apiSlice";
import { PRODUCTS_URL, UPLOAD_URL } from "../constants";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        getProducts: builder.query({
            query: ({keyword, pageNumber}) =>({
                url: PRODUCTS_URL,
                params: { keyword, pageNumber,}
            }),
            providesTags: ['Product'],
            keepUnusedDataFor: 5
        }),
        getProductDetails: builder.query({
            query: (productId)=>({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCTS_URL,
                method: 'POST'
            }),
            invalidatesTags: ['Product']
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Product'],
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
                // url: 'api/upload',
                url: UPLOAD_URL,
                method: 'POST',
                body: data,
            }),
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: 'DELETE',
            })
        }),
        getProductsByCategory: builder.query({
            query: (category) =>({
                url: `${PRODUCTS_URL}/category/${category}`,
            }),
            providesTags: ['Product'],
            keepUnusedDataFor: 5
        }),
        updateProductStock: builder.mutation({
            query: (order) => ({
                url: `${PRODUCTS_URL}/updateProductStock`,
                method: 'POST',
                body: {...order}
            }),
            invalidatesTags: ['Product']
        }),
        createProductReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}/reviews`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Product'],
        }),
        getTopProducts: builder.query({
            query: ()=> ({
                url: `${PRODUCTS_URL}/topProducts`,
            }),
            keepUnusedDataFor: 5,
        }),
        getAllCategories: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/allCategories`,
            }),
            keepUnusedDataFor: 5
        }),
        getAllBrands: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/allBrands`,
            }),
            keepUnusedDataFor: 5
        }),
        getLatestProducts: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/latestProducts`,
            }),
            keepUnusedDataFor: 5,
        }),
        filteredProductList: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/products/filteredProducts`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags:['Products'],
            keepUnusedDataFor: 5
        }),
        getAllProductsAdmin: builder.query({
            query: () =>({
                url: `${PRODUCTS_URL}/allProductsAdmin`,
            }),
            providesTags: ['Product'],
            keepUnusedDataFor: 5
        }),
        getProductFeatures: builder.query({
            query: (productId) =>({
                url: `${PRODUCTS_URL}/product/features/${productId}`,
            }),
            keepUnusedDataFor: 5
        }),
        getProductsByBrand: builder.query({
            query: (brand) =>({
                url: `${PRODUCTS_URL}/brand/${brand}`,
            }),
            providesTags: ['Product'],
            keepUnusedDataFor: 5
        }),
        getProductsByCategoryWithoutPage: builder.query({
            query: (category) =>({
                url: `${PRODUCTS_URL}/productWithoutPage/${category}`,
            }),
            providesTags: ['Product'],
            keepUnusedDataFor: 5
        }),
        uploadImage: builder.mutation({
            query:(data) => ({
                url: `${PRODUCTS_URL}/uploadImg`,
                method: 'POST',
                body: data
            })
        }),
        deleteReview: builder.mutation({
            query:(data) => ({
                url: `${PRODUCTS_URL}/product/delete-review`,
                method: 'POST',
                body: data
            })
        }),
        searchProducts: builder.mutation({
            query: (data) =>({
                url: `${PRODUCTS_URL}/search/product`,
                method: 'POST',
                body: data
            }),
            providesTags: ['Product'],
            keepUnusedDataFor: 5
        }),
        getProductsByOffername: builder.query({
            query: (offerId) =>({
                url: `${PRODUCTS_URL}/productsByOffername/${offerId}`,
            }),
            providesTags: ['Product'],
            keepUnusedDataFor: 5
        }),
        getProductsOnDiscount: builder.query({
            query: () =>({
                url: `${PRODUCTS_URL}/productsOnDiscount`,
            }),
            providesTags: ['Product'],
            keepUnusedDataFor: 5
        }),
    })
})

export const {useGetProductsQuery, useGetProductsByBrandQuery, useGetProductDetailsQuery, useCreateProductMutation, useUpdateProductMutation, useUploadProductImageMutation, useDeleteProductMutation, useGetProductsByCategoryQuery, useUpdateProductStockMutation, useCreateProductReviewMutation, useGetTopProductsQuery, useGetAllCategoriesQuery, useGetAllBrandsQuery, useGetLatestProductsQuery, useFilteredProductListMutation, useGetAllProductsAdminQuery, useGetProductFeaturesQuery, useGetProductsByCategoryWithoutPageQuery, useUploadImageMutation, useDeleteReviewMutation, useSearchProductsMutation, useGetProductsByOffernameQuery, useGetProductsOnDiscountQuery} = productApiSlice;