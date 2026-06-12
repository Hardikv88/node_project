const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const deleteFromS3 = async (key) => {
  try {
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_S3_BUCKET_NAME) {
      console.warn('AWS S3 configuration not set. Skipping file deletion.');
      return;
    }

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
    };

    await s3Client.send(new DeleteObjectCommand(params));
  } catch (error) {
    console.error('Error deleting from S3:', error);
    // Don't throw error, just log it so upload can continue
  }
};

const uploadToS3 = async (file, userId) => {
  try {
    // Check if required S3 config is set
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_S3_BUCKET_NAME) {
      console.warn('AWS S3 configuration not set. Skipping file upload.');
      return null; // Or throw an error if you want to enforce it
    }

    const fileExtension = file.originalname.split('.').pop();
    const fileName = `users/${userId}/profile.${fileExtension}`;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await s3Client.send(new PutObjectCommand(params));
    return fileName;
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw new Error('Failed to upload profile image. Please try again later.');
  }
};

module.exports = { uploadToS3, deleteFromS3 };