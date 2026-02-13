import React, { useState } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { useMarket } from '../context/MarketContext';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard'; // Will create this
import styles from './Market.module.css';

const Market = () => {
    const { products } = useMarket();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout>
            <div className="container">
                <header className={styles.header}>
                    <h1 className="text-gradient">Student Marketplace</h1>

                    <div className={styles.searchBar}>
                        <FiSearch className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search textbooks, electronics..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>
                </header>

                <div className={styles.grid}>
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}

                    {filteredProducts.length === 0 && (
                        <div className={styles.emptyState}>
                            <p>No products found matching "{searchTerm}"</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Market;
