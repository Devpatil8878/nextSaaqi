import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken';
import secretkey from '../../../../../config';
import User from "../../../../../models/User";

const secretKey = secretkey;

const handler = async (req: any, res: any) => {
//   try {
    // Extracting token from the request cookies
    const token = req.cookies.token;

    // If no token found, return unauthorized
//     if (!token) {
//       return res.status(401).json({ success: false, message: 'Unauthorized' });
//     }

//     // Verify the token
//     const decodedToken = jwt.verify(token, secretKey);

//     // Now you have access to decodedToken.id or any other data stored in the token
//     const userId = decodedToken._id;

//     // Proceed with your logic using the userId or other token data
//     // For example, fetching user data based on userId
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ success: false, message: 'User Not Found' });
//     }

//     // Now that you have the authenticated user, you can perform the database query
//     const keyword = req.query.search
//       ? {
//           $or: [
//             { name: { $regex: req.query.search, $options: "i" } },
//             { email: { $regex: req.query.search, $options: "i" } },
//           ],
//         }
//       : {};

//     // Query the database excluding the authenticated user
//     const users = await User.find({ ...keyword, _id: { $ne: userId } });

//     res.status(200).json({ success: true, users });
//   } catch (error) {
//     // If token verification fails or any other error occurs
//     console.error(error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }

  res.send(req)
// };
}
export default handler;
