import React from 'react';
import { FiMessageCircle, FiUser } from 'react-icons/fi';
import Button from './Button';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
    const handleBargain = () => {
        if (product.contactType === 'whatsapp') {
            window.open(`https://wa.me/${product.contact}?text=Hi, I am interested in your ${product.title}`, '_blank');
        } else {
            window.open(`mailto:${product.contact}?subject=Interest in ${product.title}&body=Hi, I am interested in buying your ${product.title}`, '_blank');
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <img src={product.image} alt={product.title} className={styles.image} />
                <span className={styles.price}>₹{product.price}</span>
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>{product.title}</h3>
                <p className={styles.description}>{product.description}</p>

                <div className={styles.sellerInfo}>
                    <FiUser /> <span>{product.sellerName}</span>
                </div>

                <Button
                    variant="primary"
                    fullWidth
                    onClick={handleBargain}
                    className={styles.bargainBtn}
                >
                    <FiMessageCircle /> Bargain / Buy
                </Button>
            </div>
        </div>
    );
};

export default ProductCard;
