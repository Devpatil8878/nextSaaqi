
import User from '../../../../models/User'; 
import dbConnect from '../../../../utils/dbConnect';

dbConnect();
export default async function handler(req: any, res: any) {
    await dbConnect();
  
    try {
      const count = await User.countDocuments();
      res.status(200).json({ success: true, count });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }