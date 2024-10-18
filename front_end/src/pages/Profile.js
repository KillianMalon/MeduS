import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Profile.css';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
    const { token } = useContext(AuthContext); // Récupérer le token depuis AuthContext
    const navigate = useNavigate(); // Hook pour rediriger l'utilisateur

    const [profileData, setProfileData] = useState(null); // État pour stocker les données du profil
    const [posts, setPosts] = useState([]); // État pour stocker les publications de l'utilisateur
    const [loading, setLoading] = useState(true); // État pour gérer le chargement

    // Utiliser useEffect pour rediriger si l'utilisateur n'est pas connecté
    useEffect(() => {
        if (!token) {
            navigate('/login'); // Redirection vers la page de connexion si non connecté
        }
    }, [token, navigate]);

    // Utiliser useEffect pour appeler l'API au montage du composant
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                // Appel API pour récupérer les données de profil
                const response = await axios.get('http://localhost:8082/profile/profile/', {
                    headers: {
                        Authorization: `Bearer ${token}` // Inclure le token dans l'en-tête Authorization
                    }
                });

                setProfileData(response.data.profile); // Stocker les données du profil dans l'état
                
                // Récupérer les posts de l'utilisateur
                const userId = response.data.profile._id; // Remplace par la propriété correcte qui contient l'ID de l'utilisateur
                const postsResponse = await axios.get(`http://localhost:8082/post/posts/postsByUserId/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log(postsResponse.data); // Pour vérifier la structure des données retournées

                setPosts(postsResponse.data); // Stocker les posts dans l'état
                setLoading(false); // Arrêter le chargement
            } catch (error) {
                console.error("Erreur lors de la récupération des données du profil :", error);
                setLoading(false); // Arrêter le chargement même en cas d'erreur
            }
        };

        if (token) {
            fetchProfileData(); // Appeler la fonction si le token est disponible
        }
    }, [token]);

    if (loading) {
        return <div>Chargement...</div>; // Afficher un message de chargement
    }

    // Vérification si profileData existe avant d'essayer d'accéder aux propriétés
    if (!profileData) {
        return <div>Impossible de charger les données du profil.</div>; // Message d'erreur si les données ne sont pas récupérées
    }

    // Maintenant, nous accédons directement à profileData sans user
    const { firstname_user, lastname_user, email_user, subjects, school_user, picture_path_user, class_user } = profileData;

    return (
        <main className="profile-main">
            <div className="profile-container">
                <div className="profile-header">
                    <img src={picture_path_user} alt={`${firstname_user} ${lastname_user}`} className="profile-pic" />
                    <div className="profile-info">
                        <h2>{firstname_user} {lastname_user}</h2>
                        <p><strong>Email:</strong> {email_user}</p>
                        <p><strong>Classe:</strong> {class_user}</p>
                        <p><strong>Université / Établissement :</strong> {school_user}</p>
                        <p><strong>Études:</strong> {subjects ? subjects.join(', ') : 'N/A'}</p>
                        <p><strong>Statut:</strong> Étudiant(e)</p>
                    </div>
                </div>

                <section className="profile-courses">
                    <h3>Cours Suivis</h3>
                    <ul>
                        {subjects ? subjects.map((subject) => (
                            <li key={subject}>{subject}</li>
                        )) : (
                            <li>Aucun cours suivi</li>
                        )}
                    </ul>
                </section>

                <section className="profile-posts">
                    <h3>Publications</h3>
                    {posts && posts.length > 0 ? posts.map((post, index) => (
                        <div className="post" key={index}>
                            <p><strong>Posté le :</strong> {new Date(post.createdAt).toLocaleDateString()}</p>
                            <p>{post.content}</p>

                            {/* Afficher l'image ou la vidéo si elle existe */}
                            {post.media && post.mediaType !== 'none' && (
                                post.mediaType === 'image' ? (
                                    <img src={post.media} alt="Media" className="post-media" />
                                ) : post.mediaType === 'video' ? (
                                    <video controls className="post-media">
                                        <source src={post.media} type="video/mp4" />
                                        Votre navigateur ne supporte pas la lecture de vidéos.
                                    </video>
                                ) : null
                            )}

                            <p><strong>Likes :</strong> {post.likes.length}</p>
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
