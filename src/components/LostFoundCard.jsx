import React from 'react';
import { FiMapPin, FiCalendar, FiPhone, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMarket } from '../context/MarketContext';
import styles from './LostFoundCard.module.css';
import Button from './Button';

const LostFoundCard = ({ item }) => {
    const { user } = useAuth();
    const { deleteLostItem } = useMarket();
    const navigate = useNavigate();
    const isLost = item.type === 'lost';
    const isOwner = user?.registerNumber === item.reporterReg;

    const handleContact = () => {
        // Assuming contact is mobile or reg number, generic alert or action
        alert(`Contact the student at: ${item.contact}`);
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                await deleteLostItem(item.id);
            } catch (error) {
                alert("Failed to delete item.");
            }
        }
    };

    const handleEdit = () => {
        navigate('/report-lost-found', { state: { item } });
    };

    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <div className={`${styles.badge} ${isLost ? styles.lost : styles.found}`}>
                    {isLost ? 'LOST' : 'FOUND'}
                </div>
                <img src={item.image} alt={item.title} className={styles.image} />

                {isOwner && (
                    <div className={styles.ownerActions}>
                        <button onClick={handleEdit} className={styles.actionBtn} title="Edit">
                            <FiEdit2 />
                        </button>
                        <button onClick={handleDelete} className={styles.actionBtn} title="Delete">
                            <FiTrash2 />
                        </button>
                    </div>
                )}
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.description}>{item.description}</p>

                <div className={styles.meta}>
                    <div className={styles.metaItem}>
                        <FiMapPin /> <span>{item.location}</span>
                    </div>
                    <div className={styles.metaItem}>
                        <FiCalendar /> <span>{item.date}</span>
                    </div>
                    <div className={styles.metaItem}>
                        <FiPhone /> <span>{item.contact}</span>
                    </div>
                </div>

                {!isOwner && (
                    <Button
                        variant={isLost ? "danger" : "primary"}
                        fullWidth
                        onClick={handleContact}
                        className={styles.btn}
                    >
                        Contact {isLost ? 'Owner' : 'Finder'}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default LostFoundCard;
