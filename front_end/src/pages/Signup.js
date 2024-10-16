import React, { useState } from 'react';
import '../styles/App.css';
import { useNavigate } from "react-router-dom"; //useNavigate pour la navigation 


const Signup = () => {
      // Définition des état des identifiants
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Fonction de gestion de la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
           
       // Envoi d'une requête POST à l'API pour l'inscription 
        const response = await fetch("http://localhost:7000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email: email.toLowerCase(), password }),
          })

          // Gestion des réponses en fonction du statut HTTP
          switch (response.status) {
            case 200:
              navigate("/login") // Redirection vers la page de connexion en cas de succès
              break
            case 500:
              alert("Erreur serveur") // Alerte en cas d'erreur serveur
              break

          }
      
    };

    return (
        <main>
            <section className="form-container">
                <h2>Inscription</h2>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Nom :</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)} // Mise à jour de l'état lors de la saisie
                        required
                    />
                    <label htmlFor="email">Email :</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    <button type="submit">Inscription</button>
                </form>
                
                <p>Déjà un compte ? <a href="/login"style={{color: '#6a5acd'}}>Connectez-vous</a></p>
            </section>
        </main>
    );
};

export default Signup;
