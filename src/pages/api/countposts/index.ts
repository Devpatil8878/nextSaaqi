
import dbConnect from '../../../../utils/dbConnect';
import Posts from '../../../../models/Post';

dbConnect();
export default async function handler(req: any, res: any) {
    await dbConnect();
  
    try {
      const count = await Posts.countDocuments();
      res.status(200).json({ success: true, count });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }