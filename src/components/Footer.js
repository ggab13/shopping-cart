import React from 'react';
import styles from '../assets/styles/Footer.scss';
import { FaGithub } from 'react-icons/fa';
function Footer() {
    return (
        <div>
            <footer>
                <p>
                    Created by <span>|</span>{' '}
                    <a href="https://github.com/ggab13">ggab13</a>{' '}
                    <FaGithub className="github" />{' '}
                </p>
            </footer>
        </div>
    );
}

export default Footer;
