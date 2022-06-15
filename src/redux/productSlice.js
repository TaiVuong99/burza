import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    getProducts: () => {},

    getProductsSuccess: (state, action) => {
      return (state = action.payload);
    },

    addProduct: () => {},

    addProductSuccess: (state, action) => {
        state.push(action.payload)
    },

    updateProduct: () => {},

    updateProductSuccess: (state, action) => {
      state[action.payload.id - 1] = { ...action.payload };
    },

    removeProduct: () => {},

    removeProductSuccess: (state, action) => {
      return state.filter((product) => product.id !== action.payload.id);
    },

    searchProduct: () => {},

    searchProductSuccess: (state, action) => {
        return state = action.payload
    }
  },
});

const { actions, reducer } = productSlice;

export const {
  getProducts,
  getProductsSuccess,
  addProduct,
  addProductSuccess,
  updateProduct,
  updateProductSuccess,
  removeProduct,
  removeProductSuccess,
  searchProduct,
  searchProductSuccess
} = actions;
export default reducer;
