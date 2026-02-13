import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{
                paddingTop: '80px',
                flex: 1,
                paddingBottom: '2rem'
            }}>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
