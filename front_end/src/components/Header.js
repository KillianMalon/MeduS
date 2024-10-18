import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './logo.png';
import '../styles/App.css';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
    const { token, logout } = useContext(AuthContext);  // Récupère l'état et les actions depuis le contexte

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
                    {token && <li><Link to="/">Accueil</Link></li>}
                    {token && <li><Link to="/publications">Publications</Link></li>}
                    {token && <li><Link to="/messages">Messages</Link></li>}
                    {!token && <li><Link to="/signup">Charte</Link></li>}
                    {!token && <li><Link to="/login">S'identifier</Link></li>}
                    {token && <li><Link to="/profile">Profil</Link></li>}
                    {token && <li onClick={handleLogout}><Link>Logout</Link></li>}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
