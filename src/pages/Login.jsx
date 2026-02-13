import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiLock, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import styles from './Login.module.css';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        regNumber: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { login, signup } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isLogin) {
                await login(formData.regNumber, formData.password);
            } else {
                await signup(formData.regNumber, formData.password);
            }
            navigate('/');
        } catch (err) {
            console.error(err);
            // Handle specific Firebase errors
            if (err.code === 'auth/weak-password') {
                setError("Password should be at least 6 characters.");
            } else if (err.code === 'auth/email-already-in-use') {
                setError("Account already exists. Try logging in.");
            } else if (err.code === 'auth/invalid-email') {
                setError("Invalid Register Number format.");
            } else {
                setError(err.message || "Error. Please check console/network.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            {/* Background Blobs */}
            <div className={styles.blob1}></div>
            <div className={styles.blob2}></div>

            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className="text-gradient">UniMarket</h1>
                    <p>{isLogin ? "Welcome back, Student!" : "Join the Community"}</p>
                </div>

                {error && (
                    <div className={styles.error}>
                        <FiAlertCircle /> {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className={styles.form}>
                    <Input
                        label="Register Number"
                        icon={FiUser}
                        type="text"
                        placeholder="e.g., 21331A0501"
                        value={formData.regNumber}
                        onChange={(e) => setFormData({ ...formData, regNumber: e.target.value })}
                        required
                    />

                    <Input
                        label="Password"
                        icon={FiLock}
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />

                    <Button type="submit" loading={loading} className={styles.submitBtn} fullWidth>
                        {isLogin ? "Login" : "Create Account"}
                    </Button>
                </form>

                <div className={styles.footer}>
                    <p>
                        {isLogin ? "First time here? " : "Already have an account? "}
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className={styles.linkBtn}
                        >
                            {isLogin ? "Create Account" : "Login"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
