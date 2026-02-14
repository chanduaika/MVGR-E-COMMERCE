import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useMarket } from '../context/MarketContext';
import Layout from '../components/Layout';
import Input from '../components/Input';
import Button from '../components/Button';
import ImageUpload from '../components/ImageUpload';
import styles from './ReportItem.module.css';

const ReportItem = () => {
    const { user } = useAuth();
    const { addLostItem, updateLostItem } = useMarket();
    const navigate = useNavigate();
    const location = useLocation();
    const editingItem = location.state?.item;

    const [loading, setLoading] = useState(false);
    const [type, setType] = useState(editingItem?.type || 'lost');

    const [formData, setFormData] = useState({
        title: editingItem?.title || '',
        description: editingItem?.description || '',
        location: editingItem?.location || '',
        date: editingItem?.date || new Date().toISOString().split('T')[0],
        contact: editingItem?.contact || user?.mobile || '',
        image: editingItem?.image || '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editingItem) {
                await updateLostItem(editingItem.id, {
                    ...formData,
                    type,
                });
            } else {
                await addLostItem({
                    ...formData,
                    type,
                    reporterReg: user?.registerNumber,
                });
            }
            navigate('/lost-found');
        } catch (error) {
            console.error("Failed to save item:", error);
            alert("Failed to save item: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="container">
                <button className={styles.backBtn} onClick={() => navigate('/lost-found')}>
                    <FiArrowLeft /> Back to Lost & Found
                </button>

                <div className={styles.formCard}>
                    <h1 className={styles.title}>{editingItem ? 'Edit Item' : 'Report Item'}</h1>

                    <div className={styles.typeSelector}>
                        <button
                            className={`${styles.typeBtn} ${type === 'lost' ? styles.activeLost : ''}`}
                            onClick={() => setType('lost')}
                        >
                            {editingItem ? 'Lost Item' : 'I Lost Something'}
                        </button>
                        <button
                            className={`${styles.typeBtn} ${type === 'found' ? styles.activeFound : ''}`}
                            onClick={() => setType('found')}
                        >
                            {editingItem ? 'Found Item' : 'I Found Something'}
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <Input
                            label="Item Name / Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder={type === 'lost' ? "e.g. Blue Water Bottle" : "e.g. Set of Keys"}
                        />

                        <div className={styles.formGroup}>
                            <label>Description</label>
                            <textarea
                                name="description"
                                className={styles.textarea}
                                value={formData.description}
                                onChange={handleChange}
                                required
                                placeholder="Provide details about the item..."
                            />
                        </div>

                        <div className={styles.row}>
                            <Input
                                label="Location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                                placeholder={type === 'lost' ? "Where did you lose it?" : "Where did you find it?"}
                            />
                            <Input
                                label="Date"
                                name="date"
                                type="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <Input
                            label="Contact Info (Mobile/Reg No)"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            required
                        />

                        <ImageUpload
                            label="Item Image (Optional)"
                            onImageSelect={(img) => setFormData({ ...formData, image: img })}
                            initialImage={formData.image}
                        />

                        <Button
                            type="submit"
                            size="lg"
                            loading={loading}
                            fullWidth
                            className={type === 'lost' ? styles.btnLost : styles.btnFound}
                        >
                            {editingItem ? 'Update Item' : `Report ${type === 'lost' ? 'Lost' : 'Found'} Item`}
                        </Button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default ReportItem;
