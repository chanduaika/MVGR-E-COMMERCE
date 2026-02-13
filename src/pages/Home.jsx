import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiShoppingBag, FiTag } from 'react-icons/fi';
import Layout from '../components/Layout';
import styles from './Home.module.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <Layout>
            <div className="container">
                <header className={styles.header}>
                    <h1 className="text-gradient">Welcome to Campus Marketplace</h1>
                    <p>The easiest way to buy, sell, and find items in college.</p>
                </header>

                <div className={styles.grid}>
                    {/* Buyer Card */}
                    <div className={styles.card} onClick={() => navigate('/market')}>
                        <div className={`${styles.iconWrapper} ${styles.blue}`}>
                            <FiShoppingBag />
                        </div>
                        <h2>I want to Buy</h2>
                        <p>Explore products listed by other students. Textbooks, gadgets, and more.</p>
                        <div className={styles.blob}></div>
                    </div>

                    {/* Seller Card */}
                    <div className={styles.card} onClick={() => navigate('/sell')}>
                        <div className={`${styles.iconWrapper} ${styles.pink}`}>
                            <FiTag />
                        </div>
                        <h2>I want to Sell</h2>
                        <p>List your unused items and earn cash. Reach students instantly.</p>
                        <div className={styles.blob}></div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Home;
