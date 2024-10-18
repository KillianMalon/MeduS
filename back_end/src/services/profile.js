import { NotFound, Unauthorized } from '../globals/errors.js';
import User from '../models/user.js';

export default class UserService {
  constructor() {
    if (UserService.instance instanceof UserService) {
      return UserService.instance;
    }
    Object.freeze(this);
    UserService.instance = this;
  }

  async getProfileById(userId) {
    const user = await User.findById(userId); // MongoDB utilise findById
    if (!user) {
      throw new NotFound('Le profil n\'existe pas.');
    }
    return user;
  }

  async putProfileById({ fields, userId }) {
    const user = await User.findById(userId); 
    if (!user) {
      throw new NotFound('Le profil n\'existe pas.');
    }
    // Pas besoin de vérifier user.user_id, MongoDB n'a pas cette distinction
    Object.assign(user, fields); // Mise à jour des champs avec les nouvelles valeurs
    await user.save();
    return user;
  }

  async deleteProfileById({ userId }) {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFound('Le profil n\'existe pas.');
    }
    await User.findByIdAndDelete(userId); // Supprimer l'utilisateur par son _id
  }

  async getProfileByEmail(email) {
    // Recherche l'utilisateur par email
    const user = await User.findOne({ email_user: email });
    
    if (!user) {
      throw new NotFound('Le profil n\'existe pas.');
    }
    
    return user;
  }
}
