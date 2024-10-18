import Validator from './validator.js'; // Assure-toi que ce chemin est correct
import Joi from 'joi';

export default class PostValidator extends Validator {
  // Validation pour créer un post
  createPost = Joi.object({
    user: Joi.string().required().label('User ID'), // ID de l'utilisateur (obligatoire)
    content: Joi.string().max(500).required().label('Content'), // Contenu (obligatoire, max 500 caractères)
    media: Joi.string().uri().optional().allow('').label('Media URL'), // URL de média (optionnelle)
    mediaType: Joi.string().valid('image', 'video', 'none').default('none').label('Media Type'), // Type de média
    likes: Joi.array().items(Joi.string().label('User ID')).optional().label('Likes'), // Tableau d'IDs d'utilisateurs (optionnel)
  });
}
