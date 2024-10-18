import MessageService from '../services/message.js';

// Envoyer un message
export const sendMessage = async (req, res) => {
  const { senderId, receiverId, message } = req.body;

  try {
    const newMessage = await MessageService.sendMessage({ senderId, receiverId, message });
    res.status(201).json({ success: true, message: 'Message envoyé', data: newMessage });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de l\'envoi du message', error });
  }
};

// Récupérer les messages d'une conversation
export const getMessages = async (req, res) => {
  const { conversationId } = req.params;

  try {
    const messages = await MessageService.getMessages(conversationId);
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des messages', error });
  }
};
