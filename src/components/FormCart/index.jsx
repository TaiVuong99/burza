import { useFormik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { RiShoppingCart2Fill } from "react-icons/ri";

FormCart.propTypes = {
  quantity: PropTypes.number,
  onDecreaseClick: PropTypes.func,
  onIncreaseClick: PropTypes.func,
  onSubmitClick: PropTypes.func,
};

FormCart.defaultProps = {
  quantity: 1,
  onDecreaseClick: null,
  onIncreaseClick: null,
  onSubmitClick: null,
};

function FormCart(props) {
  const { quantity, onDecreaseClick, onIncreaseClick, onSubmitClick } = props;

  const formik = useFormik({
    initialValues: {
      notes: "",
    },
    onSubmit: (values) => {
      if (onSubmitClick) onSubmitClick(values);
    },
  });

  const handleIncrease = () => {
    if (onIncreaseClick) onIncreaseClick();
  };

  const handleDecrease = () => {
    if (onDecreaseClick) onDecreaseClick();
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
      <div>
        <label forhtml="notes" className="text-lg">
          Notes:
        </label>
        <textarea
          name="notes"
          className="w-full border-2 p-2"
          value={formik.values.notes}
          onChange={formik.handleChange}
        />
      </div>

      <div className="flex justify-evenly">
        <div className="flex justify-around items-center gap-4">
          <div
            className="btn-quantity"
            onClick={handleDecrease}
            style={{
              pointerEvents: quantity === 1 ? "none" : "",
              opacity: quantity === 1 ? ".5" : "",
            }}
          >
            -
          </div>

          <div
            name="quantity"
            className="font-bold pointer-events-none"
            value={formik.values.quantity}
            onChange={formik.handleChange}
          >
            {quantity}
          </div>

          <div className="btn-quantity" onClick={handleIncrease}>
            +
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="btn-add"
            style={{ backgroundColor: "#1D4ED8" }}
          >
            Add to cart <RiShoppingCart2Fill />
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormCart;
