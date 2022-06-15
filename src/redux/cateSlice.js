import { createSlice } from "@reduxjs/toolkit";

const cateSlice = createSlice({
  name: "cate",
  initialState: [],
  reducers: {
    getCate: () => {},

    getCateSuccess: (state, action) => {
      return (state = action.payload);
    },

    addCate: () => {},

    addCateSuccess: (state, action) => {
        state.push(action.payload)
    },

    updateCate: () => {},

    updateCateSuccess: (state, action) => {
      state[action.payload.id - 1] = { ...action.payload };
    },

    removeCate: () => {},

    removeCateSuccess: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },

    searchCate: () => {},

    searchCateSuccess: (state, action) => {
        return state = action.payload
    }
  },
});

const { actions, reducer } = cateSlice;
export const { getCate, getCateSuccess,addCate, addCateSuccess, updateCate, updateCateSuccess, removeCate, removeCateSuccess, searchCate, searchCateSuccess } = actions;
export default reducer;
