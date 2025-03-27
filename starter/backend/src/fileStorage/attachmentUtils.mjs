import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';


export async function getPreSignedUrl(todoId){
    const s3Client = new S3Client()

    const s3Bucket = process.env.IMAGES_S3_BUCKET
  
  // The result URL will allow to perform the PUT operation
  const command = new PutObjectCommand({
    Bucket:  s3Bucket, 
    Key: todoId
  })
  
  const presignedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 300 // A URL is only valid for 5 minutes
  })
  return presignedUrl; 
}

export async function getAttachmentUrl(todoId) {
  const s3Bucket = process.env.IMAGES_S3_BUCKET
  return `https://${s3Bucket}.s3.amazonaws.com/${todoId}`;
}