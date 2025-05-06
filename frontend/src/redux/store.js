import { configureStore } from '@reduxjs/toolkit'
import { productApi } from './productApiSlice'
import cartSlice from './cartSlice'

export const store = configureStore({
    reducer: {
       [productApi.reducerPath]: productApi.reducer,
       cart: cartSlice
    },
    middleware: (getDefaultMiddleware) =>
        [
            ...getDefaultMiddleware(),
            productApi.middleware,
        ],
})