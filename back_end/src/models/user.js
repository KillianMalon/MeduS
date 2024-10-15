import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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
  }
}, {
  collection: 'USER', // Nom de la collection dans MongoDB
  timestamps: false // On désactive la gestion des timestamps
});

export default model('User', userSchema);
