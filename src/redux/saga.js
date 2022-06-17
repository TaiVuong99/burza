import axios from "axios";
import { toast } from "react-toastify";
import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import { v4 as uuid } from "uuid";
import { clearCart } from "./cartSlice";
import { addCateSuccess, getCateSuccess, removeCateSuccess, searchCateSuccess, updateCateSuccess } from "./cateSlice";
import { cancelOrderSuccess, getOrderSuccess } from "./orderSlice";
import { addProductSuccess, getProductsSuccess, removeProductSuccess, searchProductSuccess, updateProductSuccess } from "./productSlice";
import { getListUserSuccess, removeUserSuccess, setUser, updateUserSuccess } from "./userSlice";

/*Products*/
function* workGetProducts() {
  yield delay(500);
  try {
    const products = yield call(() =>
      axios.get(`${import.meta.env.VITE_PRODUCTS}`)
    );
    if (products.status === 200) yield put(getProductsSuccess(products.data));
  } catch (e) {
    toast.error(`Fail to fetch list product`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}
function* workAddProduct(action) {
  yield delay(500);

  try {
    const product = yield call(() => axios.post(`${import.meta.env.VITE_PRODUCTS}`, action.payload))

    toast.success(`Add Successfully`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    yield put(addProductSuccess(product.data))
  } catch {
    toast.error(`Fail to add product`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}
function* workUpdateProduct(action) {
  yield delay(500);

  try {
    const product = yield call(() =>
      axios.put(
        `${import.meta.env.VITE_PRODUCTS}/${action.payload.id}`,
        action.payload
      )
    );

    toast.success(`Update Successfully`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    yield put(updateProductSuccess(product.data));
   
  } catch {
    toast.error(`Fail to update product`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}

function* workRemoveProduct(action) {
  yield delay(500)

  try {
    yield call(() => axios.delete(`${import.meta.env.VITE_PRODUCTS}/${action.payload.id}`))
    
    toast.success(`Remove Successfully`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    yield put(removeProductSuccess(action.payload))
  } catch {
    toast.error(`Fail to remove product`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}

function* workSearchProduct(action) {
  const products = yield call(() => axios.get(`${import.meta.env.VITE_PRODUCTS}`));
  const listSearch = yield products.data.filter(product => product.productName.toLowerCase().includes(action.payload))
  yield put(searchProductSuccess(listSearch))
}

/*Category*/
function* workGetCate() {
  yield delay(500);
  try {
    const cate = yield call(() => axios.get(`${import.meta.env.VITE_CATE}`));
    if (cate.status === 200) yield put(getCateSuccess(cate.data));
  } catch (e) {
    toast.error(`Fail to fetch list category`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}

function* workAddCate(action) {
  try {
    const cate = yield call(() => axios.post(`${import.meta.env.VITE_CATE}`, action.payload))

    toast.success(`Add successfully !!!`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    yield put(addCateSuccess(cate.data))
  } catch {
    toast.error(`Fail to add category`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}

function* workUpdateCate(action) {
  yield delay(500);

  try {
    const cate = yield call(() => axios.put(`${import.meta.env.VITE_CATE}/${action.payload.id}`,action.payload));

    toast.success(`Update successfully !!!`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    yield put(updateCateSuccess(cate.data))
  } catch {
    toast.success(`Fail to update category`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}

function* workRemoveCate(action) {
  yield delay(500)

  try {
    yield call(() => axios.delete(`${import.meta.env.VITE_CATE}/${action.payload.id}`))
    
    toast.success(`Remove Successfully`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    yield put(removeCateSuccess(action.payload))
  } catch {
    toast.error(`Fail to remove product`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}

function* workSearchCate(action) {
  const cate = yield call(() => axios.get(`${import.meta.env.VITE_CATE}`));
  const listSearch = yield cate.data.filter(item => item.cateName.toLowerCase().includes(action.payload))
  yield put(searchCateSuccess(listSearch))
}
/*Users*/
function* workGetListUser(action) {
  yield delay(500);

  try {
    const users = yield call(() => axios.get(`${import.meta.env.VITE_USER}`));
    yield put(getListUserSuccess(users.data));
  } catch (e) {
    toast.error(`Fail to fetch list user`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}

function* workCreateUser(action) {
  yield delay(500);
  const formSignUp = {
    ...action.payload,
    address: action.payload.address ? action.payload.address: "",
    name: action.payload.name ? action.payload.name : "",
    userId: action.payload.userId ? action.payload.userId : uuid().split('-')[0],
  };

  try {
    const user = yield call(() =>
      axios.post(`${import.meta.env.VITE_USER}`, formSignUp)
    );
    if (user.status === 201) yield put(setUser(user.data));
  } catch (e) {
    toast.error(`Fail to create user`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
    toast.success(`Update Successfully!!!`, {
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
  }
}

function* workRemoveUser(action) {
  yield delay(500)

  try {
    // yield call(() => axios.delete(`${import.meta.env.VITE_USER}/${action.payload.id}`))
    
    toast.success(`Remove Successfully`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    yield put(removeUserSuccess(action.payload))
  } catch {
    toast.error(`Fail to remove user`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}

/*Orders */
function* workGetOrder(action) {
  yield delay(500);

  const state = yield select();
  const user = state.user.user;

  try {
    const order = yield call(() => axios.get(`${import.meta.env.VITE_ORDER}`));

    const userOrder = yield order.data.filter(
      (item) => item.user.phone === user.phone
    );

    yield put(getOrderSuccess(userOrder));
  } catch (e) {
    toast.error(`Fail to fetch order`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}

function* workGetListOrder(action) {
  yield delay(500);

  try {
    const order = yield call(() => axios.get(`${import.meta.env.VITE_ORDER}`));
    yield put(getOrderSuccess(order.data));
  } catch (e) {
    toast.error(`Fail to fetch list order`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}

function* workPostOrder(action) {
  yield delay(500);

  const today = new Date();
  const date =
    today.getFullYear() +
    "/" +
    `0${today.getMonth() + 1}`.slice(-2) +
    "/" +
    `0${today.getDate()}`.slice(-2);
  const time =
    `0${today.getHours()}`.slice(-2) +
    ":" +
    `0${today.getMinutes()}`.slice(-2) +
    ":" +
    `0${today.getSeconds()}`.slice(-2);
  const dateTime = date + " " + time;

  const formOrder = {
    ...action.payload,
    orderId: uuid(),
    dateTime,
    status: "order",
  };

  try {
    const order = yield call(() =>
      axios.post(`${import.meta.env.VITE_ORDER}`, formOrder)
    );
    yield put(clearCart());
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
  }
}

function* workCancelOrder(action) {
  yield delay(500);

  const formCancel = {
    ...action.payload,
    status: "cancel",
  };

  try {
    const order = yield call(() =>
      axios.put(`${import.meta.env.VITE_ORDER}/${formCancel.id}`, formCancel)
    );

    yield put(cancelOrderSuccess(order.data));

    toast.success(`Cancel Order Successfully !!!`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch {
    toast.error(`Fail to cancel order`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}

function* saga() {
  yield takeLatest("products/getProducts", workGetProducts);
  yield takeLatest("products/addProduct", workAddProduct);
  yield takeLatest("products/updateProduct", workUpdateProduct);
  yield takeLatest("products/removeProduct", workRemoveProduct);
  yield takeLatest("products/searchProduct", workSearchProduct);

  yield takeLatest("cate/getCate", workGetCate);
  yield takeLatest("cate/addCate", workAddCate);
  yield takeLatest("cate/updateCate", workUpdateCate);
  yield takeLatest("cate/removeCate", workRemoveCate);
  yield takeLatest("cate/searchCate", workSearchCate);

  yield takeLatest("user/getListUser", workGetListUser);
  yield takeLatest("user/createUser", workCreateUser);
  yield takeLatest("user/updateUser", workUpdateUser);
  yield takeLatest("user/removeUser", workRemoveUser);
  

  yield takeLatest("order/getOrder", workGetOrder);
  yield takeLatest("order/getListOrder", workGetListOrder);
  yield takeLatest("order/postOrder", workPostOrder);
  yield takeLatest("order/cancelOrder", workCancelOrder);
}

export default saga;
