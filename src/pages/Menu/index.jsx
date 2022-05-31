import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavMenu from "./components/NavMenu";
import ProductCate from "./components/ProductCate";

function Menu() {
  let params = useParams();

  const products = useSelector((state) => state.products);
  const cate = useSelector((state) => state.cate);

  const productCate = products.map((product) => ({
    ...product,
    ...cate.find((item) => item.cateId === product.cateId),
  }));

  const [list, setList] = useState([]);

  useEffect(() => {
    if (params.cate === "all") setList(productCate);
    else {
        const newList = productCate.filter((product) => product.cateName.toLowerCase() === params.cate)
        setList(newList)
    }
  }, []);


  const handleNavClick = (nav) => {
    if (nav == undefined) {
      setList(productCate);
    } else {
      const newList = productCate.filter((product) => product.cateName === nav);
      setList(newList);
    }
  };

  return (
    <div className="w-full h-auto mt-[10vh] pt-10 px-40">
      <NavMenu onNavClick={handleNavClick} />
      <ProductCate list={list} />
    </div>
  );
}

export default Menu;
