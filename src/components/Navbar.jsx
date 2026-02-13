import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiHome, FiShoppingBag, FiPlusSquare, FiAlertTriangle, FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import styles from './Navbar.module.css';
import clsx from 'clsx';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className={styles.navbar}>
            <div className={clsx("container", styles.navContainer)}>
                <div className={styles.logo} onClick={() => navigate('/')}>
                    <span className="text-gradient">UniMarket</span>
                </div>

                <ul className={styles.navLinks}>
                    <li>
                        <NavLink to="/" className={({ isActive }) => clsx(styles.link, isActive && styles.active)}>
                            <FiHome /> <span>Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/market" className={({ isActive }) => clsx(styles.link, isActive && styles.active)}>
                            <FiShoppingBag /> <span>Market</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/lost-found" className={({ isActive }) => clsx(styles.link, isActive && styles.active)}>
                            <FiAlertTriangle /> <span>Lost & Found</span>
                        </NavLink>
                    </li>
                </ul>

                <div className={styles.profileSection}>
                    <NavLink to="/profile" className={styles.profileLink}>
                        {user?.avatar ? (
                            <img src={user.avatar} alt="Profile" className={styles.avatar} />
                        ) : (
                            <FiUser />
                        )}
                        <span className={styles.userName}>{user?.name || user?.registerNumber}</span>
                    </NavLink>

                    <button onClick={handleLogout} className={styles.logoutBtn} title="Logout">
                        <FiLogOut />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
