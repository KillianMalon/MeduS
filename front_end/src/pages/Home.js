import React, { useState } from 'react';
import Chat from '../components/Chat';
import '../styles/App.css';

const Home = () => {
    // État pour les posts
    const [newPost, setNewPost] = useState('');
    const [posts, setPosts] = useState([]);

    // État pour les messages de chat
    const [chatMessage, setChatMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);

    // Fonction pour gérer l'ajout d'un nouveau post
    const handlePostSubmit = (e) => {
        e.preventDefault();
        const newPostData = {
            author: "Moi",  // Nom par défaut de l'utilisateur
            content: newPost,
            timestamp: new Date().toLocaleString(),
        };
        setPosts([...posts, newPostData]);
        setNewPost(''); // Réinitialise le champ de texte après la publication
    };

    // Fonction pour gérer l'envoi de messages de chat
    const handleChatSubmit = (e) => {
        e.preventDefault();
        if (chatMessage) {
            const newChatMessage = {
                author: "Moi",  // Nom par défaut de l'utilisateur
                content: chatMessage,
                timestamp: new Date().toLocaleTimeString(),
            };
            setChatMessages([...chatMessages, newChatMessage]); // Ajouter le nouveau message à la liste
            setChatMessage(''); // Réinitialise le champ de saisie après l'envoi
        }
    };

    return (
        <main>
            <h2>Fil d'actualités</h2>
            <div class="post">
                <h3>Événements à venir</h3>
                <p>Ne manquez pas nos événements étudiants ce mois-ci !</p>
                <button>Voir tous les événements</button>
            </div>

            {/* Section pour ajouter un post */}
            <section className="create-post">
                <h2>Ajouter un post</h2>
                <form onSubmit={handlePostSubmit}>
                    <textarea
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        placeholder="Quoi de neuf ?"
                        required
                    />
                    <button type="submit">Publier</button>
                </form>
            </section>

            {/* Affichage des posts */}
            <section className="content">
                <div className="feed">
                    <h2>Derniers posts</h2>
                    {posts.length > 0 ? (
                        posts.map((post, index) => (
                            <div key={index} className="post">
                                <h4>{post.author}</h4> {/* Afficher le nom de l'auteur */}
                                <p>{post.content}</p>
                                <span>{post.timestamp}</span>
                            </div>
                        ))
                    ) : (
                        <p>Aucun post pour le moment.</p>
                    )}
                </div>

                {/* Conteneur pour la barre des catégories et le chat */}
                <div className="sidebar-chat-container">
                    {/* Sidebar des catégories */}
                    <aside className="sidebar">
                        <h2>Catégories</h2>
                        <ul>
                            <li><a href="#">Technologie</a></li>
                            <li><a href="#">Santé</a></li>
                            <li><a href="#">Éducation</a></li>
                            <li><a href="#">Sports</a></li>
                            <li><a href="#">Arts</a></li>
                        </ul>
                    </aside>

                    {/* Fenêtre de chat */}
                    <section className="chat-bar">
                        <h2>Chat en direct</h2>

                        <Chat />

                        

                    </section>

                    
                </div>
            </section>
        </main>
    );
};

export default Home;
