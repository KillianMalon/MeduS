import admin from 'firebase-admin';
import serviceAccount from './path/to/your/serviceAccountKey.json'; // Télécharger ce fichier depuis la console Firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-database-name.firebaseio.com' // Realtime DB URL ou Firestore
});

export const db = admin.firestore(); // Firestore
