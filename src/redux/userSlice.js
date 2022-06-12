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
        state.users.push(action.payload)
        state.user = action.payload
    },

    userLogin: (state, action) => {
        state.user = action.payload
        state.isLogin = true
    },

    updateUser: () => {},

    updateUserSuccess: (state, action) => {
        state.user = action.payload
    },

    signOutUser: (state) => {
      state.user = {}
      state.isLogin = false
    }
  },
});

const { actions, reducer } = userSlice;
export const { getListUser, getListUserSuccess, createUser, setUser, userLogin, updateUser, updateUserSuccess, signOutUser } = actions;
export default reducer;
