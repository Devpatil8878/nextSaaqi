
import dbConnect from '../../../../utils/dbConnect';
import Story from '../../../../models/Story';

export default async function handler(req, res) {
  await dbConnect();

  const { id, story } = req.body;

  console.log("ENTRIES: ", id, story)

  try {
    const storedStory = await Story.create({
      user: id,
      story
    });
    res.status(201).json({ success: true, data: storedStory });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}
