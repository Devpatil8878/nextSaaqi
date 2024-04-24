import dbConnect from '../../../../utils/dbConnect';
import Post from '../../../../models/Post'; 


dbConnect();

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }


  try {

    const randomPosts = await Post.aggregate([
        { $sample: { size: 10 } },
        { $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'user' } },
        { $unwind: '$user' } 
      ]);


    res.status(200).json(randomPosts);
  } catch (error) {
    console.error('Error fetching random posts:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
