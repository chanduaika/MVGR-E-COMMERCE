import React from 'react';
import clsx from 'clsx';
import { ImSpinner8 } from 'react-icons/im';
import styles from './Button.module.css';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth,
    loading,
    disabled,
    className,
    ...props
}) => {
    return (
        <button
            className={clsx(
                styles.button,
                styles[variant],
                styles[size],
                fullWidth && styles.fullWidth,
                (loading || disabled) && styles.disabled,
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <ImSpinner8 className={styles.spinner} />}
            {children}
        </button>
    );
};

export default Button;
