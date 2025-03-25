import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import { v4 as uuidv4 } from 'uuid'
import AWSXRay from 'aws-xray-sdk-core'
const dynamoDb = new DynamoDB()
const dynamoDbXRay = AWSXRay.captureAWSv3Client(dynamoDb)
const dynamoDbDocument = DynamoDBDocument.from(dynamoDbXRay)

const todoTable = process.env.TODOS_TABLE
const indexTable = process.env.TODOS_CREATED_AT_INDEX


export async function createItemDB(newItem){
    return await dynamoDbDocument.put({
        TableName: todoTable,
        IndexName: indexTable,
        Item: newItem
      })    
}


export async function updateItemDB(newItem){
    return await dynamoDbDocument.updateItem({
        TableName: todoTable,
        IndexName: indexTable,
        Item: newItem
      })    
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
        IndexName: indexTable,
        Item: itemId
      })    
}

export async function getItemDBDB(itemId){
    return await dynamoDbDocument.getItem({
        TableName: todoTable,
        IndexName: indexTable,
        Item: itemId
      })    
}
