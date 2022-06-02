import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import ModalDetail from "./components/ModalDetail";
import NavMenu from "./components/NavMenu";
import ProductCate from "./components/ProductCate";
import useModal from "./hooks/useModal";

function Menu() {
  let params = useParams();

  const products = useSelector((state) => state.products);
  const cate = useSelector((state) => state.cate);

  const productCate = products.map((product) => ({
    ...product,
    ...cate.find((item) => item.cateId === product.cateId),
  }));

  const [list, setList] = useState([]);
  const [detail, setDetail] = useState({});

  const { showModal, toggle } = useModal();

  useEffect(() => {
    if (params.cate == undefined || params.cate === "all") setList(productCate);
    else {
      const newList = productCate.filter(
        (product) => product.cateName.toLowerCase() === params.cate
      );
      setList(newList);
    }
  }, [params]);

  const handleProductClick = (product) => {
    document.getElementById("menu-container").style.pointerEvents = "none";

    toggle();
    setDetail(product);
  };

  return (
    <>
      <div id="menu-container">
        <NavMenu />
        <ProductCate list={list} onProductClick={handleProductClick} />
        <ToastContainer newestOnTop/>
      </div>
      <ModalDetail detail={detail} showModal={showModal} hide={toggle} />
    </>
  );
}

export default Menu;
