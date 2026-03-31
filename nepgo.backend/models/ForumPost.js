const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const forumPostSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
<<<<<<< HEAD
  category: { type: String, default: 'general-discussion' },
=======
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
  createdAt: { type: Date, default: Date.now },
  comments: [commentSchema],
  likes: { type: Number, default: 0 },
  badges: [{ type: String }]
});

module.exports = mongoose.model('ForumPost', forumPostSchema); 