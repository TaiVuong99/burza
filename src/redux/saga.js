import axios from "axios";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { v4 as uuid } from "uuid"; 

import { getProductsSuccess } from "./productSlice";
import { getCateSuccess } from "./cateSlice";
import { getListUserSuccess, setUser } from "./userSlice";

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

function* workGetListUser(action) {
  yield delay(1000)

  try {
    const users = yield call(() => axios.get(`${import.meta.env.VITE_USER}`));
    if (users.status === 200) yield put(getListUserSuccess(users.data));
  } catch (e) {
    console.log(e);
  }
}

function* workCreateUser(action) {
  
  yield delay(1000);

  const formSignUp = {
    ...action.payload,
    name: '',
    userId: uuid(),
  }

  try {
    const user = yield call(() => axios.post(`${import.meta.env.VITE_USER}`, formSignUp))
    if(user.status === 201) yield put(setUser(user.data))
  } catch (e) {
    console.log(e)
  }
}

function* saga() {
  yield takeLatest("products/getProducts", workGetProducts);

  yield takeLatest("cate/getCate", workGetCate);

  yield takeLatest("user/getListUser", workGetListUser)
  yield takeLatest("user/createUser", workCreateUser)
}

export default saga;
