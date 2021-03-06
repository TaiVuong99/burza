import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: [],
  reducers: {
    getOrder: () => {},

    getOrderSuccess: (state, action) => {
      return (state = action.payload);
    },

    getListOrder: () => {},

    getListOrderSuccess: (state, action) => {
      return (state = action.payload);
    },

    postOrder: () => {},

    completeOrder: () => {},

    completeOrderSuccess: (state, action) => {
      let index = state.findIndex((order) => order.id === action.payload.id);

      state[index] = {
        ...action.payload,
      };
    },

    cancelOrder: () => {},

    cancelOrderSuccess: (state, action) => {
      let index = state.findIndex((order) => order.id === action.payload.id);

      state[index] = {
        ...action.payload,
      };
    },

    searchOrder: () => {},

    searchOrderSuccess: (state, action) => {
        return state = action.payload
    }
  },
});

const { actions, reducer } = orderSlice;
export const {
  getOrder,
  getOrderSuccess,
  getListOrder,
  getListOrderSuccess,
  postOrder,
  completeOrder,
  completeOrderSuccess,
  cancelOrder,
  cancelOrderSuccess,
  searchOrder,
  searchOrderSuccess
} = actions;
export default reducer;
