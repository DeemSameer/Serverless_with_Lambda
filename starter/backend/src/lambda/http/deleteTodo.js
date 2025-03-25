
import { deleteItem } from '../../businessLogic/todos.mjs'
import { getUserId } from '../utils.mjs'

export async function handler(event) {
  const todoId = event.pathParameters.todoId
  const userId = getUserId(event)
  
  await deleteItem(todoId,userId);

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }
  }
}

