import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://DEV:devanand@saaqi.hk5f3oi.mongodb.net/?retryWrites=true&w=majority&appName=Saaqi', { useNewUrlParser: true, useUnifiedTopology: true });

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  content: {
    type: String,
    required: true,
  },
  image:{
    type: String,
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      comment: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

let Posts;

try {
  Posts = mongoose.model('Post');
} catch {
  Posts = mongoose.model('Post', postSchema);
}

// const Posts = mongoose.model('Post') || mongoose.model('Post', postSchema)

export default Posts;


