//return all TODOs for a current user. A user id can be extracted from a JWT token that is sent by the frontend.
import { getUserItems } from '../../businessLogic/todos.mjs'
import { getUserId } from '../utils.mjs'

export async function handler(event) {
  // TODO: Get all TODO items for a current user
  const userId = await getUserId(event)

if(userId){
  const result = await getUserItems(userId); 
  const items = result.Items;

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
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