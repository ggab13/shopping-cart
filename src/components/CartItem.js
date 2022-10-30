import React from 'react';
import styles from '../assets/styles/CartItem.scss';
import { CartContext } from '../context/CartContext';
import { useContext, useEffect } from 'react';

// Component for the items which is added to the cart

function CartItem({ id, src, title, price, quantity }) {
    const cart = useContext(CartContext);
    return (
        <div className="cart-item">
            <img src={src}></img>
            <div className="box1">
                <p>
                    {title.split(' ').slice(0, 5).join(' ')}
                    <span> x {quantity}</span>
                </p>
                <p>$ {price}</p>
            </div>
            <h3 className="box2">{'$ ' + (price * quantity).toFixed(2)}</h3>
            <button
                className="delete-item"
                onClick={() => cart.deleteFromCart(id)}
            >
                X
            </button>
        </div>
    );
}

export default CartItem;
