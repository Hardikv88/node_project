const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadToS3 = async (file) => {
  try {
    // Check if required S3 config is set
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_S3_BUCKET_NAME) {
      console.warn('AWS S3 configuration not set. Skipping file upload.');
      return null; // Or throw an error if you want to enforce it
    }

    const fileExtension = file.originalname.split('.').pop();
    const uniqueFileName = `avatars/${uuidv4()}-${Date.now()}.${fileExtension}`;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: uniqueFileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await s3Client.send(new PutObjectCommand(params));
    return uniqueFileName;
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw new Error('Failed to upload profile image. Please try again later.');
  }
};

module.exports = { uploadToS3 };