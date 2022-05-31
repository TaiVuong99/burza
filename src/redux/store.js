import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"
import cartSlice from "./cartSlice"
import cateSlice from "./cateSlice"
import productSlice from "./productSlice"
import saga from "./saga"

const sagaMiddleWare = createSagaMiddleware()

const store = configureStore({
    reducer: {
        products: productSlice,
        cate: cateSlice,
        cart: cartSlice
    },
    middleware: [sagaMiddleWare]
})

sagaMiddleWare.run(saga)

export default store