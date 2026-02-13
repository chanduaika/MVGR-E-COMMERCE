import React from 'react';
import clsx from 'clsx';
import styles from './Input.module.css';

const Input = ({ label, error, className, ...props }) => {
    return (
        <div className={clsx(styles.group, className)}>
            {label && <label className={styles.label}>{label}</label>}
            <input
                className={clsx(styles.input, error && styles.error)}
                {...props}
            />
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
};

export default Input;
