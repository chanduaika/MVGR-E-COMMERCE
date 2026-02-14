import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './AuthContext';

const MarketContext = createContext();

export const useMarket = () => useContext(MarketContext);

export const MarketProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [lostItems, setLostItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth(); // To access current user info for creating items

    // Real-time listener for Products
    useEffect(() => {
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const productsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProducts(productsData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching products:", error);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    // Real-time listener for Lost & Found
    useEffect(() => {
        const q = query(collection(db, 'lostFound'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const itemsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setLostItems(itemsData);
        }, (error) => {
            console.error("Error fetching lost items:", error);
        });

        return unsubscribe;
    }, []);

    const addProduct = async (product) => {
        try {
            await addDoc(collection(db, 'products'), {
                ...product,
                createdAt: serverTimestamp(),
                sellerReg: user?.registerNumber,
                sellerName: user?.fullName || 'Unknown' // Store denormalized data for easier display
            });
        } catch (error) {
            console.error("Error adding product:", error);
            throw error;
        }
    };

    const addLostItem = async (item) => {
        try {
            await addDoc(collection(db, 'lostFound'), {
                ...item,
                createdAt: serverTimestamp(),
                reporterReg: user?.registerNumber
            });
        } catch (error) {
            console.error("Error adding lost item:", error);
            throw error;
        }
    };

    const deleteLostItem = async (id) => {
        try {
            await deleteDoc(doc(db, 'lostFound', id));
        } catch (error) {
            console.error("Error deleting lost item:", error);
            throw error;
        }
    };

    const updateLostItem = async (id, data) => {
        try {
            const itemRef = doc(db, 'lostFound', id);
            await updateDoc(itemRef, {
                ...data,
                updatedAt: serverTimestamp()
            });
        } catch (error) {
            console.error("Error updating lost item:", error);
            throw error;
        }
    };

    const value = {
        products,
        lostItems,
        loading,
        addProduct,
        addLostItem,
        deleteLostItem,
        updateLostItem
    };

    return (
        <MarketContext.Provider value={value}>
            {children}
        </MarketContext.Provider>
    );
};

// Mock Data
const INITIAL_PRODUCTS = [
    {
        id: '1',
        title: 'Engineering Mathematics Textbook',
        description: 'First year engineering mathematics book, good condition.',
        price: '300',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400',
        sellerName: 'John Doe',
        sellerReg: '21B01A001',
        contact: 'john@example.com', // can be email or phone
        contactType: 'email'
    },
    {
        id: '2',
        title: 'Scientific Calculator fx-991EX',
        description: 'Barely used calculator, original box included.',
        price: '800',
        image: 'https://images.unsplash.com/photo-1574607383476-f517b260d35b?auto=format&fit=crop&q=80&w=400',
        sellerName: 'Jane Smith',
        sellerReg: '21B01A002',
        contact: '9876543210',
        contactType: 'whatsapp'
    },
    {
        id: '3',
        title: 'Drafter for Engineering Drawing',
        description: 'Mini drafter with scale and clips.',
        price: '250',
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=400',
        sellerName: 'Mike Ross',
        sellerReg: '21B01A003',
        contact: 'mike@example.com',
        contactType: 'email'
    }
];

const INITIAL_LOST_ITEMS = [
    {
        id: '1',
        type: 'lost',
        title: 'Blue Water Bottle',
        description: 'Lost my blue Milton bottle in the library.',
        location: 'Library 2nd Floor',
        image: 'https://images.unsplash.com/photo-1602143407151-01114192003b?auto=format&fit=crop&q=80&w=400',
        contact: '21B01A001',
        date: '2023-10-25'
    },
    {
        id: '2',
        type: 'found',
        title: 'Car Keys',
        description: 'Found a set of car keys near the canteen.',
        location: 'Canteen',
        image: 'https://images.unsplash.com/photo-1622630988019-22a466487920?auto=format&fit=crop&q=80&w=400',
        contact: '21B01A002',
        date: '2023-10-26'
    }
];
