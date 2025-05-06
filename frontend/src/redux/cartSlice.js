import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
    },
    reducers: {
        addToCart: (state, action) => {
            state.products.push(action.payload)
        }
    }
})

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer