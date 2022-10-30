import React from 'react';
import { createContext } from 'react';
import { useState } from 'react';

export const CartContext = createContext({
    items: [],
    getProductQuantity: () => {},
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {},
});

export function CartProvider({ children }) {
    const [cartProducts, setCartProducts] = useState([]);

    // Get the id of a product, and if there is no existing return value with 0, if exist return the current quantity

    function getProductQuantity(id) {
        const quantity = cartProducts.find(
            (product) => product.id === id
        )?.quantity;

        if (quantity === undefined) {
            return 0;
        }

        return quantity;
    }

    // Add the element to the cart from the Card component

    function addOneToCart(id, title, price, img) {
        const quantity = getProductQuantity(id);
        //const price = productPrice(price);
        if (quantity === 0) {
            //Product is not in cart
            setCartProducts([
                ...cartProducts,
                {
                    id: id,
                    title: title,
                    quantity: 1,
                    price: price,
                    img: img,
                    //price: price,
                },
            ]);
        } else {
            //Product is in cart
            setCartProducts(
                cartProducts.map((product) =>
                    product.id === id
                        ? {
                              ...product,
                              quantity: product.quantity + 1,
                          }
                        : product
                )
            );
        }
    }

    // Remove all the quantities
    function deleteFromCart(id) {
        setCartProducts(
            (cartProducts) =>
                cartProducts.filter((currentProduct) => {
                    return currentProduct.id != id;
                }) // []
        );
    }

    // Remove a quantity from the cart

    function removeOneFromCart(id) {
        const quantity = getProductQuantity(id);

        if (quantity === 1) {
            deleteFromCart(id);
        } else {
            //Product is in cart
            setCartProducts(
                cartProducts.map((product) =>
                    product.id === id
                        ? {
                              ...product,
                              quantity: product.quantity - 1,
                          }
                        : product
                )
            );
        }
    }

    // Get the total cost of all item in the cart

    function getTotalCost() {
        let totalCost = 0;
        cartProducts.map((cartItem) => {
            totalCost += cartItem.price * cartItem.quantity;
        });

        return totalCost.toFixed(2);
    }
    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost,
    };
    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;
