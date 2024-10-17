import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer.js';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Message from './pages/Messages';
import Publications from './pages/Publications';
import { AuthProvider } from './context/AuthContext';  // Importe le fournisseur de contexte d'authentification
import './styles/App.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Header />
                    <Routes>
                        <Route path="/" exact element={<Home />} />
                        {/* <Route path="/home" exact element={<Home />} /> */}
                        <Route path="/login" element={<Login />} /> 
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/messages" element={<Message />} />
                        <Route path="/publications" element={<Publications />} />
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
