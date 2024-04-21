import User from "../../../../models/User";
import dbConnect from "../../../../utils/dbConnect";

export default async function handler(req, res) {
  
    await dbConnect();
  
        try {
          const { currentUserId, followingId } = req.query;
          
          const user = await User.findById(currentUserId);
  
          if (!user) {
            return res.status(201).json({ success: false, message: 'User not found' });
          }
  
          if (user.followings.some(following => JSON.stringify(following.user) === JSON.stringify(followingId))) {
            
            return res.status(200).json({ success: true, message: 'User is in the followings list' });
          }

          return res.status(201).json({ success: false, message: 'User not found' });
          

        } catch (error) {
          return res.status(500).json({ success: false, error: error.message });
        }
  
  
  
  
}
  
  
  