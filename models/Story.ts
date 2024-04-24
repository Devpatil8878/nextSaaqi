import mongoose, { ObjectId, mongo } from 'mongoose'
import { ConnectOptions } from 'mongoose';

mongoose.connect('mongodb+srv://DEV:devanand@saaqi.hk5f3oi.mongodb.net/?retryWrites=true&w=majority&appName=Saaqi', { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions);

interface typeStory {
    user: ObjectId; 
    story: string; 
    likes: Like[]; 
    createdAt: Date; 
  }
  
  interface Like {
    _id?: ObjectId; 
    user: ObjectId; 
    createdAt: Date; 
  }

const storySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    story: {
        type: String,
        required: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            createdAt: {
                type: Date,
                default: Date.now()
            }
        },
        
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

// let Story: typeStory;

// try{
//     Story = mongoose.model<typeStory>('Story')
// }catch{
//     Story = mongoose.model<typeStory>('Story', storySchema)
// }


const Story = mongoose.models.Story<typeStory> || mongoose.model<typeStory>('Story', storySchema)

export default Story;