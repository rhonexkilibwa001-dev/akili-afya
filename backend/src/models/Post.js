import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  author: { type: String, required: true, maxlength: 60 },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: { type: String, required: true, maxlength: 1000, trim: true },
  createdAt: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema(
  {
    author: { type: String, required: true, maxlength: 60 },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true, maxlength: 120, trim: true },
    body: { type: String, required: true, maxlength: 5000, trim: true },
    comments: { type: [commentSchema], default: [] },
  },
  { timestamps: true },
);

export default mongoose.model('Post', postSchema);
