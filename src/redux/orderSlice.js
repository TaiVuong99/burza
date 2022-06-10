import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: [],
  reducers: {
    getOrder: () => {}, 

    getOrderSuccess: (state, action) => {
      return state = action.payload
    },

    postOrder: () => {
      
    },

    postOrderSucces: (state, action) => {
      return state = action.payload
    },

    cancelOrder: () => {},

    cancelOrderSuccess: (state, action) => {
      let index = state.findIndex(order => order.id === action.payload.id)

      state[index] = {
        ...action.payload
      }
    }
  },
});

const { actions, reducer } = orderSlice;
export const { getOrder, getOrderSuccess, postOrder, postOrderSucces, cancelOrder, cancelOrderSuccess } = actions;
export default reducer;
