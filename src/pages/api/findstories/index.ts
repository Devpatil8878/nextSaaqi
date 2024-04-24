import { NextApiResponse } from 'next';
import Story from '../../../../models/Story'; // Import the Story model

export default async function handler(req: any, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const stories = await Story.find();

    if (stories.length === 0) { // Check if no stories found
      return res.status(404).json({ message: 'No stories found' });
    }

    return res.status(200).json(stories);
  } catch (error) {
    console.error('Error finding stories:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
