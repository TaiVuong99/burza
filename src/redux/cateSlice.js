import { createSlice } from "@reduxjs/toolkit";

const cateSlice = createSlice({
    name: 'cate',
    initialState: [],
    reducers: {
        getCate: () => {},
        getCateSuccess: (state, action) => {
            return state = action.payload
        }
    }
})

const {actions, reducer} = cateSlice
export const {getCate, getCateSuccess} = actions
export default reducer