import React from 'react';
import '../styles/Profile.css';

const Profile = () => {
    return (
        <main className="profile-main">
            <div className="profile-container">
                <div className="profile-header">
                    <img src="profile-pic.jpg" alt="Photo de profil" className="profile-pic"/>
                    <div className="profile-info">
                        <h2>Nom de l'Étudiant</h2>
                        <p>Université / Établissement</p>
                        <p><strong>Études:</strong> Informatique</p>
                        <p><strong>Statut:</strong> Étudiant(e)</p>
                    </div>
                </div>

                <section className="profile-courses">
                    <h3>Cours Suivis</h3>
                    <ul>
                        <li>Développement Web</li>
                        <li>Algorithmique</li>
                        <li>Base de Données</li>
                    </ul>
                </section>

                <section className="profile-posts">
                    <h3>Publications</h3>
                    <div className="post">
                        <p><strong>Titre de la publication</strong></p>
                        <p>Ceci est un extrait de la publication...</p>
                    </div>
                    <div className="post">
                        <p><strong>Titre de la publication</strong></p>
                        <p>Ceci est un extrait de la publication...</p>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Profile;
