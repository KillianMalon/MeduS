import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate pour rediriger
import axios from 'axios';
import '../styles/Profile.css';
import { AuthContext } from '../context/AuthContext'; // Importer AuthContext pour vérifier la connexion

const Profile = () => {
    const { connected } = useContext(AuthContext); // Récupérer l'état connecté depuis AuthContext
    const navigate = useNavigate(); // Hook pour rediriger l'utilisateur

    const [profileData, setProfileData] = useState(null); // État pour stocker les données du profil
    const [loading, setLoading] = useState(true); // État pour gérer le chargement

    // Utiliser useEffect pour rediriger si l'utilisateur n'est pas connecté
    useEffect(() => {
        if (!connected) {
            navigate('/login'); // Redirection vers la page de connexion si non connecté
        }
    }, [connected, navigate]);

    // Utiliser useEffect pour appeler l'API au montage du composant
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get('http://localhost:8082/profile/profile/');
                setProfileData(response.data); // Stocke les données dans l'état
                setLoading(false); // Arrête le chargement
            } catch (error) {
                console.error("Erreur lors de la récupération des données du profil :", error);
                setLoading(false); // Arrête le chargement même en cas d'erreur
            }
        };

        fetchProfileData();
    }, []);

    if (loading) {
        return <div>Chargement...</div>; // Afficher un message de chargement
    }

    if (!profileData) {
        return <div>Impossible de charger les données du profil.</div>; // Message d'erreur
    }

    // Extraire les données du profil et des publications
    const { user, posts } = profileData;

    return (
        <main className="profile-main">
            <div className="profile-container">
                <div className="profile-header">
                    <img src="profile-pic.jpg" alt="Photo de profil" className="profile-pic"/>
                    <div className="profile-info">
                        <h2>{user.firstname_user} {user.lastname_user}</h2>
                        <p>Université / Établissement</p>
                        <p><strong>Études:</strong> {user.studied_subjects.join(', ')}</p>
                        <p><strong>Statut:</strong> Étudiant(e)</p>
                    </div>
                </div>

                <section className="profile-courses">
                    <h3>Cours Suivis</h3>
                    <ul>
                        {user.studied_subjects.map((subject, index) => (
                            <li key={index}>{subject}</li>
                        ))}
                    </ul>
                </section>

                <section className="profile-posts">
                    <h3>Publications</h3>
                    {posts.length > 0 ? posts.map((post, index) => (
                        <div className="post" key={index}>
                            <p><strong>{post.title}</strong></p>
                            <p>{post.content}</p>
                        </div>
                    )) : (
                        <p>Aucune publication trouvée.</p>
                    )}
                </section>
            </div>
        </main>
    );
};

export default Profile;
