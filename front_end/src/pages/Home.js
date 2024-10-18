import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate pour rediriger
import Chat from '../components/Chat';
import '../styles/App.css';
import imageEvents from '../components/istockphoto-1338737959-1024x1024.jpg';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
    const { token } = useContext(AuthContext); // Récupérer l'état connecté depuis AuthContext
    const navigate = useNavigate(); // Hook pour rediriger l'utilisateur

    // Utiliser useEffect pour rediriger si l'utilisateur n'est pas connecté
    useEffect(() => {
        if (!token) {
            navigate('/login'); // Redirection vers la page de connexion si non connecté
        }
    }, [token, navigate]); // Déclencher l'effet si token change

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

    const events = [
        { title: "Soirée Cinéma en Plein Air", date: "25 octobre 2024", time: "19h00 - 22h00", location: "Cour principale", description: "Venez profiter d'une projection en plein air d'un film choisi par les étudiants !", imageUrl: imageEvents },
        { title: "Journée des Portes Ouvertes", date: "10 novembre 2024", time: "9h00 - 16h00", location: "Campus principal", description: "Découvrez les coulisses de notre collège avec des visites guidées, des démonstrations et des rencontres avec les professeurs.", imageUrl: imageEvents },
        { title: "Tournoi de Basketball Interclasses", date: "3 décembre 2024", time: "14h00 - 18h00", location: "Gymnase du collège", description: "Participez ou assistez au grand tournoi de basketball entre les classes. Les équipes gagnantes recevront des prix !", imageUrl: imageEvents },
        { title: "Conférence 'L'Impact du Climat sur le Futur'", date: "15 novembre 2024", time: "16h00 - 18h00", location: "Amphithéâtre A", description: "Une conférence spéciale donnée par un expert en climatologie. Venez en apprendre plus sur les défis climatiques.", imageUrl: imageEvents },
        { title: "Soirée Talent Show", date: "20 décembre 2024", time: "18h00 - 21h00", location: "Salle de spectacle", description: "Montrez vos talents à la communauté étudiante lors de notre soirée Talent Show !", imageUrl: imageEvents },
        { title: "Club de Lecture - Séance Mensuelle", date: "5 novembre 2024", time: "17h00 - 18h30", location: "Bibliothèque du collège", description: "Discutez du livre du mois, 1984 de George Orwell, lors de notre club de lecture.", imageUrl: imageEvents },
        { title: "Journée de la Science", date: "12 décembre 2024", time: "10h00 - 16h00", location: "Hall des sciences", description: "Découvrez des projets scientifiques réalisés par les étudiants lors de notre Journée de la Science.", imageUrl: imageEvents },
        { title: "Spectacle de Noël", date: "22 décembre 2024", time: "19h00 - 21h00", location: "Théâtre du collège", description: "Une soirée magique pour célébrer Noël avec des performances artistiques des étudiants.", imageUrl: imageEvents }
    ];

    return (
        <main>
            <h1>Bienvenue à tous sur le réseau social MeduS</h1>
            <h2>Événements à venir</h2>
            <div className="events-container">
                {events.map((event, index) => (
                    <div key={index} className="event-card">
                        <div className="event-image">
                            <img src={event.imageUrl} alt={event.title} />
                        </div>
                        <div className="event-details">
                            <h3>{event.title}</h3>
                            <p><strong>Date :</strong> {event.date}</p>
                            <p><strong>Heure :</strong> {event.time}</p>
                            <p><strong>Lieu :</strong> {event.location}</p>
                            <p>{event.description}</p>
                            <button>Voir plus</button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default Home;
