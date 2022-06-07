import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    user: {},
    isLogin: false,
  },
  reducers: {
    getListUser: () => {},

    getListUserSuccess: (state, action) => {
        state.users = action.payload
    },

    createUser: () => {},

    setUser: (state, action) => {
        state.user = action.payload
    },

    userLogin: (state, action) => {
        state.user = action.payload
        state.isLogin = true
    }
  },
});

const { actions, reducer } = userSlice;
export const { getListUser, getListUserSuccess, createUser, setUser, userLogin } = actions;
export default reducer;
