import AWS from 'aws-sdk';
import Picture from '../models/picture.js';
import { v4 as uuidv4 } from 'uuid'; // Pour générer un identifiant unique pour chaque image

// Configurer le SDK AWS avec les bonnes clés d'accès
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

// region: process.env.AWS_REGION


class PictureService {
  async uploadToS3(file, userId) {
    const fileName = `${uuidv4()}-${file.originalname}`;

    // Paramètres pour le fichier à uploader sur S3
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME, // Le nom du bucket
      Key: fileName, // Le nom du fichier sur S3
      Body: file.buffer, // Le fichier
      ContentType: file.mimetype, // Type de contenu (image/png, image/jpeg, etc.)
      ACL: 'public-read', // Pour que l'image soit publique
    };

    try {
      const data = await s3.upload(params).promise(); // Envoi à S3
      const newPicture = new Picture({
        user: userId,
        imageUrl: data.Location, // URL de l'image sur S3
        isProfileImage: false, // L'image n'est pas une image de profil par défaut
      });

      return await newPicture.save(); // Sauvegarde dans MongoDB
    } catch (error) {
      throw new Error('Erreur lors de l\'upload sur S3 : ' + error.message);
    }
  }

  // Récupérer les images d'un utilisateur spécifique
  async getUserPictures(userId) {
    return await Picture.find({ user: userId });
  }

  // Optionnel : Récupérer une seule image spécifique
  async getPictureById(pictureId) {
    const picture = await Picture.findById(pictureId);
    if (!picture) {
      throw new Error('Image non trouvée');
    }
    return picture;
  }
}

export default new PictureService();
