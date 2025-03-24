/*
 returns a pre-signed URL that can be used to upload an attachment file for a TODO item. It should return a JSON object that looks like this:
{
   "uploadUrl": "https://s3-bucket-name.s3.eu-west-2.amazonaws.com/image.png"
}
*/

export async function handler(event) {
  const todoId = event.pathParameters.todoId

  // TODO: Return a presigned URL to upload a file for a TODO item with the provided id

  const s3Client = new S3Client()

  const groupsTable = process.env.IMAGES_S3_BUCKET

// The result URL will allow to perform the PUT operation
const command = new PutObjectCommand({
  Bucket:  's3-bucket-name', 
  Key: 'todoId'
})


const presignedUrl = await getSignedUrl(s3Client, command, {
  expiresIn: 300 // A URL is only valid for 5 minutes
})

  return presignedUrl
}

