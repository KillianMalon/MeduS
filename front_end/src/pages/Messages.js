import React, { useState } from 'react';
import Chat from '../components/Chat';
import '../styles/App.css';

const Message = () => {
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
            <h2>Envoyer des messages à vos amis</h2>
            
            {/* Affichage des posts */}
            <section className="content">
                
                {/* Conteneur pour la barre des catégories et le chat */}
                <div className="sidebar-chat-container">

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

export default Message;