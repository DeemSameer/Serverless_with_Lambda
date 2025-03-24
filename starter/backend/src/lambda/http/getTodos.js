//return all TODOs for a current user. A user id can be extracted from a JWT token that is sent by the frontend.

const jwt = require('jsonwebtoken');

function extractUserId(event) {
  try {
    const authHeader = event.headers.Authorization;
    if (!authHeader) {
      return null; // No Authorization header
    }

    const token = authHeader.split('Bearer ')[1];
    if (!token) {
      return null; // Invalid Authorization header
    }

    // Decode the payload (no signature verification in this simple example)
    const decoded = jwt.decode(token);

    if (!decoded) {
      return null; // Invalid token
    }

    // Extract the user ID (adjust the key as needed)
    const userId = decoded.sub || decoded.userId || decoded.id; // Try common keys
    return userId;
  } catch (error) {
    console.error('Error extracting user ID:', error);
    return null; // Handle errors appropriately
  }
}

export async function handler(event) {
  // TODO: Get all TODO items for a current user
  const userId = extractUserId(event);
  if (userId) {
    const result =   await this.dynamoDbDocument
  .query({
    TableName: 'table-name',
    IndexName: 'index-name',
    KeyConditionExpression: 'paritionKey = :paritionKey',
    ExpressionAttributeValues: {
      ':paritionKey': partitionKeyValue
    }
  })
  .promise();
  const items = result.Items;

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ items }),
    };
  } else {
    return {
      statusCode: 401, // Unauthorized
      body: JSON.stringify({ message: 'Invalid or missing token' }),
    };
  
  }
}
