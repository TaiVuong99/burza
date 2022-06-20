import { useEffect } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

import "./App.css";

import Footer from "./components/Footer";
import FooterMobile from "./components/FooterMobile";
import Header from "./components/Header";
import HeaderMobile from "./components/HeaderMobile";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import Checkout from "./pages/Account/components/Checkout";
import Home from "./pages/Home";
import Menu from "./pages/Menu";

import { getCate } from "./redux/cateSlice";
import { getProducts } from "./redux/productSlice";
import { getListUser } from "./redux/userSlice";
import Admin from "./pages/Admin";
import { getListOrder } from "./redux/orderSlice";
import MaintenanceSystem from "./components/MaintenanceSystem";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCate());
    dispatch(getListUser());
    dispatch(getListOrder());
  }, []);

  return (
    <>
      <BrowserView className="App">
        <Header />
        <Routes>
          <Route path="ad" element={<Admin />}>
            <Route path=":adminTask" element={<Admin />} />
          </Route>

          <Route path="/" element={<Home />} />

          <Route path="menu" element={<Menu />}>
            <Route path=":cate" element={<Menu />}>
              <Route path=":product" element={<Menu />} />
            </Route>
          </Route>

          <Route path="account" element={<Account />}>
            <Route path="signup" element={<Account />} />
            <Route path="info" element={<Account />} />
            <Route path="order" element={<Account />}>
              <Route path=":orderId" element={<Account />} />
            </Route>
          </Route>

          <Route path="cart" element={<Cart />} />

          <Route path="checkout" element={<Checkout />} />
          <Route path="*" element={<Home />} />
        </Routes>

        <Footer />
      </BrowserView>

      <MobileView className="App">
        <HeaderMobile />

        <div className="mobile-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="menu" element={<MaintenanceSystem />}>
              <Route path=":cate" />
            </Route>
            <Route path="account" element={<MaintenanceSystem />} />
            <Route path="cart" element={<MaintenanceSystem />} />

            <Route path="*" element={<Home />} />
          </Routes>
        </div>

        <FooterMobile />
      </MobileView>
    </>
  );
}

export default App;
