// pages/api/findUserByusername.js

import User from '../../../../models/User'; 

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { username } = req.query;
    console.log("QUERY: ", username)

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json({ user });

  } catch (error) {
    console.error('Error finding user by username:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
