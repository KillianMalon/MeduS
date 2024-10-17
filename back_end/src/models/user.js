import {model, Schema} from "mongoose";

const userSchema = new Schema(
  {
    lastname_user: {
      type: String,
      maxlength: 50
    },
    firstname_user: {
      type: String,
      maxlength: 50
    },
    birthdate_user: {
      type: Date
    },
    email_user: {
      type: String,
      maxlength: 255
    },
    phone_user: {
      type: String,
      maxlength: 10
    },
    password_user: {
      type: String,
      maxlength: 255
    },
    picture_path_user: {
      type: String,
      maxlength: 255
    },
    cgu_user: {
      type: Boolean
    },
    newsletter_user: {
      type: Boolean
    },
    school_user: {
      type: String,
      maxlength: 255
    },
    class_user: {
      type: String,
      maxlength: 255
    },
    subjects: {
      type: [String], // Tableau de chaînes de caractères (noms des matières)
      default: [], // Par défaut, un tableau vide si aucune matière n'est ajoutée
    },
  }, 
  {
    // collection: 'USER', // Nom de la collection dans MongoDB
    timestamps: false // On désactive la gestion des timestamps
  }
);

export default model('User', userSchema);
