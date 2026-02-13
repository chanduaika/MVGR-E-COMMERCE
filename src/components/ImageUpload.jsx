import React, { useState, useRef } from 'react';
import { FiUpload, FiX } from 'react-icons/fi';
import Button from './Button';
import styles from './ImageUpload.module.css';

const ImageUpload = ({ onImageSelect, initialImage, label }) => {
    const [preview, setPreview] = useState(initialImage || '');
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                onImageSelect(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const clearImage = (e) => {
        e.stopPropagation();
        setPreview('');
        onImageSelect('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className={styles.container}>
            {label && <label className={styles.label}>{label}</label>}

            <div
                className={`${styles.uploadBox} ${preview ? styles.hasImage : ''}`}
                onClick={() => fileInputRef.current.click()}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className={styles.hiddenInput}
                />

                {preview ? (
                    <div className={styles.previewWrapper}>
                        <img src={preview} alt="Preview" className={styles.previewImage} />
                        <button type="button" onClick={clearImage} className={styles.removeBtn}>
                            <FiX />
                        </button>
                    </div>
                ) : (
                    <div className={styles.placeholder}>
                        <FiUpload className={styles.icon} />
                        <span>Click to upload image</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;
