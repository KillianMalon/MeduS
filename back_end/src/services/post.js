import Post from '../models/post.js';
import { NotFound } from '../globals/errors.js'; // Suppose que tu as une gestion des erreurs personnalisée

export default class PostService {
  constructor() {
    if (PostService.instance instanceof PostService) {
      return PostService.instance;
    }
    Object.freeze(this);
    PostService.instance = this;
  }

  // Créer un nouveau post
  async createPost({ userId, content, media, mediaType }) {
    const post = new Post({
      user: userId,
      content,
      media: media || '', // Laisse vide si pas de média
      mediaType: mediaType || 'none', // Définit à 'none' si pas de média
    });

    await post.save();
    return post;
  }

  // Récupérer tous les posts (avec pagination si nécessaire)
  async getAllPosts({ page = 1, limit = 10 }) {
    const posts = await Post.find()
      .populate('user', 'firstname_user lastname_user') // Récupère les informations de base de l'utilisateur
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 }); // Trie par date de création (du plus récent au plus ancien)
    return posts;
  }

  // Récupérer un post par son ID
  async getPostById(postId) {
    const post = await Post.findById(postId).populate('user', 'firstname_user lastname_user');
    if (!post) {
      throw new NotFound('Post non trouvé');
    }
    return post;
  }

  // Mettre à jour un post
  async updatePost({ postId, userId, content, media, mediaType }) {
    const post = await Post.findById(postId);
    if (!post) {
      throw new NotFound('Post non trouvé');
    }

    // Vérifie que l'utilisateur est bien l'auteur du post
    if (post.user.toString() !== userId) {
      throw new Unauthorized('Vous ne pouvez pas modifier ce post');
    }

    post.content = content || post.content;
    post.media = media || post.media;
    post.mediaType = mediaType || post.mediaType;
    post.updatedAt = Date.now();

    await post.save();
    return post;
  }

  // Supprimer un post
  async deletePost({ postId, userId }) {
    const post = await Post.findById(postId);
    if (!post) {
      throw new NotFound('Post non trouvé');
    }

    // Vérifie que l'utilisateur est bien l'auteur du post
    if (post.user.toString() !== userId) {
      throw new Unauthorized('Vous ne pouvez pas supprimer ce post');
    }

    await post.remove();
    return { message: 'Post supprimé avec succès' };
  }

  // Ajouter un like à un post
  async likePost({ postId, userId }) {
    const post = await Post.findById(postId);
    if (!post) {
      throw new NotFound('Post non trouvé');
    }

    // Ajoute un like si l'utilisateur n'a pas déjà aimé le post
    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
      await post.save();
    }
    return post;
  }

  // Retirer un like d'un post
  async unlikePost({ postId, userId }) {
    const post = await Post.findById(postId);
    if (!post) {
      throw new NotFound('Post non trouvé');
    }

    // Supprime le like de l'utilisateur
    post.likes = post.likes.filter((likeUserId) => likeUserId.toString() !== userId);
    await post.save();
    return post;
  }

  async getPostsByUserId(userId) {
    try {
      const posts = await Post.find({ user: userId }); // Supposant que tu utilises Mongoose
      return posts;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des posts de l\'utilisateur');
    }
  }
}
