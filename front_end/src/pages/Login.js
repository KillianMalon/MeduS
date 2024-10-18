import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';  // Importe le contexte

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);  // On récupère la fonction login du contexte
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Envoi de la requête POST à l'API pour la connexion
            const response = await fetch("http://localhost:8082/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.toLowerCase(), password }),
            });

            switch (response.status) {
                case 200:
                    // Récupérer la réponse JSON complète
                    const data = await response.json();
                    console.log("Réponse complète :", data);  // Log toute la réponse

                    const token = data.jwt;  // Utiliser "jwt" au lieu de "token"
                    console.log("Token reçu :", token);  // Vérifie que le token est bien reçu

                    if (token) {
                        // Appelle la fonction login du contexte avec le token
                        login(token);
                        // Redirection vers la page d'accueil ou de profil
                        navigate('/');
                    } else {
                        alert("Token manquant dans la réponse");
                    }
                    break;

                case 409:
                    alert("Erreur d'authentification");
                    break;

                case 500:
                    alert("Erreur serveur");
                    break;

                default:
                    alert("Erreur inconnue");
            }
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            alert("Erreur lors de la connexion");
        }
    };

    return (
        <main>
            <section className="form-container">
                <h2>Connexion</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email :</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Mise à jour de l'état lors de la saisie
                        required
                    />
                    <label htmlFor="password">Mot de passe :</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Connexion</button>
                </form>
                <p>Pas encore de compte ? <a href="/signup" style={{color: '#6a5acd'}}>Inscrivez-vous</a></p>
            </section>
        </main>
    );
};

export default Login;
