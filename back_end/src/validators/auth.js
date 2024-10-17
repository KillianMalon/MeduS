import Validator from './validator.js'
import Joi from 'joi'

export default class UserValidator extends Validator {
  login = Joi.object({
    email: Joi.string().max(100).required(),
    password: Joi.string().required()
  })
  // Validation pour la création d'un utilisateur
  static createUserSchema = Joi.object({
    lastname_user: Joi.string()
      .max(50)
      .required()
      .messages({
        'string.empty': 'Le nom de famille est requis.',
        'string.max': 'Le nom de famille ne peut pas dépasser 50 caractères.'
      }),

    firstname_user: Joi.string()
      .max(50)
      .required()
      .messages({
        'string.empty': 'Le prénom est requis.',
        'string.max': 'Le prénom ne peut pas dépasser 50 caractères.'
      }),

    birthdate_user: Joi.date()
      .iso()
      .messages({
        'date.base': 'La date de naissance doit être une date valide.',
        'date.format': 'La date de naissance doit être au format ISO.'
      }),

    email_user: Joi.string()
      .email()
      .max(255)
      .required()
      .messages({
        'string.empty': "L'email est requis.",
        'string.email': "L'email doit être une adresse email valide.",
        'string.max': "L'email ne peut pas dépasser 255 caractères."
      }),

    phone_user: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .optional()
      .messages({
        'string.pattern.base': 'Le numéro de téléphone doit être composé de 10 chiffres.'
      }),

    password_user: Joi.string()
      .min(8)
      .max(255)
      .required()
      .messages({
        'string.empty': 'Le mot de passe est requis.',
        'string.min': 'Le mot de passe doit comporter au moins 8 caractères.',
        'string.max': 'Le mot de passe ne peut pas dépasser 255 caractères.'
      }),

    picture_path_user: Joi.string()
      .uri()
      .optional()
      .messages({
        'string.uri': "L'URL de l'image de profil doit être valide."
      }),

    cgu_user: Joi.boolean()
      .required()
      .valid(true)
      .messages({
        'any.required': 'Les conditions générales doivent être acceptées.',
        'any.only': 'Les conditions générales doivenfscht être acceptées.'
      }),

    newsletter_user: Joi.boolean()
      .optional()
  });

  // Validation pour la mise à jour d'un utilisateur
  static updateUserSchema = Joi.object({
    lastname_user: Joi.string()
      .max(50)
      .optional()
      .messages({
        'string.max': 'Le nom de famille ne peut pas dépasser 50 caractères.'
      }),

    firstname_user: Joi.string()
      .max(50)
      .optional()
      .messages({
        'string.max': 'Le prénom ne peut pas dépasser 50 caractères.'
      }),

    birthdate_user: Joi.date()
      .iso()
      .optional()
      .messages({
        'date.base': 'La date de naissance doit être une date valide.',
        'date.format': 'La date de naissance doit être au format ISO.'
      }),

    email_user: Joi.string()
      .email()
      .max(255)
      .optional()
      .messages({
        'string.email': "L'email doit être une adresse email valide.",
        'string.max': "L'email ne peut pas dépasser 255 caractères."
      }),

    phone_user: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .optional()
      .messages({
        'string.pattern.base': 'Le numéro de téléphone doit être composé de 10 chiffres.'
      }),

    password_user: Joi.string()
      .min(8)
      .max(255)
      .optional()
      .messages({
        'string.min': 'Le mot de passe doit comporter au moins 8 caractères.',
        'string.max': 'Le mot de passe ne peut pas dépasser 255 caractères.'
      }),

    picture_path_user: Joi.string()
      .uri()
      .optional()
      .messages({
        'string.uri': "L'URL de l'image de profil doit être valide."
      }),

    cgu_user: Joi.boolean()
      .valid(true)
      .optional()
      .messages({
        'any.only': 'Les conditions générales doivent être acceptées.'
      }),

    newsletter_user: Joi.boolean()
      .optional()
  });

  signup = Joi.object({
    lastname_user: Joi.string()
      .max(50)
      .required()
      .messages({
        'string.empty': 'Le nom de famille est requis.',
        'string.max': 'Le nom de famille ne peut pas dépasser 50 caractères.'
      }),

    firstname_user: Joi.string()
      .max(50)
      .required()
      .messages({
        'string.empty': 'Le prénom est requis.',
        'string.max': 'Le prénom ne peut pas dépasser 50 caractères.'
      }),

    birthdate_user: Joi.date()
      .iso()
      .messages({
        'date.base': 'La date de naissance doit être une date valide.',
        'date.format': 'La date de naissance doit être au format ISO.'
      }),

    email_user: Joi.string()
      .email()
      .max(255)
      .required()
      .messages({
        'string.empty': "L'email est requis.",
        'string.email': "L'email doit être une adresse email valide.",
        'string.max': "L'email ne peut pas dépasser 255 caractères."
      }),

    phone_user: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .optional()
      .messages({
        'string.pattern.base': 'Le numéro de téléphone doit être composé de 10 chiffres.'
      }),

    password_user: Joi.string()
      .min(8)
      .max(255)
      .required()
      .messages({
        'string.empty': 'Le mot de passe est requis.',
        'string.min': 'Le mot de passe doit comporter au moins 8 caractères.',
        'string.max': 'Le mot de passe ne peut pas dépasser 255 caractères.'
      }),

    picture_path_user: Joi.string()
      .uri()
      .optional()
      .messages({
        'string.uri': "L'URL de l'image de profil doit être valide."
      }),

    cgu_user: Joi.boolean()
      .required()
      .valid(true)
      .messages({
        'any.required': 'Les conditions générales doivent être acceptées.',
        'any.only': 'Les conditions générales doivent être acceptées.'
      }),

      school_user: Joi.string()
      .min(1)
      .max(255)
      .required()
      .messages({
        'string.empty': 'L\'école doit être renseignée.'
      }),

    class_user: Joi.string()
      .max(255)
      .optional()
      .messages({
        'string.max': 'La classe ne peut pas dépasser 255 caractères.'
      }),

    subjects: Joi.array()
      .items(Joi.string().max(255)) // Validation pour chaque matière
      .optional()
      .messages({
        'array.includes': 'Les matières doivent être des chaînes de caractères.'
      }),

    newsletter_user: Joi.boolean()
      .optional()
  })
}