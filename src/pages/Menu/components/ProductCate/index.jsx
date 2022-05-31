import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

ProductCate.propTypes = {
  list: PropTypes.array,
};

ProductCate.defaultProps = {
  list: [],
};

function ProductCate(props) {
  const { list } = props;

  return (
    <ul className="products">
      {list.map((product, index) => (
        <li className="product" key={index}>
          <img
            src={product.imageUrl}
            className="w-full h-auto overflow-hidden"
          ></img>
          <div className="flex flex-col">
            <div className="flex justify-center gap-10">
              <div>{product.productName}</div>
              <div>${product.price}</div>
            </div>

            <div></div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ProductCate;
