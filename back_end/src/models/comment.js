import {model, Schema} from "mongoose";

const CommentSchema = new Schema({
  post: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Post', required: true 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  text: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default model('Comment', CommentSchema);
