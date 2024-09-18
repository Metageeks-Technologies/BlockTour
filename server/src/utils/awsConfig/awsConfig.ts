// awsConfig.ts
import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config(); 

const s3 = new S3Client({
  region: `${process.env.AWS_REGION}`,
  credentials: {
    accessKeyId: `${process.env.AWS_ACCESS_KEY_}`,
    secretAccessKey: `${process.env.AWS_SECRET_KEY_}`,
  },
} ); 

export default s3;