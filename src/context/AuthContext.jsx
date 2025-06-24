// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        setError(null); // Reset error state
        try {
            const response = await axios.post('http://localhost:8080/authentication', {
                email,
                password,
            });

            const loggedInUser = response.data;
            setUser(loggedInUser);
            localStorage.setItem('user', JSON.stringify(loggedInUser)); // 👈 Store in localStorage

            if (loggedInUser.role === 'admin') {
                navigate('/admin');
                toast.success("User Login successfully!");
            } else {
                navigate('/');
                toast.success("Login successfully!");
                return true;
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Invalid email or password');
            return false; // Indicate failure
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); 
        navigate('/');
        toast.success("Logout successfully!");
    };

    return (
        <AuthContext.Provider value={{ user, login, loading, logout, isAuthenticated: !!user, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
