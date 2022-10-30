import React from 'react';

import { CartContext } from '../context/CartContext';
import { useContext, useEffect } from 'react';

function Card({ id, src, title, price }) {
    const quantity = 0;
    const cart = useContext(CartContext);
    const productQuantity = cart.getProductQuantity(id);

    console.log('BOLT');
    console.log(cart.items);
    console.log('BOLT');

    return (
        <div className="album-card">
            <img src={src}></img>
            <div className="card-info">
                <p>{title}</p>
                <p className="card-price">
                    {'$ '}
                    {price}
                </p>

                {productQuantity <= 0 ? (
                    <button
                        onClick={() => cart.addOneToCart(id, title, price, src)}
                    >
                        Add to cart
                    </button>
                ) : (
                    <div className="card-quantity">
                        <button onClick={() => cart.removeOneFromCart(id)}>
                            -
                        </button>
                        <p>
                            {' '}
                            <span>{productQuantity} </span>in cart
                        </p>
                        <button onClick={() => cart.addOneToCart(id)}>+</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Card;
