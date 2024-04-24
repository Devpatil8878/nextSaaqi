import axios from 'axios';
import User from '../../../../models/User'


export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {

    const users = await User.find();


    return res.status(200).json(users);
  } catch (error) {
    
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
