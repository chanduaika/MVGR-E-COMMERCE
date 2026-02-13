import React from 'react';
import { FiMapPin, FiCalendar, FiPhone } from 'react-icons/fi';
import styles from './LostFoundCard.module.css';
import Button from './Button';

const LostFoundCard = ({ item }) => {
    const isLost = item.type === 'lost';

    const handleContact = () => {
        // Assuming contact is mobile or reg number, generic alert or action
        alert(`Contact the student at: ${item.contact}`);
    };

    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <div className={`${styles.badge} ${isLost ? styles.lost : styles.found}`}>
                    {isLost ? 'LOST' : 'FOUND'}
                </div>
                <img src={item.image} alt={item.title} className={styles.image} />
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

                <Button
                    variant={isLost ? "danger" : "primary"}
                    fullWidth
                    onClick={handleContact}
                    className={styles.btn}
                >
                    Contact {isLost ? 'Owner' : 'Finder'}
                </Button>
            </div>
        </div>
    );
};

export default LostFoundCard;
