import React, { createContext, useState, useContext, useEffect } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile as updateFirebaseProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Helper to create email from register number for Auth purposes
    const getEmailFromReg = (regNo) => `${regNo.toLowerCase()}@mvgr-ecommerce.app`;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    // Fetch additional user details from Firestore
                    const docRef = doc(db, 'users', firebaseUser.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setUser({ ...docSnap.data(), uid: firebaseUser.uid });
                    } else {
                        // Fallback if firestore doc is missing (shouldn't happen ideally)
                        setUser({
                            uid: firebaseUser.uid,
                            email: firebaseUser.email,
                            role: 'buyer'
                        });
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const signup = async (regNo, password, role = 'buyer') => {
        const email = getEmailFromReg(regNo);

        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);

            // Create user document in Firestore
            const userData = {
                registerNumber: regNo.toUpperCase(),
                role: role,
                email: email, // Optional to store
                createdAt: new Date().toISOString(),
                fullName: '',
                address: '',
                mobile: '',
                avatar: ''
            };

            // Try to write to Firestore, but don't block forever if DB isn't set up
            try {
                const timeoutPromise = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error("Firestore timeout")), 5000)
                );
                await Promise.race([
                    setDoc(doc(db, 'users', result.user.uid), userData),
                    timeoutPromise
                ]);
            } catch (dbError) {
                console.error("Firestore Error (Account created but profile failed):", dbError);
                // We don't throw here, allowing the user to at least log in / exist.
                // The profile might be missing, but they can edit it later or we retry.
            }

            setUser({ ...userData, uid: result.user.uid });
            return true;
        } catch (error) {
            console.error("Signup Error:", error);
            throw error;
        }
    };

    const login = async (regNo, password) => {
        const email = getEmailFromReg(regNo);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return true;
        } catch (error) {
            console.error("Login Error:", error);
            throw error;
        }
    };

    const logout = () => {
        return signOut(auth);
    };

    const updateProfile = async (updatedData) => {
        if (!user) return;

        try {
            const userRef = doc(db, 'users', user.uid);
            await updateDoc(userRef, updatedData);

            // Update local state immediately for UI responsiveness
            setUser(prev => ({ ...prev, ...updatedData }));
        } catch (error) {
            console.error("Profile Update Error:", error);
            throw error;
        }
    };

    const updateRole = async (role) => {
        if (!user) return;
        try {
            await updateProfile({ role });
        } catch (error) {
            console.error("Role Update Error:", error);
        }
    };

    const value = {
        user,
        login,
        signup,
        logout,
        updateRole,
        updateProfile,
        loading
    };

    if (loading) {
        return (
            <div style={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#0f172a',
                color: '#fff'
            }}>
                Loading Authentication...
            </div>
        );
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
