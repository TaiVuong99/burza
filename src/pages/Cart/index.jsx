import React from 'react';
import { useSelector } from 'react-redux';

function Cart(props) {
    const cart = useSelector(state => state.cart)

    console.log(cart)
    return (
        <div>
            
        </div>
    );
}

export default Cart;