// pages/api/post.ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../utils/dbConnect';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import secretkey from "../../../../config"
import User from '../../../../models/User';
import Post from '../../../../models/Post';
import { MongoClient } from 'mongodb';


const client = new MongoClient("mongodb+srv://DEV:devanand@saaqi.hk5f3oi.mongodb.net/?retryWrites=true&w=majority&appName=Saaqi");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { content, email, image } = req.body;

      if (req.method === 'POST') {
        const token = req.cookies.token;

          if(token){
            const decodedToken: any = jwt.verify(token, secretkey);
            const userId = decodedToken.id; 

            try {
              const user = await User.findById(userId);
              if (!user) {
                return res.status(404).json({ message: 'User not found' });
              }
        
              const post = await Post.create({
                content,
                user: userId,
                image
              });
          
              const populatedPost = await Post.findById(post._id).populate('user');
        
              if(user){
                user.posts.push(post._id);
                await user.save();
              }
        
              return res.status(201).json({ message: 'Post created successfully', post: populatedPost });
            } catch (error) {
              console.error('Error creating post:', error);
              return res.status(501).json({ message: 'Internal Server Error token' });
            }
          } 
        

          
          // if(email){
            
            console.log("EMAIL: ", email)

            try {
              const userEmail = await User.findOne({email});
              console.log(userEmail)
              if (!userEmail) {
                return res.status(404).json({ message: 'User not found' });
              }
        
              const post = await Post.create({
                content,
                user: userEmail._id,
                image
              });
          
              const populatedPost = await Post.findById(post._id).populate('user');

              if(email){
                userEmail.posts.push(post._id);
                await userEmail.save();
              }
        
              res.status(201).json({ message: 'Post created successfully', post: populatedPost });
            } catch (error) {
              console.error('Error creating post:', error);
              res.status(500).json({ message: 'Internal Server Error' });
            }
          }

        // }

      //   else {
      //    res.status(405).json({ message: 'Method Not Allowed' });
      //  }
      
    

      return res.status(401).json({ message: 'Unauthorized' });

  }
   