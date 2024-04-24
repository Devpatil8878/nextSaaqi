
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../../models/User';
import secretkey from "../../../../config"

const secretKey = secretkey;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.cookies.token; 

  if (!token) {
    return res.status(401).json({ message: 'Authentication token is missing' });
  }

  try {
    const decodedToken: any = jwt.verify(token, secretKey);
    const userId = decodedToken.id; 

    const userData = await User.findById(userId);

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user: userData });
  } catch (error) {
    console.error('Error fetching local user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default handler;
