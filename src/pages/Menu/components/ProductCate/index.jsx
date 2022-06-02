import React from "react";
import PropTypes from "prop-types";

ProductCate.propTypes = {
  list: PropTypes.array,
  onProductClick: PropTypes.func,
};

ProductCate.defaultProps = {
  list: [],
  onProductClick: null,
};

function ProductCate(props) {
  const { list, onProductClick } = props;

  const handleClick = (product) => {
    if (onProductClick) onProductClick(product);
  };

  return (
    <ul className="products">
      {list.map((product, index) => (
        <li
          className="product"
          key={index}
          onClick={() => handleClick(product)}
        >
          <div className="w-full h-full relative hover:opacity-80 cursor-pointer">
            <img src={product.imageUrl} className="bg-img" />

            <div className="absolute left-1/2 bottom-10 -translate-x-1/2 py-2 px-4 bg-white uppercase font-bold text-xl rounded-md">
              {product.productName}
            </div>

            <div className="price-img">${product.price}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ProductCate;
