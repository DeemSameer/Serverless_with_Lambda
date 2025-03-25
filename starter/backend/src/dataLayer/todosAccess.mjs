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
  // const expressionAttributeNames = {//for reserved words in dynamodb
  //   '#name': 'name',
  // };

  return await dynamoDbDocument.update({
    TableName: todoTable,
    Key: {
      id: todoId,
    },
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionAttributeValues 
    // ,ExpressionAttributeNames: expressionAttributeNames
  }); 
}

export async function getItems(userId){
    return await this.dynamoDbDocument
      .query({
        TableName: todoTable,
        IndexName: indexTable,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId
        }
      })
      .promise();
}

export async function deleteItemDB(itemId){
    return await dynamoDbDocument.deleteItem({
        TableName: todoTable,
        Item: itemId
      })    
}

export async function getItemDBDB(itemId){
    return await dynamoDbDocument.getItem({
        TableName: todoTable,
        Item: itemId
      })    
}

export async function getItemById(){
  dynamoDbDocument.get({
    TableName: groupsTable,//TODO  
    Key: {
      id: todoId
    }
  })
}
