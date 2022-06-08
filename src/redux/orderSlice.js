import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {},
  reducers: {
    postOrder: () => {
      
    },

    postOrderSucces: (state, action) => {
      return state = action.payload
    },
  },
});

const { actions, reducer } = orderSlice;
export const { postOrder, postOrderSucces } = actions;
export default reducer;
