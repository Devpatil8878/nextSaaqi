import User from '../../../../models/User';
import dbConnect from '../../../../utils/dbConnect';

export default async function handler(req: any, res: any) {
  await dbConnect();

  try {
    const { userId } = req.query; 
    console.log(userId)

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const followingCount = user.followings.length;

    res.status(200).json({ success: true, followingCount });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
}
