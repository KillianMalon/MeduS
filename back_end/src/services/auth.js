import  UserModel  from '../models/user.js'
import { Conflict, NotFound } from '../globals/errors.js'
import JWTService from './jwt.js'
import { encrypt, decrypt } from '../helpers/encryption.js'
const JWTServiceInstance = new JWTService()

export default class AuthService {
  constructor () {
    if (AuthService.instance instanceof AuthService) {
      return AuthService.instance
    }
    Object.freeze(this)
    AuthService.instance = this
  }

  async signup ({ fields }) {
    const userExist = await UserModel.findOne({ email_user: fields.email_user })
    if (userExist) {
      throw new Conflict('Email ou Téléphone déjà utilisés.')
    }
    fields.password_user = encrypt(fields.password_user)
    const user = await UserModel.create({ ...fields })
    const jwt = await JWTServiceInstance.generate({ user })
    return jwt
  }

  async login ({ email, password }) {
    const user = await UserModel.findOne({ email_user: email })
    if (!user) {
      throw new Conflict('Identifiant ou mot de passe incorrect.')
    }
    if (decrypt(user.password_user) !== password) {
      throw new Conflict('Identifiant ou mot de passe incorrect.')
    }
    console.log(user);
    const jwt = await JWTServiceInstance.generate({ id: user._id })
    const data = { jwt, id: user._id }
    return data
  }

  async getUser ({ id }) {
    const user = await UserModel.findById({ _id: id })
    if (!user) {
      throw new NotFound('Utilisateur introuvable.')
    }
    return user
  }

  async logout ({ id }) {
    const user = await UserModel.findById({ _id: id })
    if (!user) {
      throw new NotFound('Utilisateur introuvable.')
    }
    const jwt = JWTServiceInstance.removeAll(user)
    return jwt
  }
}