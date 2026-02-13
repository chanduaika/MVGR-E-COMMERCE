import React from 'react';
import { FiGithub, FiTwitter, FiInstagram } from 'react-icons/fi';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.content}>
                    <div className={styles.brand}>
                        <span className="text-gradient">UniMarket</span>
                        <p>Made with ❤️ for students.</p>
                    </div>

                    <div className={styles.links}>
                        <div className={styles.socials}>
                            <a href="#" className={styles.socialLink}><FiGithub /></a>
                            <a href="#" className={styles.socialLink}><FiTwitter /></a>
                            <a href="#" className={styles.socialLink}><FiInstagram /></a>
                        </div>
                    </div>
                </div>

                <div className={styles.copyright}>
                    &copy; {new Date().getFullYear()} College E-Commerce. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
