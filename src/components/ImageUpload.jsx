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
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                alert("File size too large. Please upload an image under 2MB.");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new Image();
                img.src = reader.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;

                    // Resize if too large (max dimension 800px)
                    const MAX_DIM = 800;
                    if (width > MAX_DIM || height > MAX_DIM) {
                        if (width > height) {
                            height *= MAX_DIM / width;
                            width = MAX_DIM;
                        } else {
                            width *= MAX_DIM / height;
                            height = MAX_DIM;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    // Compress to JPEG with 0.7 quality
                    const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);

                    setPreview(compressedDataUrl);
                    onImageSelect(compressedDataUrl);
                };
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
