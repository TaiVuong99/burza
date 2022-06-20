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
      const clone = { ...state };

      clone.users = action.payload;

      return (state = { ...clone });
    },

    createUser: () => {},

    setUser: (state, action) => {
      state.users.push(action.payload);
      state.user = action.payload;
    },

    userLogin: (state, action) => {
      state.user = action.payload;
      state.isLogin = true;
    },

    updateUser: () => {},

    updateUserSuccess: (state, action) => {
      state.user = action.payload;
    },

    updateUserByAdmin: () => {},

    updateUserByAdminSuccess: (state, action) => {
      state.users[action.payload.id - 1] = action.payload;
    },

    signOutUser: (state) => {
      state.user = {};
      state.isLogin = false;
    },

    removeUser: () => {},

    removeUserSuccess: (state, action) => {
      const clone = { ...state };

      clone.users = clone.users.filter((item) => item.id !== action.payload.id);

      return (state = { ...clone });
    },

    searchUser: () => {},

    searchUserSuccess: (state, action) => {
      const clone = { ...state };

      clone.users = action.payload;
      return (state = { ...clone });
    },
  },
});

const { actions, reducer } = userSlice;
export const {
  getListUser,
  getListUserSuccess,
  createUser,
  setUser,
  userLogin,
  updateUser,
  updateUserSuccess,
  signOutUser,
  removeUser,
  removeUserSuccess,
  updateUserByAdmin,
  updateUserByAdminSuccess,
  searchUser,
  searchUserSuccess,
} = actions;
export default reducer;
