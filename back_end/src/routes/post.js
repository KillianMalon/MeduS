import express from 'express';
import PostController from '../controllers/post.js';
import * as jwt from '../middlewares/jwt.js'

const router = express.Router();

// Route pour créer un post
router.post('/posts', jwt.verify, PostController.createPost);

// Route pour récupérer tous les posts (avec pagination)
router.get('/posts', jwt.verify, PostController.getAllPosts);

// Route pour récupérer un post spécifique par son ID
router.get('/posts/:id', jwt.verify, PostController.getPostById);

// Route pour mettre à jour un post
router.put('/posts/:id', jwt.verify, PostController.updatePost);

// Route pour supprimer un post
router.delete('/posts/:id', jwt.verify, PostController.deletePost);

// Route pour liker un post
router.post('/posts/:id/like', jwt.verify, PostController.likePost);

// Route pour retirer un like d'un post
router.post('/posts/:id/unlike', jwt.verify, PostController.unlikePost);

router.get('/posts/postsByUserId/:userId', jwt.verify, PostController.getPostsByUserId)

export default router;
