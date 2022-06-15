import React, { useEffect, useState } from "react";
import { FaPowerOff } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getListOrder } from "../../../../redux/orderSlice";
import { getProducts, searchProduct } from "../../../../redux/productSlice";
import { getListUser } from "../../../../redux/userSlice";
import { getCate } from "../../../../redux/cateSlice";

import ListItem from "./components/ListItem";
import SearchItem from "./components/SearchItem";
import ShowItem from "./components/ShowItem";
import Pagination from "./components/Pagination";
import { ToastContainer } from "react-toastify";

function PageContent() {
  const { adminTask } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [show, setShow] = useState("5");
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCate());
    dispatch(getListUser());
    dispatch(getListOrder());
  }, [adminTask]);

  const handleShowClick = (number) => {
    setShow(number);
  };

  const handleSearch = (text) => {
    setSearch(text);
  };

  const handleSubmitSearch = () => {
    switch (adminTask) {
      case "products": {
        dispatch(searchProduct(search));
        setSearch("");
        break;
      }
    }
  };

  return (
    <div className="col-span-3 flex flex-col">
      <div className="flex justify-end items-center gap-2 capitalize py-4 pr-4 bg-cyan-600/40">
        Hi, admin!{" "}
        <span
          className="bg-redd p-2 text-white rounded-lg hover:opacity-50 cursor-pointer"
          onClick={() => navigate("", { state: { adminLogin: false } })}
        >
          <FaPowerOff />
        </span>
      </div>

      <div className="p-4 flex flex-col gap-4">
        <div className="text-2xl uppercase border-b-2">admin/{adminTask}</div>

        {adminTask !== "dashboard" ? (
          <>
            <div className="flex justify-between">
              <ShowItem onShowClick={handleShowClick} show={show} />
              <SearchItem
                search={search}
                onSearch={handleSearch}
                onSubmitSearch={handleSubmitSearch}
              />
            </div>

            <div className="flex flex-col">
              <ListItem show={show} />
              <Pagination />
            </div>
          </>
        ) : (
          <div>dashboard</div>
        )}
      </div>
      <ToastContainer newestOnTop />
    </div>
  );
}

export default PageContent;
