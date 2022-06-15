import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        getProducts: () => {},

        getProductsSuccess: (state, action) => {
            return state = action.payload
        },

        updateProduct: () => {},

        updateProductSuccess: (state, action) => {
            state[action.payload.id - 1] = {...action.payload}
        },

        removeProduct: () => {},

        removeProductSuccess: (state, action) => {
            return state.filter(product => product.id !== action.payload.id)
        }
    }
})

const {actions, reducer} = productSlice

export const {getProducts, getProductsSuccess, updateProduct, updateProductSuccess, removeProduct, removeProductSuccess} = actions
export default reducer