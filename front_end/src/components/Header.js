import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './logo.png';
import '../styles/App.css';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
    const { connected, logout } = useContext(AuthContext);  // Récupère l'état et les actions depuis le contexte

    const navigate = useNavigate();

    // Fonction de déconnexion avec redirection
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header>
            <div className="logo-title-container">
                <img src={logo} alt="Logo" className="logo" />
                <span className="site-title">MeduS</span>
            </div>
            <nav>
                <ul>
                    {connected && <li><Link to="/">Accueil</Link></li>}
                    {connected && <li><Link to="/publications">Publications</Link></li>}
                    {connected && <li><Link to="/messages">Messages</Link></li>}
                    {!connected && <li><Link to="/signup">Charte</Link></li>}
                    {!connected && <li><Link to="/login">S'identifier</Link></li>}
                    {connected && <li><Link to="/profile">Profil</Link></li>}
                    {connected && <li onClick={handleLogout}><Link>Logout</Link></li>}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
