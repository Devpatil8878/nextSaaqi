// logout.js
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Set-Cookie', 'token=; Max-Age=0; HttpOnly');
  res.writeHead(302, { Location: '/' });
  res.status(200).json({ message: 'Logout successful' });
};

export default handler;
