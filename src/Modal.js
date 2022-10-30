import React from 'react';
import ReactDOM from 'react-dom';
import styles from './assets/styles/Modal.scss';
import { useState } from 'react';
import { CartContext } from './context/CartContext';
import { useContext, useEffect } from 'react';
import CartItem from './components/CartItem';
import { FaShoppingCart } from 'react-icons/fa';
import { FaSadTear } from 'react-icons/fa';

export default function Modal({ open, children, onClose }) {
    const cart = useContext(CartContext);
    const productsCount = cart.items.reduce(
        (sum, product) => sum + product.quantity,
        0
    );

    // How to make smooth transition when closing the cart? Since when you click on button it turns to false, it instantly is hidden

    if (!open) return null;
    return ReactDOM.createPortal(
        <div>
            <div className="overlay">
                <div className={open ? 'modal active' : 'modal inactive'}>
                    <button className="close" onClick={onClose}></button>
                    {children}

                    <div className="cart-container">
                        {productsCount > 0 ? (
                            <>
                                <h1>Items in your cart:</h1>
                                {cart.items.map((currentProduct, idx) => (
                                    <div>
                                        <CartItem
                                            key={currentProduct.id}
                                            id={currentProduct.id}
                                            title={currentProduct.title}
                                            src={currentProduct.img}
                                            price={currentProduct.price}
                                            quantity={currentProduct.quantity}
                                        />
                                    </div>
                                ))}
                                <div className="checkout-container">
                                    <h2>{'Total: $ ' + cart.getTotalCost()}</h2>

                                    <button
                                        className="checkout-button"
                                        onClick={() =>
                                            alert('Successfull checkout')
                                        }
                                    >
                                        Checkout{' '}
                                        <FaShoppingCart className="checkout-icon"></FaShoppingCart>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="cart-empty">
                                <h1> Cart is empty</h1>{' '}
                                <FaSadTear className="faface"></FaSadTear>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('portal')
    );
}
