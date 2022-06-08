import axios from "axios";
import { call, delay, put, takeLatest, select } from "redux-saga/effects";
import { v4 as uuid } from "uuid";

import { getProductsSuccess } from "./productSlice";
import { getCateSuccess } from "./cateSlice";
import { getListUserSuccess, setUser, updateUserSuccess } from "./userSlice";
import { toast } from "react-toastify";
import { postOrderSucces } from "./orderSlice";
import { clearCart } from "./cartSlice";

function* workGetProducts() {
  yield delay(1000);
  try {
    const products = yield call(() =>
      axios.get(`${import.meta.env.VITE_PRODUCTS}`)
    );
    if (products.status === 200) yield put(getProductsSuccess(products.data));
  } catch (e) {
    toast.error(`Fail to fetch`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    console.log(e);
  }
}

function* workGetCate() {
  yield delay(1000);
  try {
    const cate = yield call(() => axios.get(`${import.meta.env.VITE_CATE}`));
    if (cate.status === 200) yield put(getCateSuccess(cate.data));
  } catch (e) {
    toast.error(`Fail to fetch`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    console.log(e);
  }
}

function* workGetListUser(action) {
  yield delay(1000);

  try {
    const users = yield call(() => axios.get(`${import.meta.env.VITE_USER}`));
    if (users.status === 200) yield put(getListUserSuccess(users.data));
  } catch (e) {
    toast.error(`Fail to fetch`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    console.log(e);
  }
}

function* workCreateUser(action) {
  yield delay(1000);

  const formSignUp = {
    ...action.payload,
    name: "",
    userId: uuid(),
  };

  try {
    const user = yield call(() =>
      axios.post(`${import.meta.env.VITE_USER}`, formSignUp)
    );
    if (user.status === 201) yield put(setUser(user.data));
  } catch (e) {
    toast.error(`Fail to post`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    console.log(e);
  }
}

function* workUpdateUser(action) {
  const state = yield select();
  const user = state.user.user;

  let formUpdate;
  if (action.payload.newPassword === "") {
    formUpdate = {
      ...user,
      name: action.payload.name,
      address: action.payload.address,
    };
  } else {
    formUpdate = {
      ...user,
      password: action.payload.newPassword,
      name: action.payload.name,
      address: action.payload.address,
    };
  }

  try {
    const newUser = yield axios.put(
      `${import.meta.env.VITE_USER}/${user.id}`,
      formUpdate
    );
    toast.success(`Change Successfully!!!`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    if (newUser.status === 200) yield put(updateUserSuccess(newUser.data));
  } catch (e) {
    toast.error(`Fail to change your's info`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    console.log(e);
  }
}

function* workPostOrder(action) {
  yield delay(1000)

  const today = new Date()
  const date = today.getFullYear()+'/'+`0${(today.getMonth()+1)}`.slice(-2)+'/'+`0${today.getDate()}`.slice(-2);
  const time = `0${today.getHours()}`.slice(-2) + ":" + `0${today.getMinutes()}`.slice(-2) + ":" + `0${today.getSeconds()}`.slice(-2);
  const dateTime = date + ' ' + time

  const formOrder = {
    ...action.payload,
    orderId: uuid(),
    dateTime
  }

  try {
    const order = yield axios.post(`${import.meta.env.VITE_ORDER}`, formOrder)
    yield put(postOrderSucces(order.data))
    yield put(clearCart())
  } catch (e) {
    toast.error(`Fail to checkout`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    console.log(e);
  }
}

function* saga() {
  yield takeLatest("products/getProducts", workGetProducts);

  yield takeLatest("cate/getCate", workGetCate);

  yield takeLatest("user/getListUser", workGetListUser);
  yield takeLatest("user/createUser", workCreateUser);
  yield takeLatest("user/updateUser", workUpdateUser);

  yield takeLatest("order/postOrder", workPostOrder);
}

export default saga;
