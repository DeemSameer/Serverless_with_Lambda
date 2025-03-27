/*
 returns a pre-signed URL that can be used to upload an attachment file for a TODO item. It should return a JSON object that looks like this:
{
   "uploadUrl": "https://s3-bucket-name.s3.eu-west-2.amazonaws.com/image.png"
}
*/
import{getPreSignedUrl, getAttachmentUrl} from '../../fileStorage/attachmentUtils.mjs'
import { setPreSignedUrl } from '../../businessLogic/todos.mjs'
import { getUserId } from '../utils.mjs'
import {createLogger } from '../../utils/logger.mjs'
const logger = createLogger('http'); 

export async function handler(event) {
  const todoId = event.pathParameters.todoId
  const presignedUrl = await getPreSignedUrl(todoId); 
  const attachmentUrl = await getAttachmentUrl(todoId); 
  const userId = getUserId(event)
  logger.info("upload image for todoid:"+todoId )
  // const image = JSON.parse(event.body)
  await setPreSignedUrl(userId, todoId, attachmentUrl)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      'uploadUrl':presignedUrl
    })
  }
}

