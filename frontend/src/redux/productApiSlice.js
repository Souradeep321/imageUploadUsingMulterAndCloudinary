import { createApi } from "@reduxjs/toolkit/query/react"

export const productApiSlice = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/v1",
    }),
    tagTypes: ["Product"],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => "/products",
            providesTags: ["Product"],
        }),
        createProduts: builder.mutation({
            query: (data) => ({
                url: "/products",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Product"],
            async openQueryFulfilled(product, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    productApiSlice.util.updateQueryData(
                        "getProducts",
                        undefined,
                        (draft) => {
                            draft.push(product)
                        }
                    )
                )
                try {
                    await queryFulfilled
                } catch (error) {
                    console.log(error)
                }
            }
        })
    }),
})