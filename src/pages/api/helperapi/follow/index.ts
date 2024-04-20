import User from "../../../../../models/User";
import mongoose from "mongoose";
import dbConnect from "../../../../../utils/dbConnect";


export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'PUT':
      try {
        const { currentUserId, followingId } = req.body;
        
        // Find the user by ID
        const user = await User.findById(currentUserId);

        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if the followingId is already in the followings array
        if (user.followings.some(following => following.user.toString() === followingId)) {
          return res.status(400).json({ success: false, message: 'User is already in the followings list' });
        }

        // Add the followingId to the followings array
        user.followings.push({ user: followingId });
        await user.save();

        return res.status(200).json({ success: true, message: 'User added to followings list' });
      } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
      }




      case 'DELETE':
        try {
          const { currentUserId, followingId } = req.body;
  
          // Find the user by ID
          const user = await User.findById(currentUserId);
  
          if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
          }
  
          // Check if the followingId exists in the followings array
          const followingIndex = user.followings.findIndex(following => following.user.toString() === followingId);
          if (followingIndex === -1) {
            return res.status(404).json({ success: false, message: 'User is not in the followings list' });
          }
  
          // Remove the followingId from the followings array
          user.followings.splice(followingIndex, 1);
          await user.save();
  
          return res.status(200).json({ success: true, message: 'User removed from followings list' });
        } catch (error) {
          return res.status(500).json({ success: false, error: error.message });
        }
      default:
        res.setHeader('Allow', ['PUT', 'DELETE']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  }


