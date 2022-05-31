import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        getProducts: () => {},

        getProductsSuccess: (state, action) => {
            return state = action.payload
        }
    }
})

const {actions, reducer} = productSlice

export const {getProducts, getProductsSuccess} = actions
export default reducer