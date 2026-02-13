import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { useMarket } from '../context/MarketContext';
import Layout from '../components/Layout';
import LostFoundCard from '../components/LostFoundCard';
import Button from '../components/Button';
import styles from './LostFound.module.css';
import clsx from 'clsx';

const LostFound = () => {
    const { lostItems } = useMarket();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('lost'); // 'lost' or 'found'
    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = lostItems.filter(item =>
        item.type === activeTab &&
        (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.location.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <Layout>
            <div className="container">
                <header className={styles.header}>
                    <h1 className="text-gradient">Lost & Found</h1>
                    <p>Help our community recover lost items.</p>

                    <div className={styles.actions}>
                        <div className={styles.tabs}>
                            <button
                                className={clsx(styles.tab, activeTab === 'lost' && styles.activeTab)}
                                onClick={() => setActiveTab('lost')}
                            >
                                Lost Items
                            </button>
                            <button
                                className={clsx(styles.tab, activeTab === 'found' && styles.activeTab)}
                                onClick={() => setActiveTab('found')}
                            >
                                Found Items
                            </button>
                        </div>

                        <Button onClick={() => navigate('/report-lost-found')}>
                            <FiPlus /> Report Item
                        </Button>
                    </div>

                    <div className={styles.searchBar}>
                        <FiSearch className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder={`Search ${activeTab} items...`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>
                </header>

                <div className={styles.grid}>
                    {filteredItems.map(item => (
                        <LostFoundCard key={item.id} item={item} />
                    ))}

                    {filteredItems.length === 0 && (
                        <div className={styles.emptyState}>
                            <p>No {activeTab} items reported matching "{searchTerm}"</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default LostFound;
