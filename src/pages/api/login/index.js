//login.js

import dbConnect from '../../../../utils/dbConnect';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import secretkey from '../../../../config';

const secretKey = secretkey;

export default async function handler(req, res) {
  await dbConnect();

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ success: false, message: 'User Not Found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(402).json({ success: false, message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user._id }, secretKey, {
      expiresIn: '1d', 
    });

    res.setHeader('Set-Cookie', `token=${token}; HttpOnly`);

    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}
