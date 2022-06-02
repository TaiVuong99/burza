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
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import { getCate } from "./redux/cateSlice";
import { getProducts } from "./redux/productSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCate())
  }, []);

  return (
    <>
      <BrowserView className="App">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="menu" element={<Menu/>} >
            <Route path=":cate" element={<Menu />} >
              <Route path=":product" element={<Menu/>}/>
            </Route>
          </Route>

          <Route path="account" element={<Account />} />
          
          <Route path="cart" element={<Cart />} />

          <Route path="*" element={<Home />} />
        </Routes>

        <Footer />
      </BrowserView>

      <MobileView className="App">
        <HeaderMobile />

        <div className="mobile-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/account" element={<Account />} />
            <Route path="/cart" element={<Cart />} />

            <Route path="*" element={<Home />} />
          </Routes>
        </div>

        <FooterMobile />
      </MobileView>
    </>
  );
}

export default App;
