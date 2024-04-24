import User from '../../../../models/User';
import dbConnect from '../../../../utils/dbConnect';

export default async function handler(req: any, res: any) {
  await dbConnect();

  try {
    const { userId } = req.query; 

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const followerCount = user.followers.length;

    res.status(200).json({ success: true, followerCount, followerslist: user.followers });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
}
