import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Attention à l'import correct
import { useNavigate } from 'react-router-dom';

// Crée un contexte d'authentification
export const AuthContext = createContext();

// Fournisseur du contexte d'authentification
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token')); // Charger le token depuis le localStorage au démarrage
    const [user, setUser] = useState(token ? jwtDecode(token) : null); // Décoder l'utilisateur si le token existe
    const navigate = useNavigate();

    // Fonction pour vérifier si le token est expiré
    const isTokenExpired = (token) => {
        if (!token) return true; // Si le token est null ou undefined, considère qu'il est expiré.
        
        try {
            const decoded = jwtDecode(token);
            // Logique pour vérifier l'expiration du token
            const currentTime = Date.now() / 1000; // En secondes
            return decoded.exp < currentTime; // Vérifie si le token a expiré
        } catch (error) {
            console.error("Erreur lors du décodage du token :", error);
            return true; // Si le token est invalide, on considère qu'il est expiré
        }
    };

    // Vérifie l'existence d'un token dans le localStorage et sa validité au chargement
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            // Vérifier si le token est expiré
            if (isTokenExpired(savedToken)) {
                logout(); // Si expiré, on déconnecte
            } else {
                setToken(savedToken); // Si valide, on le garde
                setUser(jwtDecode(savedToken)); // Décoder et stocker l'utilisateur
            }
        }
    }, []);

    // Fonction pour simuler la connexion
    const login = (jwtToken) => {
        try {
            const decodedToken = jwtDecode(jwtToken);  // Décodage du token pour récupérer les infos de l'utilisateur
            setToken(jwtToken);  // Mettre à jour le token dans l'état
            setUser(decodedToken); // Mettre à jour l'utilisateur
            localStorage.setItem('token', jwtToken);  // Stocker le token dans localStorage
        } catch (error) {
            console.error("Erreur lors du décodage du token :", error);
        }
    };

    // Fonction pour se déconnecter
    const logout = () => {
        localStorage.removeItem("token"); // Supprimer le token du localStorage
        setToken(null); // Réinitialiser le token dans l'état
        setUser(null);  // Réinitialiser l'utilisateur dans l'état
        navigate('/login'); // Rediriger vers la page de connexion
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
