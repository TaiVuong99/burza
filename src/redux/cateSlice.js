import { createSlice } from "@reduxjs/toolkit";

const cateSlice = createSlice({
    name: 'cate',
    initialState: [],
    reducers: {
        getCate: () => {},
        getCateSuccess: (state, action) => {
            return state = action.payload
        },
        updateCate: (state, action) => {
            state[action.payload.id - 1] = {...action.payload}
        }
    }
})

const {actions, reducer} = cateSlice
export const {getCate, getCateSuccess, updateCate} = actions
export default reducer