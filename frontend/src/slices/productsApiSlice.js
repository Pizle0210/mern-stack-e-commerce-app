import { PRODUCTS_URL } from "../store/constants";
import { apiSlice } from "./apiSlice";

export const productsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({ url: PRODUCTS_URL }),
      keepUnusedDataFor: 5,
    }),
    getProductsDetails: builder.query({
      query: (productId) => ({ url: `${PRODUCTS_URL}/${productId}` }),
      keepUnusedDataFor: 5,
    }),
    createProduct:builder.mutation({
      query:()=>({
        url:PRODUCTS_URL,
        method:'POST'
      }),
      invalidatesTags:['Product'],
    }),
    updateProduct:builder.mutation({
      query:(data)=>({
        url:`${PRODUCTS_URL}/${data._id}`,
        method:'PUT',
        body:data,
      }),
      invalidatesTags:['Product']
    }),
  }),
});

export const { useGetProductsQuery, useGetProductsDetailsQuery,useCreateProductMutation,useUpdateProductMutation } =
  productsSlice;
