

import { NextApiRequest, NextApiResponse } from 'next';
import path, { extname, join } from 'path';
import aws from 'aws-sdk';
import { S3 } from 'aws-sdk';
import User from '../../../../models/User'
import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import multer from 'multer';
import fs from 'fs';


const s3 = new S3({
    accessKeyId: 'AKIAX6YJWN7CGSPJWC4R',
    secretAccessKey: '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',
  });



const upload = multer({ dest: './uploads/' });



export const config = {
  api: {
    bodyParser: false, 
  },
};

export default async function handler(req: any, res: any) {
  try {
    upload.single('file')(req, res, async (err: any) => {
      if (err instanceof multer.MulterError) {
        console.error('Multer error:', err);
        res.status(500).json({ error: 'An error occurred while uploading the file' });
      } else if (err) {
        console.error('Unknown error:', err);
        res.status(500).json({ error: 'An unknown error occurred' });
      } else {
        // File uploaded successfully
        const fileExtension = extname(req.file.originalname); 
        const sanitizedFileName = req.file.originalname.replace(/\s+/g, '_');
        const newFileName = `${req.file.filename}_${sanitizedFileName}${fileExtension}`; 
        const filePath = join('./uploads', newFileName);
        const fileData = fs.readFileSync(req.file.path);


        fs.writeFileSync(filePath, fileData);

        fs.unlinkSync(req.file.path);
        
        const params = {
          Bucket: 'saaqibucketdb',
          Key: newFileName, // Use the same filename as uploaded
          Body: fs.createReadStream(filePath),
        };
        
        await s3.upload(params).promise().then((e) => res.status(201).json({filelocation: e.Location}));
        
        console.log('File uploaded:', filePath);
        res.status(200).json({ message: 'File uploaded successfully' });
      }
    });
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).json({ error: 'An error occurred while handling file upload' });
  }
}