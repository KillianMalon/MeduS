import express from 'express';
import { sendMessage, getMessages } from '../controllers/dmController.js';

const router = express.Router();

// Route pour envoyer un message
router.post('/sendMessages', sendMessage);

// Route pour récupérer les messages d'une conversation
router.get('/conversation/:conversationId', getMessages);

export default router;
