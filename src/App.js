import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Products from './pages/Products';
import styles from './assets/styles/App.css';
import Circles from './components/Circles';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import CartProvider from './context/CartContext';

// Majd az App ból adjam le props-ként az albumokat a Cartnak és a Productsnak ? Talán úgy könyebb
function App() {
    return (
        <div className="App ">
            <CartProvider>
                <div className="container">
                    <Header />
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                    </Routes>
                    <Circles />
                </div>
                <Footer></Footer>
            </CartProvider>
        </div>
    );
}

export default App;
