import React from "react";
import logo from "../../logo.svg";
import { BiSupport, BiEnvelope } from "react-icons/bi";
import {
  BsFacebook,
  BsTwitter,
  BsInstagram,
  BsWhatsapp,
  BsYoutube,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  return (
    <footer>
      <div className="footer">
        <div className="col-container gap-2">
          <div className="text-xl uppercase">follow us</div>
          <div className="flex text-2xl gap-4 cursor-pointer">
            <BsFacebook className="hover:opacity-50" />
            <BsTwitter className="hover:opacity-50" />
            <BsInstagram className="hover:opacity-50" />
            <BsWhatsapp className="hover:opacity-50" />
            <BsYoutube className="hover:opacity-50" />
          </div>
        </div>

        <div className="col-container gap-2">
          <div className="flex justify-center items-center">
            <img src={logo} alt="logo" className="logo" />
            <div
              className="text-4xl font-bold text-primary cursor-pointer uppercase"
              onClick={() => {
                navigate("/");
              }}
            >
              <span className="text-red-600">B</span>
              <span className="text-yellow-400">U</span>
              <span className="text-lime-500">R</span>
              <span className="text-primary">Z</span>
              <span className="text-violet-800">A</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-center items-center gap-1">
              <BiEnvelope />: support@burza.com
            </div>

            <div className="flex justify-center items-center gap-1">
              <BiSupport />: <span className="text-sm">+</span>01 234 567 890
            </div>
          </div>
        </div>

        <div className="col-container gap-2">
          <div className="footer-title" onClick={() => navigate("/")}>
            Home
          </div>
          <div className="footer-title" onClick={() => navigate("/menu")}>
            Menu
          </div>
          <div className="footer-title" onClick={() => navigate("/account")}>
            Account
          </div>
          <div className="footer-title" onClick={() => navigate("/cart")}>
            cart
          </div>
        </div>
      </div>

      <div className="text-center my-1 text-lg text-gray-700">
        © Burza 2022 | Owned by{" "}
        <a
          href="https://github.com/TaiVuong99/burza"
          target="_blank"
          className="font-bold text-violet-800 hover:underline"
        >
          Michael Wang
        </a>
      </div>
    </footer>
  );
}

export default Footer;
