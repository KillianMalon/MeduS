import mongoose from 'mongoose';

const pictureSchema = new mongoose.Schema({
  feedback_id: {
    type: mongoose.Schema.Types.ObjectId, // Référence potentielle à un autre document (si feedback_id correspond à un document MongoDB)
    ref: 'Feedback'
  },
  plant_id: {
    type: mongoose.Schema.Types.ObjectId, // Référence potentielle à un autre document (si plant_id correspond à un document MongoDB)
    ref: 'Plant'
  },
  picture_path: {
    type: String,
    maxlength: 255
  }
}, {
  collection: 'PICTURE', // Nom de la collection dans MongoDB
  timestamps: false // On désactive la gestion des timestamps
});

export default model('Picture', pictureSchema);
