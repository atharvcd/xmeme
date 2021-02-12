const mongoose = require("mongoose");

const memeSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true
    },

    caption: {
        type: String,
        required: true
    },

    url: {
        type: String,
        required: true
    },
    likes: {
      type: Number,
      default : 0
    },
  },
  { timestamps: true }
);

memeSchema.index({ "name": 1, "caption": 1, "url" : 1}, { "unique": true });
memeSchema.index({ "updatedAt" : 1});
module.exports = mongoose.model("Meme", memeSchema);
