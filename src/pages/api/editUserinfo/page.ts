// pages/api/updateUser.js

import User from '../../../../models/User'; // Import the User model

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { userId, updatedData } = req.body;

    // Find the current user by userId
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the current user's data with the provided information
    Object.assign(currentUser, updatedData);
    await currentUser.save();

    return res.status(200).json({ message: 'User updated successfully', user: currentUser });
  } catch (error) {
    // Handle errors
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
