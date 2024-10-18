import {model, Schema} from "mongoose";

// Schéma pour les posts
const postSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    media: {
      type: String, // URL de l'image/vidéo si applicable
    },
    mediaType: {
      type: String,
      enum: ["image", "video", "none"], // type de média associé au post
      default: "none",
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User", // Les utilisateurs qui ont aimé le post
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // Gère automatiquement les champs createdAt et updatedAt
);

// Middleware pour mettre à jour `updatedAt`
postSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default model("Post", postSchema);
