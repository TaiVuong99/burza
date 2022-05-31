import axios from "axios";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { getProductsSuccess } from "./productSlice";
import { getCateSuccess } from "./cateSlice";

function* workGetProducts() {
  yield delay(1000);
  try {
    const products = yield call(() => axios.get(`${import.meta.env.VITE_PRODUCTS}`));
    if (products.status === 200) yield put(getProductsSuccess(products.data));
  } catch (e) {
    console.log(e);
  }
}

function* workGetCate() {
    yield delay(1000);
    try {
      const cate = yield call(() => axios.get(`${import.meta.env.VITE_CATE}`));
      if (cate.status === 200) yield put(getCateSuccess(cate.data));
    } catch (e) {
      console.log(e);
    }
}

function* saga() {
  yield takeLatest("products/getProducts", workGetProducts);
  yield takeLatest("cate/getCate", workGetCate);
}

export default saga;
