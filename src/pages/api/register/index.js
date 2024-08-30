//register.ts

import dbConnect from '../../../../utils/dbConnect';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  await dbConnect();

  const { fullname, username, email, profilepicture, bio } = req.body;

  console.log("ENTRIES: ", fullname, username, email, profilepicture, bio)

  try {
    // const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullname,
      username,
      email,
      bio,
      profilePicture: profilepicture,
      password: "",
      confirmpassword: ""
    });
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}
