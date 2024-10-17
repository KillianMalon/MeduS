import React, { useState } from 'react';
import '../styles/App.css';
import { useNavigate } from "react-router-dom";

const Signup = () => {
    // Define state for all form fields
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [picture, setPicture] = useState('');
    const [cgu, setCgu] = useState(false);  // For CGU acceptance
    const [newsletter, setNewsletter] = useState(false);  // Optional newsletter
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const signupData = {
            lastname_user: lastname,
            firstname_user: firstname,
            birthdate_user: birthdate,
            email_user: email.toLowerCase(),
            phone_user: phone,
            password_user: password,
            picture_path_user: picture,
            cgu_user: cgu,  // Required to be true
            newsletter_user: newsletter  // Optional
        };

        // Send POST request to the API
        const response = await fetch("http://localhost:8082/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(signupData),
        });

        // Handle response status
        switch (response.status) {
            case 200:
                navigate("/login");  // Redirect to login page on success
                break;
            case 500:
                alert("Erreur serveur");  // Server error
                break;
            default:
                alert("Erreur inconnue");
                break;
        }
    };

    return (
        <main>
            <section className="form-container">
                <h2>Inscription</h2>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="lastname">Nom de famille :</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        required
                    />

                    <label htmlFor="firstname">Prénom :</label>
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        required
                    />

                    <label htmlFor="birthdate">Date de naissance :</label>
                    <input
                        type="date"
                        id="birthdate"
                        name="birthdate"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
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

                    <label htmlFor="phone">Téléphone (10 chiffres) :</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
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

                    <label htmlFor="picture">URL de l'image de profil (facultatif) :</label>
                    <input
                        type="text"
                        id="picture"
                        name="picture"
                        value={picture}
                        onChange={(e) => setPicture(e.target.value)}
                    />

                    <label>
                        <input
                            type="checkbox"
                            name="cgu"
                            checked={cgu}
                            onChange={(e) => setCgu(e.target.checked)}
                            required
                        />
                        J'accepte les conditions générales
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            name="newsletter"
                            checked={newsletter}
                            onChange={(e) => setNewsletter(e.target.checked)}
                        />
                        S'abonner à la newsletter (facultatif)
                    </label>

                    <button type="submit">Inscription</button>
                </form>

                <p>Déjà un compte ? <a href="/login" style={{ color: '#6a5acd' }}>Connectez-vous</a></p>
            </section>
        </main>
    );
};

export default Signup;
