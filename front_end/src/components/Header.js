import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import '../styles/App.css';

const Header = () => {
    const [connected, setConnected] = useState(false);  // État pour la connexion

    setInterval(() => {
        const user = localStorage.getItem("user");
        user && setConnected(true);
    }, 100);

    // Fonction de déconnexion
    const logout = () => {
        localStorage.removeItem("user");  // Suppression de l'utilisateur du localStorage
        window.location.reload();  // Rechargement de la page
    };

    return (
        <header>
            <div className="logo-title-container">
                <img src={logo} alt="Logo" className="logo" />
                <span className="site-title">MeduS</span>
            </div>
            <nav>
                <ul>
                    <li><Link to="/">Accueil</Link></li>
                    <li><Link to="/login">S'identifier</Link></li>
                    <li><Link to="/profile">Profil</Link></li>
                    {
                        connected && <li><button onClick={logout}>Logout</button></li>
                    }
                </ul>
            </nav>
        </header>
    );
};

export default Header;