import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUpload, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useMarket } from '../context/MarketContext';
import Layout from '../components/Layout';
import Input from '../components/Input';
import Button from '../components/Button';
import ImageUpload from '../components/ImageUpload';
import styles from './Sell.module.css';

const Sell = () => {
    const { user } = useAuth();
    const { addProduct } = useMarket();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        address: user?.address || '',
        mobile: user?.mobile || '',
        image: '', // Mocking image upload
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            addProduct({
                ...formData,
                sellerName: user?.fullName || `Student ${user?.registerNumber}`,
                sellerReg: user?.registerNumber,
                contact: formData.mobile,
                contactType: 'whatsapp', // Defaulting to whatsapp for now
                image: formData.image || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=400' // Default placeholder
            });
            setLoading(false);
            navigate('/market');
        }, 1000);
    };

    return (
        <Layout>
            <div className="container">
                <button className={styles.backBtn} onClick={() => navigate('/')}>
                    <FiArrowLeft /> Back to Dashboard
                </button>

                <div className={styles.formCard}>
                    <h1 className={styles.title}>List Item for Sale</h1>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.section}>
                            <h3>Product Details</h3>
                            <Input
                                label="Product Name"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                placeholder="e.g. Engineering Physics Textbook"
                            />
                            <Input
                                label="Price (₹)"
                                name="price"
                                type="number"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                placeholder="e.g. 500"
                            />
                            <div className={styles.formGroup}>
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    className={styles.textarea}
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    placeholder="Describe condition, usage, etc."
                                />
                            </div>

                            <ImageUpload
                                label="Product Image"
                                onImageSelect={(img) => setFormData({ ...formData, image: img })}
                                initialImage={formData.image}
                            />
                        </div>

                        <div className={styles.section}>
                            <h3>Seller Details</h3>
                            <Input
                                label="Full Name"
                                value={user?.fullName || "Student Name"}
                                disabled
                            />
                            <Input
                                label="Register Number"
                                value={user?.registerNumber}
                                disabled
                            />
                            <Input
                                label="Address / Hostel Room"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                                placeholder="e.g. Boys Hostel A-101"
                            />
                            <Input
                                label="Mobile Number (WhatsApp)"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                required
                                placeholder="e.g. 9876543210"
                            />
                        </div>

                        <Button type="submit" size="lg" loading={loading} fullWidth>
                            List Item
                        </Button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Sell;
