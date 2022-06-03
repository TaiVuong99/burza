import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaWindowClose } from "react-icons/fa";
import FormCart from "../../../../components/FormCart";
import { useDispatch } from "react-redux";

import { addCart } from "../../../../redux/cartSlice";
import { toast } from "react-toastify";

ModalDetail.propTypes = {
  detail: PropTypes.object,
  showModal: PropTypes.bool,
  toggle: PropTypes.func,
};

ModalDetail.defaultProps = {
  detail: {},
  showModal: false,
  hide: null,
};

function ModalDetail(props) {
  const { detail, showModal, hide } = props;

  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const handleCancel = () => {
    setQuantity(1);
    hide();
    document.getElementById("menu-container").style.pointerEvents = "";
  };

  const handleIncreaseClick = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseClick = () => {
    setQuantity(quantity - 1);
  };

  const handleSubmitClick = (notes) => {
    const formValues = {
      ...detail,
      ...notes,
      quantity,
    };

    dispatch(addCart(formValues));

    setQuantity(1)
    hide();
    document.getElementById("menu-container").style.pointerEvents = "";

    toast.success(`Add ${detail.productName} Successfully!!!`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="w-full h-1/2 flex justify-center items-center relative pt-4">
              <button
                onClick={handleCancel}
                className="absolute -top-2 right-0 text-4xl text-red-600"
              >
                <FaWindowClose />
              </button>

              <img
                src={detail.imageUrl}
                alt={detail.productName}
                className="w-2/3 bg-img overflow-hidden rounded-lg"
              />
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex justify-between text-xl font-bold">
                <div>{detail.productName}</div>
                <div>Price: ${detail.price * quantity}</div>
              </div>

              <div className="flex flex-col">
                <FormCart
                  quantity={quantity}
                  onDecreaseClick={handleDecreaseClick}
                  onIncreaseClick={handleIncreaseClick}
                  onSubmitClick={handleSubmitClick}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalDetail;
