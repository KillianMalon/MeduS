import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/App.css';
import '../styles/Publications.css';
import { AuthContext } from '../context/AuthContext';

const Publications = () => {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    const [newPost, setNewPost] = useState('');
    const [posts, setPosts] = useState([]);
    const [selectedFile, setSelectedFile] = useState('');
    const [filePreview, setFilePreview] = useState('');
    const [profileData, setProfileData] = useState('');
    const [loading, setLoading] = useState(true); // État pour gérer le chargement

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        if (file) {
            setFilePreview(URL.createObjectURL(file));
        } else {
            setFilePreview(null);
        }
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            user: token.id,
            content: newPost,
            media: 'https://i.ibb.co/2W3K3TC/istockphoto-1338737959-1024x1024.jpg',
            mediaType: 'image'
        }

        try {
            const response = await axios.post('http://localhost:8082/post/posts', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': "application/json",
                },
            });

            setPosts([...posts, response.data.post]);
            setNewPost('');
            setSelectedFile(null);
            setFilePreview(null);
        } catch (error) {
            console.error('Erreur lors de la publication du post :', error);
        }
    };

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get('http://localhost:8082/profile/profile/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setProfileData(response.data.profile);
                
                const postsResponse = await axios.get(`http://localhost:8082/post/posts/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setPosts(postsResponse.data);
                setLoading(false);
            } catch (error) {
                console.error("Erreur lors de la récupération des données du profil :", error);
                setLoading(false);
            }
        };

        if (token) {
            fetchProfileData();
        }
    }, [token]);

    const handleLike = async (postId) => {
        try {
            // Récupérer le profil utilisateur pour obtenir son userId
            const responseProfile = await axios.get('http://localhost:8082/auth/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const userId = responseProfile.data.user._id;
            console.log(userId);
    
            // Récupérer le post pour obtenir les likes actuels
            const postsResponse = await axios.get(`http://localhost:8082/post/posts/${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const postLikes = postsResponse.data.likes;
            console.log(postLikes);
            // Vérifier si l'utilisateur a déjà liké ce post
            const hasLiked = postLikes.includes(userId);
    
            let response;
    
            if (hasLiked) {
                // Si l'utilisateur a déjà liké, on envoie une requête pour déliker
                response = await axios.post(`http://localhost:8082/post/posts/${postId}/unlike`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            } else {
                // Sinon, on envoie une requête pour liker
                response = await axios.post(`http://localhost:8082/post/posts/${postId}/like`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
    
            // Mettre à jour l'état des posts localement après like/unlike
            const updatedPosts = posts.map(post => {
                if (post._id === postId) {
                    return { ...post, likes: response.data.likes }; // Met à jour les likes du post
                }
                return post;
            });
    
            setPosts([...updatedPosts]);
    
        } catch (error) {
            console.error('Erreur lors de l\'action de like/unlike :', error);
        }
    };
    

    return (
        <main>
            <h2>Fil d'actualités</h2>

            <section className="create-post">
                <h2>Ajouter un post</h2>
                <form onSubmit={handlePostSubmit} className="post-form">
                    <div className='devButtonUpload'>
                        <label className="upload-btn">
                            {filePreview ? (
                                <img src={filePreview} alt="Preview" className="file-preview" />
                            ) : (
                                <div className="default-upload-icon"></div>
                            )}
                            <input
                                type="file"
                                accept="image/*,video/*"
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>

                    <textarea
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        placeholder="Description de la publication"
                        className="post-textarea"
                        required
                    />

                    <button type="submit" className="post-button">Publier</button>
                </form>
            </section>

            <section className="content">
                <div className="feed">
                    <h2>Derniers posts</h2>
                    {posts.length > 0 ? (
                        posts.map((post, index) => (
                            <div key={index} className="post">
                                <h4>{post.user.firstname_user} {post.user.lastname_user}</h4>
                                <p><strong>Posté le :</strong> {new Date(post.createdAt).toLocaleDateString()}</p>
                                <p>{post.content}</p>
                                {post.media && (
                                    <div className="media-container">
                                        {post.mediaType === 'image' ? (
                                            <img src={post.media} alt="Post Media" className="post-media" />
                                        ) : (
                                            <video controls className="post-media">
                                                <source src={`http://localhost:8082/${post.media}`} type="video/mp4" />
                                            </video>
                                        )}
                                    </div>
                                )}
                                {/* Assurer que post.likes est bien défini et est un tableau */}
                                <p><strong>Likes :</strong> {post.likes ? post.likes.length : 0}</p>
                                <button onClick={() => handleLike(post._id)} className="like-button">
                                    {post.likes && post.likes.includes(token.id) ? 'Unlike' : 'Like'}
                                </button>
                                <span className="post-timestamp">{post.createdAt}</span>
                            </div>
                        ))
                    ) : (
                        <p>Aucun post pour le moment.</p>
                    )}
                </div>
            </section>

        </main>
    );
};

export default Publications;
