import { BrowserView, MobileView } from "react-device-detect";
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

function App() {
  return (
    <>
      <BrowserView className="App">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/account" element={<Account />} />
          <Route path="/cart" element={<Cart />} />

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
