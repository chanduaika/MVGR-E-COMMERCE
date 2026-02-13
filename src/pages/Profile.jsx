import React, { useState } from 'react';
import { FiUser, FiMapPin, FiPhone, FiBox, FiAlertCircle, FiEdit2, FiCheck, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useMarket } from '../context/MarketContext';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import LostFoundCard from '../components/LostFoundCard';
import Button from '../components/Button';
import Input from '../components/Input';
import ImageUpload from '../components/ImageUpload';
import styles from './Profile.module.css';

const Profile = () => {
    const { user, updateProfile } = useAuth();
    const { products, lostItems } = useMarket();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        fullName: user?.fullName || '',
        address: user?.address || '',
        mobile: user?.mobile || '',
        avatar: user?.avatar || ''
    });

    // Filter items added by this user (Mock logic: In real app, use ID)
    // Here we use register number match for sellerReg or reporterReg
    const myProducts = products.filter(p => p.sellerReg === user?.registerNumber);
    const myLostFound = lostItems.filter(i => i.reporterReg === user?.registerNumber);

    const handleEditToggle = () => {
        if (!isEditing) {
            setFormData({
                fullName: user?.fullName || '',
                address: user?.address || '',
                mobile: user?.mobile || '',
                avatar: user?.avatar || ''
            });
        }
        setIsEditing(!isEditing);
    };

    const handleSave = async () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            updateProfile(formData);
            setIsEditing(false);
            setLoading(false);
        }, 1000);
    };

    return (
        <Layout>
            <div className="container">
                <div className={styles.profileHeader}>
                    {isEditing ? (
                        <div className={styles.editForm}>
                            <div className={styles.avatarEdit}>
                                <ImageUpload
                                    onImageSelect={(img) => setFormData({ ...formData, avatar: img })}
                                    initialImage={formData.avatar}
                                />
                            </div>
                            <div className={styles.infoEdit}>
                                <Input
                                    label="Full Name"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                />
                                <Input
                                    label="Hostel / Address"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                />
                                <Input
                                    label="Mobile Number"
                                    value={formData.mobile}
                                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                />
                                <div className={styles.actions}>
                                    <Button onClick={handleSave} loading={loading}><FiCheck /> Save Changes</Button>
                                    <Button variant="secondary" onClick={handleEditToggle} disabled={loading}><FiX /> Cancel</Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className={styles.avatarWrapper}>
                                <img src={user?.avatar} alt="Profile" className={styles.avatar} />
                            </div>
                            <div className={styles.userInfo}>
                                <div className="flex-between">
                                    <div>
                                        <h1 className={styles.name}>{user?.fullName || "Student Name"}</h1>
                                        <p className={styles.regNumber}>{user?.registerNumber}</p>
                                    </div>
                                    <Button variant="outline" size="sm" onClick={handleEditToggle} className={styles.editBtn}>
                                        <FiEdit2 /> Edit Profile
                                    </Button>
                                </div>

                                <div className={styles.details}>
                                    <div className={styles.detailItem}>
                                        <FiMapPin /> <span>{user?.address || "No address set"}</span>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <FiPhone /> <span>{user?.mobile || "No mobile set"}</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <FiBox /> My Listings ({myProducts.length})
                    </h2>
                    <div className={styles.grid}>
                        {myProducts.length > 0 ? (
                            myProducts.map(p => <ProductCard key={p.id} product={p} />)
                        ) : (
                            <p className={styles.empty}>You haven't listed any products yet.</p>
                        )}
                    </div>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <FiAlertCircle /> My Lost & Found Reports ({myLostFound.length})
                    </h2>
                    <div className={styles.grid}>
                        {myLostFound.length > 0 ? (
                            myLostFound.map(item => <LostFoundCard key={item.id} item={item} />)
                        ) : (
                            <p className={styles.empty}>No lost/found reports.</p>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
