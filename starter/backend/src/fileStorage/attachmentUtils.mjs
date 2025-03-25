

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