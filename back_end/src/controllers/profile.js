import UserService from '../services/profile.js';
const UserServiceInstance = new UserService();

export async function getProfileById(req, res) {
  const userId = req.jwt.data.id;
  console.log(req);
  console.log(req.jwt);
  console.log(req.jwt.data);
  const profile = await UserServiceInstance.getProfileById(userId);
  res.status(200).json({
    message: 'Le profil a été récupéré.',
    profile
  });
}

export async function putProfileById(req, res) {
  const fields = req.body;
  const userId = req.jwt.data.id;
  const user = await UserServiceInstance.putProfileById({ fields, userId });
  res.status(200).json({
    message: 'Le profil a été mis à jour.',
    user
  });
}

export async function deleteProfileById(req, res) {
  const userId = req.jwt.data.id;
  await UserServiceInstance.deleteProfileById({ userId });
  res.status(200).json({ message: 'Le profil a été supprimé.' });
}

export async function userPicture(req, res) {
  const { id } = req.params;
  const image = await UserServiceInstance.getUserPicture({ id });
  const path = `${image.picture_path}`;
  return res.download(path);
}

export async function getUserPictures(req, res) {
  const userId = req.jwt.data.id;
  const images = await UserServiceInstance.getUserPictures({ userId });
  res.status(200).json({
    message: 'Les images ont été récupérées.',
    images
  });
}

export async function getProfileByEmail(req, res) {
  try {
    // const { email } = req.params; 
    const email = req.jwt.data.id;// On récupère l'email depuis les paramètres de l'URL
    const user = await UserServiceInstance.getProfileByEmail(email);
    console.log(req.jwt.data);
    // On retourne le profil trouvé
    res.status(200).json({
      message: 'Le profil a été récupéré.',
      user
    });
  } catch (error) {
    console.error("Erreur lors de la récupération du profil:", error);
    res.status(500).json({ message: 'Il semble y avoir un problème.', error: error.message });
  }
}