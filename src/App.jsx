import { BrowserView, MobileView } from "react-device-detect";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Menu from "./pages/Menu";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

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
      </BrowserView>

      <MobileView className="App">
        <Nav />
        {/* <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/account" element={<Account />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="*" element={<Home />} />
        </Routes> */}
      </MobileView>
    </>
  );
}

export default App;
