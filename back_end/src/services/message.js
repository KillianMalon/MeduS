import { db } from './firebaseConfig.js'; // Configuration Firebase

class MessageService {
  constructor() {
    this.collection = db.collection('messages'); // Collection "messages" dans Firestore
  }

  // Envoyer un message
  async sendMessage({ senderId, receiverId, message }) {
    const conversationId = this._getConversationId(senderId, receiverId);
    const timestamp = new Date();

    const newMessage = {
      conversationId,
      senderId,
      receiverId,
      message,
      timestamp
    };

    // Enregistrer le message dans Firebase (Firestore ici)
    await this.collection.add(newMessage);

    return newMessage;
  }

  // Récupérer tous les messages d'une conversation
  async getMessages(conversationId) {
    const messagesSnapshot = await this.collection
      .where('conversationId', '==', conversationId)
      .orderBy('timestamp')
      .get();

    if (messagesSnapshot.empty) {
      return [];
    }

    const messages = [];
    messagesSnapshot.forEach(doc => {
      messages.push({ id: doc.id, ...doc.data() });
    });

    return messages;
  }

  // Fonction utilitaire pour générer un conversationId unique basé sur les utilisateurs
  _getConversationId(user1, user2) {
    return [user1, user2].sort().join('_'); // Trie pour éviter de dupliquer les conversations
  }
}

export default new MessageService();
