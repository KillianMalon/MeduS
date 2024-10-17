import {model, Schema} from "mongoose";

const pictureSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imageUrl: {
    type: String, // Stocke l'URL de l'image (peut être sur un service de stockage comme S3)
    required: true
  },
  isProfileImage: {
    type: Boolean,
    default: false // Pour savoir si cette image est actuellement utilisée comme image de profil
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default model('Picture', pictureSchema);

