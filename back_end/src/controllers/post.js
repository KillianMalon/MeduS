import PostService from '../services/post.js';

const postService = new PostService();

export default class PostController {
  // Créer un nouveau post
  static async createPost(req, res) {
    try {
      const { content, media, mediaType } = req.body;
      const userId = req.jwt.data.id; // ID de l'utilisateur via JWT
      const post = await postService.createPost({ userId, content, media, mediaType });
      res.status(201).json({ message: 'Post créé avec succès', post });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la création du post', error: error.message });
    }
  }

  // Récupérer tous les posts
  static async getAllPosts(req, res) {
    try {
      const { page, limit } = req.query;
      const posts = await postService.getAllPosts({ page, limit });
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des posts', error: error.message });
    }
  }

  // Récupérer un post par ID
  static async getPostById(req, res) {
    try {
      const { id } = req.params;
      const post = await postService.getPostById(id);
      res.status(200).json(post);
    } catch (error) {
      res.status(404).json({ message: 'Post non trouvé', error: error.message });
    }
  }

  // Mettre à jour un post
  static async updatePost(req, res) {
    try {
      const { id } = req.params;
      const userId = req.jwt.data.id;
      const { content, media, mediaType } = req.body;
      const updatedPost = await postService.updatePost({ postId: id, userId, content, media, mediaType });
      res.status(200).json({ message: 'Post mis à jour avec succès', post: updatedPost });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la mise à jour du post', error: error.message });
    }
  }

  // Supprimer un post
  static async deletePost(req, res) {
    try {
      const { id } = req.params;
      const userId = req.jwt.data.id;
      await postService.deletePost({ postId: id, userId });
      res.status(200).json({ message: 'Post supprimé avec succès' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la suppression du post', error: error.message });
    }
  }

  // Ajouter un like à un post
  static async likePost(req, res) {
    try {
      const { id } = req.params; // ID du post
      const userId = req.jwt.data.id; // ID de l'utilisateur via JWT
      const likedPost = await postService.likePost({ postId: id, userId });
      res.status(200).json({ message: 'Post aimé avec succès', post: likedPost });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de l\'ajout du like', error: error.message });
    }
  }

  // Retirer un like d'un post
  static async unlikePost(req, res) {
    try {
      const { id } = req.params; // ID du post
      const userId = req.jwt.data.id; // ID de l'utilisateur via JWT
      const unlikedPost = await postService.unlikePost({ postId: id, userId });
      res.status(200).json({ message: 'Like retiré avec succès', post: unlikedPost });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors du retrait du like', error: error.message });
    }
  }

  // Récupérer tous les posts d'un utilisateur par ID
  static async getPostsByUserId(req, res) {
    try {
      const userId = req.jwt.data.id; // ID de l'utilisateur via JWT
      const posts = await postService.getPostsByUserId(userId); // Appel à la méthode du service
      res.status(200).json(posts); // Retourner les posts
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des posts de l\'utilisateur', error: error.message });
    }
  }
}
