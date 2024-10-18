import AWS from 'aws-sdk';
import Picture from '../models/picture.js';
import { v4 as uuidv4 } from 'uuid';

// Configurer le SDK AWS avec les bonnes clés d'accès
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  // region: process.env.AWS_REGION
});

export default class UploadService {
  constructor() {
    if (UploadService.instance instanceof UploadService) {
      return UploadService.instance;
    }
    Object.freeze(this);
    UploadService.instance = this;
  }

  // Upload de l'image de profil de l'utilisateur sur S3
  async userPicture({ picture, id }) {
    const fileName = `${uuidv4()}-${picture.originalname}`;

    // Vérifier s'il existe déjà une image de profil pour cet utilisateur
    const foundedPicture = await Picture.findOne({ user: id, isProfileImage: true });

    if (foundedPicture) {
      // Supprimer l'ancienne image de S3
      const oldKey = foundedPicture.imageUrl.split('/').pop();
      await s3.deleteObject({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: oldKey
      }).promise();
      
      // Supprimer l'entrée de la base de données
      await Picture.deleteOne({ _id: foundedPicture._id });
    }

    // Paramètres pour l'upload de la nouvelle image
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileName, // Nom unique pour l'image
      Body: picture.buffer, // Buffer du fichier
      ContentType: picture.mimetype,
      ACL: 'public-read' // Permet l'accès public
    };

    try {
      // Envoi du fichier sur S3
      const data = await s3.upload(params).promise();
      
      // Enregistrer les informations dans MongoDB
      const newPicture = await Picture.create({
        user: id,
        imageUrl: data.Location, // URL de l'image sur S3
        isProfileImage: true // Défini comme image de profil
      });

      return newPicture;
    } catch (error) {
      throw new Error('Erreur lors de l\'upload sur S3 : ' + error.message);
    }
  }
}