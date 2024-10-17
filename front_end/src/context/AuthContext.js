import React, { createContext, useState, useEffect } from 'react';

// Crée un contexte d'authentification
export const AuthContext = createContext();

// Fournisseur du contexte d'authentification
export const AuthProvider = ({ children }) => {
    const [connected, setConnected] = useState(false);

    // Vérifie l'utilisateur dans localStorage au chargement
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setConnected(true);
        }
    }, []);

    // Fonction pour simuler la connexion
    const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        setConnected(true);
    };

    // Fonction pour se déconnecter
    const logout = () => {
        localStorage.removeItem("user");
        setConnected(false);
    };

    return (
        <AuthContext.Provider value={{ connected, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
