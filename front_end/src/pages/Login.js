import React, { useState } from 'react';
import '../styles/App.css';
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

         // Envoi d'une requête POST à l'API pour la connexion
        const response = await fetch("http://localhost:8082/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email.toLowerCase(), password }),
          })
          switch (response.status) {
            case 200:
              const {name} = await response.json()  // Récupération du nom de l'utilisateur depuis la réponse JSON
              localStorage.setItem("user",name) // Stockage du nom de l'utilisateur dans le localStorage
              navigate("/") // Redirection vers la page d'accueil en cas de succès
              break

            case 409:
              alert("Erreur authentification")
              break
              case 500:
                alert("Erreur serveur")
                break
            default:
                alert("Erreur inconnue")

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
