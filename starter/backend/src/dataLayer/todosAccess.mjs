import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import AWSXRay from 'aws-xray-sdk-core'



const dynamoDb = new DynamoDB()
const dynamoDbXRay = AWSXRay.captureAWSv3Client(dynamoDb)
const dynamoDbDocument = DynamoDBDocument.from(dynamoDbXRay)

const todoTable = process.env.TODOS_TABLE
const indexTable = process.env.TODOS_CREATED_AT_INDEX


export async function createItemDB(newItem){
    return await dynamoDbDocument.put({
        TableName: todoTable,
        Item: newItem
      })    
}


export async function updateItemDB(newItem, todoId){
  const updateExpression = 'SET name = :name, dueDate = :dueDate, done = :done';//, attachmentUrl = :attachmentUrl
  const expressionAttributeValues = {
    ':name': newItem.name,
    ':dueDate': newItem.dueDate,
    ':done': newItem.done,
    // ':attachmentUrl': newItem.attachmentUrl,
  };

  return await dynamoDbDocument.update({
    TableName: todoTable,
    Key: {
      id: todoId,
    },
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionAttributeValues 
  }); 
}

export async function getItems(userId){
    return await dynamoDbDocument
      .query({
        TableName: todoTable,
        IndexName: indexTable,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId
        }
      });
}

export async function deleteItemDB(itemId){
    return await dynamoDbDocument.delete({
        TableName: todoTable,
        Key: {
          id: itemId
        }
      }); 
}

export async function getItemDB(itemId){
    return await dynamoDbDocument.get({
        TableName: todoTable,
        Key: {
          id: itemId
        }
      });
}
