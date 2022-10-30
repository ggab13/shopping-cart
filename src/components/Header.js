import React from 'react';
import styles from '../assets/styles/Header.scss';
import logo from '../logo.svg';
import { FaCartPlus } from 'react-icons/fa';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import Modal from '../Modal';
import { useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useContext, useEffect } from 'react';

function Header() {
    const cart = useContext(CartContext);

    const productsCount = cart.items.reduce(
        (sum, product) => sum + product.quantity,
        0
    );

    const [hamburgerOpen, setHamburgerOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');

    function CustomLink({ to, children, ...props }) {
        // Takes the path and comine it with the current path, and give back that as a result (Convert relative path with absolute path)
        const resolvedPath = useResolvedPath(to);

        //Like this with the end:true it will match only the exact same paths
        const isActive = useMatch({ path: resolvedPath.pathname, end: true });

        return (
            <li className="nav-link">
                <Link to={to} {...props} className={isActive ? 'active' : ''}>
                    {children}
                </Link>
            </li>
        );
    }

    return (
        <div className="header">
            <Link href="/" className="brand-logo">
                <img
                    className="brand-logo-img"
                    src={logo}
                    alt="Logo of brand"
                />
                <div className="brand-logo-name">Musify</div>
            </Link>
            <nav className={hamburgerOpen ? 'nav-menu active ' : 'nav-menu'}>
                <ul>
                    <CustomLink to="/">Home</CustomLink>
                    <CustomLink to="/products">Shop</CustomLink>
                    <div className="cart-container">
                        <button onClick={() => setIsOpen(true)}>
                            {' '}
                            <FaCartPlus className="cart-icon" />
                            <span className="cart-counter">
                                {productsCount}
                            </span>
                        </button>
                    </div>
                    <Modal
                        open={isOpen}
                        onClose={() => setIsOpen(false)}
                    ></Modal>
                </ul>
            </nav>
            <div
                className={
                    hamburgerOpen ? 'hamburger hamburgerclose ' : 'hamburger'
                }
                onClick={() => setHamburgerOpen((value) => !value)}
            >
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </div>
    );
}

export default Header;
