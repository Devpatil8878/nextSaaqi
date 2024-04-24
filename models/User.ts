import mongoose, { ConnectOptions, ObjectId } from 'mongoose';

mongoose.connect('mongodb+srv://DEV:devanand@saaqi.hk5f3oi.mongodb.net/?retryWrites=true&w=majority&appName=Saaqi', { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions);


interface typeUser extends Document {
    fullname?: string;
    username?: string; 
    email?: string;
    password?: string; 
    confirmpassword?: string;
    profilePicture: string;
    bio: string;
    likes: Like[];
    posts: Post[];
    stories: Story[];
    followers: Follower[];
    followings: Following[];
    createdAt: Date;
  }

  interface Like {
    post: ObjectId;
    createdAt: Date;
  }
  
  interface Post {
    post: ObjectId;
    createdAt: Date;
  }
  
  interface Story {
    story: ObjectId;
    createdAt: Date;
  }
  
  interface Follower {
    user: ObjectId;
    createdAt: Date;
  }
  
  interface Following {
    user: ObjectId;
    createdAt: Date;
  }


const UserSchema = new mongoose.Schema({
    fullname:  {
        type: String,
        required: false
    },
    username: {
        type: String,
        unique: true,
        required: false,
    },
    email: {
        type: String,
        unique: true,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
    confirmpassword: {
        type: String,
        required: false,
    },
    profilePicture: {
        type: String, 
        default: "https://images.unsplash.com/photo-1513569771920-c9e1d31714af?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    bio: {
        type: String,
        default: "I am a good person, right?"
    },
    likes: [
        {
            post: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Post',
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    posts:[
        {
            post: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Post',
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        }
    ],
    stories: [
        {
            story: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Story',
            },
            createdAt: {
                type: Date,
                default: Date.now()
            }
        },
        
    ],
    followers: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        }
    ],
    followings: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.models.User<typeUser> || mongoose.model<typeUser>('User', UserSchema);

export default User;
