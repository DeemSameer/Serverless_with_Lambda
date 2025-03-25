
import { deleteItem } from '../../businessLogic/todos.mjs'

export async function handler(event) {
  const todoId = event.pathParameters.todoId
  await deleteItem(todoId);

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }
  }
}

