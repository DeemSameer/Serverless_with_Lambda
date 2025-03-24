/*

create a new TODO for a current user. It receives a new TODO item to be created in JSON format that looks like this:
{
    "name": "Buy bread",
    "dueDate": "2022-12-12"
}  

*/

import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import { v4 as uuidv4 } from 'uuid'
import AWSXRay from 'aws-xray-sdk-core'
const dynamoDb = new DynamoDB()
const dynamoDbXRay = AWSXRay.captureAWSv3Client(dynamoDb)
const dynamoDbDocument = DynamoDBDocument.from(dynamoDbXRay)

const groupsTable = process.env.TODOS_TABLE

export async function handler(event) {
  const newTodo = JSON.parse(event.body)
  console.log('Processing event: ', event)
  const itemId = uuidv4()

  const newItem = {
    id: itemId,
    ...newTodo
  }

   await dynamoDbDocument.put({
    TableName: groupsTable,
    Item: newItem
  })

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      newItem
    })
  }
}

