import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addCart: (state, action) => {
      let indexExist = state.findIndex(
        (product) =>
          product.productId === action.payload.productId &&
          product.cateId === action.payload.cateId
      );

      if (indexExist < 0) {
        state.push(action.payload);
      } else {
        state[indexExist] = {
          ...state[indexExist],
          quantity: state[indexExist].quantity + action.payload.quantity,
          notes: action.payload.notes,
        };
      }
    },

    updateCart: (state, action) => {
      let indexExist = state.findIndex(
        (product) =>
          product.productId === action.payload.productId &&
          product.cateId === action.payload.cateId
      );

      if (indexExist < 0) return;
      else {
        state[indexExist] = {
          ...state[indexExist],
          quantity: action.payload.quantity,
          notes: action.payload.notes,
        };
      }
    },

    deleteCart: (state, action) => {
      let indexRemove = state.findIndex(
        (product) =>
          product.productId === action.payload.productId &&
          product.cateId === action.payload.cateId
      );

     state.splice(indexRemove, 1)
    },

    clearCart: (state, action) => {
      return state = []
    }
  },
});

const { actions, reducer } = cartSlice;
export const { addCart, updateCart, deleteCart, clearCart } = actions;
export default reducer;
