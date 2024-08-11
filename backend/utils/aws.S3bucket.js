import AWS from "aws-sdk";
import express from "express";
const router = express.Router();

export const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-south-1', // e.g., 'us-west-2'
  });

  const generateSignedUrl = (key) => {
    const params = {
      Bucket: 'your-bucket-name',
      Key: key,
      Expires: 60 * 5, // URL expires in 5 minutes
    };
  
    return s3.getSignedUrl('getObject', params);
  };
  
  // Endpoint to generate signed URL for a specific image
  router.get('/getSignedUrl/:imageKey', async (req, res) => {
    try {
      const signedUrl = generateSignedUrl(req.params.imageKey);
      res.json({ signedUrl });
    } catch (error) {
      console.error('Error generating signed URL:', error);
      res.status(500).json({ error: 'Failed to generate signed URL' });
    }
  });
  
export default router;