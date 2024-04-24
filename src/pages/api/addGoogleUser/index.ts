// pages/api/addGoogleUser.js

import User from '../../../../models/User'; 


export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { fullname, email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = await User.create({
      fullname,
      email,
    });
    await newUser.save();

    return res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    // Handle errors
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
