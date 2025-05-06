import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1/products' }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        fetchProducts: builder.query({
            query: () => '/',
            providesTags: ['Product']
        }),
        createProducts: builder.mutation({
            query: (product) => ({
                url: '/',
                method: 'POST',
                body: product,
            }),
            invalidatesTags: ['Product'],
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const patchResult = dispatch(
                    productApi.util.updateQueryData('fetchProducts', undefined, (draft) => {
                        draft.push(arg)
                    })
                )
                try {
                    await queryFulfilled
                } catch (error) {
                    patchResult.undo()
                }
            }
        }),
        deleteProducts: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const patchResult = dispatch(
                    productApi.util.updateQueryData('fetchProducts', undefined, (draft) => {
                        const findIndex = draft.findIndex((product) => product._id === arg)
                        draft.splice(findIndex, 1)
                    })
                )
                try {
                    await queryFulfilled
                } catch (error) {
                    patchResult.undo()
                }
            }
        }),
    }),
})

export const { useFetchProductsQuery, useCreateProductsMutation, useDeleteProductsMutation } = productApi