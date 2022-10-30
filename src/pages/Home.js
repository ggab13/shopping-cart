import React from 'react';
import styles from '../assets/styles/Home.scss';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="test">
            <section className="home-main-section test">
                <div className="brand-slogen">
                    <h1 className="title">
                        Feel the <span className="music-span">music</span>
                    </h1>
                    <span className="subtitle">
                        Connect with your favourite artists without limits
                        <span className="dot-span">.</span>
                    </span>

                    <button>
                        <Link to="/products"> Shop now </Link>
                    </button>
                </div>

                {/* How can i put the image to the right side, properly while scaling properly? */}

                <div className="img-wrapper ">
                    <div className="img-guy"></div>
                </div>
            </section>
        </div>
    );
}

export default Home;
