import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

Bill.propTypes = {
    
};

function Bill(props) {
    const cart = useSelector(state => state.cart)

    let subtotal = 0, shipping = 0, total = 0
    
    if(cart.length > 0) {
        cart.map(product => {
            subtotal += product.price * product.quantity
        })
        shipping = 5
        total = subtotal + shipping
    }

    return (
        <div className='bill-container'>
            <div className='info-container'>
                <div className='info-title'>
                    Payment Info
                </div>

                <div>
                    <div className='info-price'>
                        Subtotal: <span>$ {subtotal}</span>
                    </div>

                    <div className='info-price'>
                        Shipping Fee: <span>$ {shipping}</span>
                    </div>
                </div>

                <div className='info-total'>
                    Total: <span>$ {total}</span>
                </div>
            </div>

            <div className='info-container'>
            <div className='info-title'>
                    User Info
                </div>
            </div>
        </div>
    );
}

export default Bill;