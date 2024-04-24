import mongoose, { ConnectOptions, ObjectId } from 'mongoose';

mongoose.connect('mongodb+srv://DEV:devanand@saaqi.hk5f3oi.mongodb.net/?retryWrites=true&w=majority&appName=Saaqi', { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions);

interface typePost extends Document {
  user: ObjectId; 
  content: string; 
  image?: string; 
  comments: Comment[]; 
  likes: Like[]; 
  createdAt: Date;
}

interface Comment {
  user: ObjectId; 
  comment: string; 
  createdAt: Date; 
}

interface Like {
  _id?: ObjectId; 
  user: ObjectId; 
  createdAt: Date; 
}


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

// let Posts: typePost;

// try {
//   Posts = mongoose.model<typePost>('Post');
// } catch {
//   Posts = mongoose.model<typePost>('Post', postSchema);
// }

const Posts = mongoose.models.Post<typePost> || mongoose.model<typePost>('Post', postSchema)

export default Posts;


